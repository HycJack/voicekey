import axios from 'axios'

export type OpenAIMessageContent =
  | string
  | Array<
      | string
      | {
          type?: string
          text?: string
        }
    >

type OpenAIChoice = {
  message?: {
    content?: OpenAIMessageContent
  }
}

export type OpenAIResponse = {
  choices?: OpenAIChoice[]
  error?: {
    message?: string
    code?: string
  }
}

export function normalizeChatEndpoint(endpoint: string): string {
  const trimmed = endpoint.trim()
  if (!trimmed) {
    return ''
  }

  const normalized = trimmed.replace(/\/+$/, '')
  if (normalized.endsWith('/chat/completions')) {
    return normalized
  }

  return `${normalized}/chat/completions`
}

export async function requestChatCompletion(
  endpoint: string,
  apiKey: string,
  payload: Record<string, unknown>,
  timeoutMs: number,
): Promise<OpenAIResponse> {
  const response = await axios.post<OpenAIResponse>(endpoint, payload, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    timeout: timeoutMs,
    responseType: 'json',
    responseEncoding: 'utf8',
  })

  return response.data
}

export function extractAxiosErrorMessage(error: unknown): string {
  if (!axios.isAxiosError(error)) {
    return 'Unknown error'
  }

  const responseError = error.response?.data
  if (
    typeof responseError === 'object' &&
    responseError &&
    'error' in responseError &&
    typeof responseError.error === 'object' &&
    responseError.error &&
    'message' in responseError.error &&
    typeof responseError.error.message === 'string'
  ) {
    return responseError.error.message
  }

  return error.message
}

export function extractMessageContent(data: OpenAIResponse): string {
  const content = data.choices?.[0]?.message?.content
  if (!content) {
    return ''
  }

  if (typeof content === 'string') {
    return content.trim()
  }

  return content
    .map((part) => {
      if (typeof part === 'string') {
        return part
      }

      return typeof part.text === 'string' ? part.text : ''
    })
    .join('')
    .trim()
}
