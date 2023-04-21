const axios = require("axios")
const dotenv = require("dotenv")

import { ChatGPTAPI } from "chatgpt"

dotenv.config()

const api = new ChatGPTAPI({ apiKey: process.env.OPENAI_API_KEY })

// send a message and wait for the response
let res = await api.sendMessage("What is OpenAI?")
console.log(res.text)

// send a follow-up
res = await api.sendMessage("Can you expand on that?", {
  parentMessageId: res.id,
})
console.log(res.text)

// send another follow-up
res = await api.sendMessage("What were we talking about?", {
  parentMessageId: res.id,
})
console.log(res.text)

// class GPT4API {
//   constructor() {
//     this.httpClient = axios.create({
//       baseURL: "https://api.openai.com/v1",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//       },
//     })

//     this.messages = []
//   }

//   addSystemMessage(systemMsg) {
//     this.messages.push({
//       role: "system",
//       content: systemMsg,
//     })
//   }

//   async send() {
//     try {
//       const response = await this.httpClient.post("/chat/completions", {
//         model: "gpt-4",
//         messages: this.messages,
//       })
//       return response.data.choices[0].message.content
//     } catch (error) {
//       console.error("Error creating chat completion:", error)
//       throw error
//     }
//   }

//   async sendMessage(role, userMessage) {
//     this.messages.push({ role, content: userMessage })
//     try {
//       let assistantMessage = await this.send()
//       this.messages.push({ role: "assistant", content: assistantMessage })

//       return assistantMessage
//     } catch (error) {
//       console.error("Error creating chat completion:", error)
//       throw error
//     }
//   }
// }

// module.exports = GPT4API

// async function main() {
//   const gpt4 = new GPT4API()

//   gpt4.addSystemMessage(
//     "You are ChatGPT, a large language model trained by OpenAI."
//   )

//   try {
//     const userMessage = "Tell me a joke."
//     const assistantMessage = await gpt4.sendMessage("user", userMessage)
//     console.log("User:", userMessage)
//     console.log("Assistant:", assistantMessage)
//   } catch (error) {
//     console.error("Error in conversation:", error)
//   }
// }

// main()
