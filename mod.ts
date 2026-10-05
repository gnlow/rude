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
