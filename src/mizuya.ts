import fs from "fs"
import GPT4API from "./gpt4.api"

export class Mizuya {
  private firstPrompt: string
  public gpt4Core: GPT4API = new GPT4API()
  constructor() {
    this.firstPrompt = fs.readFileSync("./preset.en.md", { encoding: "utf-8" })
  }

  async wake() {
    this.gpt4Core.addSystemMessage(this.firstPrompt)
    return await this.gpt4Core.reSend()
  }
  async parseAipi() {
    // 1. think
    // 2. command
    // 3. memory
    // 4. talk
  }
}
