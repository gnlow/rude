type Observer<T> = (value: T) => void

class Observable<T> {
    constructor(
        public onSubscribe: (next: Observer<T>) => void,
    ) {}
    subscribe(observer: Observer<T>) {
        this.onSubscribe(observer)
    }
}

const ob = new Observable(next => {
    next(1)
    next(2)
})

ob.subscribe(console.log)
