type Observer<T> = (value: T) => void

class Observable<T> {
    constructor(
        public onSubscribe: (observer: Observer<T>) => void,
    ) {}
    subscribe(observer: Observer<T>) {
        this.onSubscribe(observer)
    }
}

class Subject<T> extends Observable<T> {
    observers = new Set<Observer<T>>
    constructor() {
        super(observer => { this.observers.add(observer) })
    }
    next(value: T) {
        this.observers.forEach(observer => observer(value))
    }
}

const ob1 = new Observable(next => {
    next(1)
    next(2)
})

ob1.subscribe(console.log)

const ob2 = new Subject
ob2.subscribe(console.log)

ob2.next("hi")
