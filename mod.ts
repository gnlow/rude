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
    scan(acc: (prev: T, curr: T, i: number) => T): Observable<T>
    scan<O>(acc: (prev: O, curr: T, i: number) => O, seed: O): Observable<O>
    scan<O>(acc: (prev: O, curr: T, i: number) => O, seed?: O){
        return new Observable<O>(observer => {
            let hasSeed = seed != undefined
            let prev: O
            if (hasSeed) {
                prev = seed!
                observer(seed!)
            }
            let index = 0
            this.subscribe(value => {
                if (hasSeed) {
                    prev = acc(prev!, value, index++)
                } else {
                    prev = value as T & O
                    hasSeed = true
                }
                observer(prev)
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
