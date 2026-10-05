import { Observable, Subject } from "./mod.ts"

const ob1 = new Observable<number>(next => {
    next(1)
    next(2)
    return () => {}
})

const unsub1 = ob1.map(x => x+100).scan((a, b) => a+b).subscribe(console.log)

const ob2 = new Subject
const unsub2 = ob2.subscribe(console.log)

ob2.next("hi")

unsub1()
unsub2()
