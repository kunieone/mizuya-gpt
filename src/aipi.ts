import * as child_process from "child_process"

import readline from "readline/promises"
import YAML from "js-yaml"
import fs from "fs"
import { Mizuya } from "./mizuya"
function findAllAIPIText(input: string, operationType: string): string[] {
  const regex = new RegExp(`#${operationType}\\{\\{(.+?)\\}\\}`, "g")
  const matches = Array.from(input.matchAll(regex))
  const parsedTexts: string[] = []

  matches.forEach((match) => {
    parsedTexts.push(match[1])
  })

  return parsedTexts
}

interface Communicating {
  title: string
  back: string
}

export const handleCommands = (text: string): Communicating[] => {
  let cmds = findAllAIPIText(text, "command")
  let c: Communicating[] = []
  for (let i = 0; i < cmds.length; i++) {
    c.push({
      title: cmds[i],
      back: String(child_process.execSync(cmds[i])).trim(),
    })
  }
  return c
}
export const handleTalk = async (text: string): Promise<Communicating[]> => {
  let c: Communicating[] = []

  let questions = findAllAIPIText(text, "talk")

  questions.forEach(async (q) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    let myAnswer = await rl.question(q)

    c.push({ title: q, back: myAnswer })
  })
  // 提示用户输入信息
  return c
}
enum MemoryStorageFeedBack {
  Error = -2,
  Empty,
  Added,
}
export const handleMemory = (text: string): MemoryStorageFeedBack => {
  let newMemories = findAllAIPIText(text, "memory")

  if (newMemories.length === 0) {
    return MemoryStorageFeedBack.Empty
  }
  let memory = YAML.load(
    fs.readFileSync("./memory.yaml", { encoding: "utf-8" })
  ) as string[]

  for (let text of newMemories) {
    memory.push(text)
  }
  try {
    fs.writeFileSync("./memory.yaml", YAML.dump(memory), { encoding: "utf-8" })
  } catch (error) {
    return MemoryStorageFeedBack.Error
  }
  return MemoryStorageFeedBack.Added
}
interface ThinkingContext {
  think: string[]
  think_back: string[]
}
export const handleThinking = async (
  text: string,
  bot: Mizuya
): Promise<ThinkingContext> => {
  let thinkings = findAllAIPIText(text, "think")
  let res = await bot.gpt4Core.sendMessage(
    "assistant",
    `$ MIZUYA 自我思考(此时已经是think模式，不能使用AIPI)根据刚刚的think内容，分条自我思考，按顺序输出到多个#think_back{{}}:`
  )
  let back = findAllAIPIText(res, "think_back")
  return {
    think: thinkings,
    think_back: back,
  }
}
