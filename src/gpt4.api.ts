import axios, { AxiosInstance, AxiosResponse } from "axios"
import * as dotenv from "dotenv"
import { Message, GPT4Request, GPT4Response, Role } from "./interface"
import { OpenAIApi, Configuration, CreateChatCompletionResponse } from "openai"

dotenv.config()

class GPT4API {
  private openaiClient: OpenAIApi = new OpenAIApi(
    new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    })
  )
  private messages: Message[]

  constructor() {
    // this.httpClient = axios.create({
    //   baseURL: "https://api.openai.com/v1",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    //   },

    // proxy: {
    //   host: "127.0.0.1",
    //   port: 7890,
    // },
    // })

    this.messages = [
      // {
      //   role: "system",
      //   content: "You are ChatGPT, a large language model trained by OpenAI.",
      // },
    ]
  }

  addSystemMessage(systemMsg: string) {
    this.messages.push({
      role: "system",
      content: systemMsg,
    })
  }
  private async send(): Promise<any> {
    let completion: AxiosResponse<CreateChatCompletionResponse, any> | null =
      null
    completion = (await this.openaiClient.createChatCompletion({
      model: "gpt-4",
      messages: this.messages,
    })) as AxiosResponse<CreateChatCompletionResponse, any>

    return completion.data.choices[0].message?.content
  }
  public reSend = async () => await this.send()

  public async sendMessage(role: Role, userMessage: string): Promise<string> {
    this.messages.push({ role, content: userMessage })
    try {
      let assistantMessage = await this.send()
      this.messages.push({ role: "assistant", content: assistantMessage })

      return assistantMessage
    } catch (error) {
      console.error("Error creating chat completion:", error)
      throw error
    }
  }
}

export default GPT4API
