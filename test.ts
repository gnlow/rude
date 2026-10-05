import { Observable, Subject } from "./mod.ts"

const ob1 = new Observable<number>(next => {
    next(1)
    next(2)
})

ob1.map(x => x+100).scan((a, b) => a+b, 0).subscribe(console.log)

const ob2 = new Subject
ob2.subscribe(console.log)

ob2.next("hi")
