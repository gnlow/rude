import { Observable, Subject } from "./mod.ts"

const ob1 = new Observable<number>(next => {
    next(1)
    next(2)
    return () => {}
})

const ob2 = new Subject

const unsub = Observable.merge(
    ob1.map(x => x+100).scan((a, b) => a+b),
    ob2,
).subscribe(console.log)

ob2.next("hi")

unsub()
