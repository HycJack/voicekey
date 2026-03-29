import { OPENAI_CHAT } from '../../shared/constants'
import type { LLMRefineConfig } from '../../shared/types'
import { normalizeChatEndpoint } from './openai-client'

export interface ResolvedRefineRequestConfig {
  endpoint: string
  apiKey: string
  model: string
  timeoutMs: number
  maxTokens: number
  temperature: number
  systemPrompt: string
}

export function resolveRefineRequestConfig(
  refineConfig: LLMRefineConfig,
): ResolvedRefineRequestConfig | null {
  const endpoint = normalizeChatEndpoint(refineConfig.endpoint)
  const model = refineConfig.model.trim()
  const apiKey = refineConfig.apiKey.trim()

  if (!endpoint || !model || !apiKey) {
    return null
  }

  return {
    endpoint,
    model,
    apiKey,
    timeoutMs: OPENAI_CHAT.TIMEOUT_MS,
    maxTokens: OPENAI_CHAT.MAX_TOKENS,
    temperature: OPENAI_CHAT.TEMPERATURE,
    systemPrompt: OPENAI_CHAT.SYSTEM_PROMPT,
  }
}
