export type Observer<T> = (value: T) => void
export type Teardown = () => void

export class Observable<T> {
    constructor(
        public onSubscribe: (observer: Observer<T>) => Teardown,
    ) {}
    subscribe(observer: Observer<T>) {
        let isUnsubscribed = false
        return this.onSubscribe(value => {
            if (!isUnsubscribed) {
                observer(value)
            }
        })
    }

    map<O>(f: (value: T) => O) {
        return new Observable<O>(observer => {
            return this.subscribe(value => observer(f(value)))
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
            return this.subscribe(value => {
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

    static merge<Ts extends unknown[]>(...obs: { [K in keyof Ts]: Observable<Ts[K]> }) {
        return new Observable(o => {
            const subs = obs.map(ob => ob.subscribe(o))
            return () => {
                subs.forEach(sub => sub())
            }
        })
    }
}

export class Subject<T> extends Observable<T> {
    observers = new Set<Observer<T>>
    constructor() {
        super(observer => {
            this.observers.add(observer)
            return () => {
                this.observers.delete(observer)
            }
        })
    }
    next(value: T) {
        this.observers.forEach(observer => observer(value))
    }
}
