import { Mizuya } from "./mizuya"

let m: Mizuya = new Mizuya()

~~(async function () {
  await m.wake()
})()
