export interface Message {
  role: Role
  content: string
}
export type Role = "system" | "user" | "assistant"
export interface GPT4Request {
  model?: string
  messages: Message[]
  temperature?: number
  max_tokens?: number
}

export interface GPT4Response {
  id: string
  object: string
  created: number
  model: string
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
  choices: Array<{
    message: Message
    finish_reason: string
  }>
}
