export type Observer<T> = (value: T) => void

export class Observable<T> {
    constructor(
        public onSubscribe: (observer: Observer<T>) => void,
    ) {}
    subscribe(observer: Observer<T>) {
        this.onSubscribe(observer)
    }

    map<O>(f: (value: T) => O) {
        return new Observable<O>(observer => {
            this.subscribe(value => observer(f(value)))
        })
    }
    scan<O>(acc: (prev: O, curr: T) => O, seed: O) {
        return new Observable<O>(observer => {
            observer(seed)
            let curr = seed
            this.subscribe(value => {
                curr = acc(curr, value)
                observer(curr)
            })
        })
    }
}

export class Subject<T> extends Observable<T> {
    observers = new Set<Observer<T>>
    constructor() {
        super(observer => { this.observers.add(observer) })
    }
    next(value: T) {
        this.observers.forEach(observer => observer(value))
    }
}
