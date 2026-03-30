# shared/

主进程与渲染进程共享的类型、常量与多语言资源。

## 文件列表

- `types.ts` - 跨进程类型定义与 IPC 通道常量；包含语言快照、配置、支持识别/润色两步 HUD 处理阶段的 Overlay、历史、日志、润色输出英文开关、`RecordingStartPayload` 与 `AudioChunkPayload`。
- `constants.ts` - GLM ASR / 文本润色默认值、静态术语表驱动的 refine system prompt（保留原始结构化润色规则，并可按配置追加整体输出英文模式，翻译时优先准确传达意思而非逐字直译）、中英混排空格规则、29 秒单请求限制、3 分钟会话限制、默认快捷键、录音参数与日志限制。
- `refine-url.ts` - 文本润色 Base URL 归一化与 `/chat/completions` 请求地址拼装工具。
- `i18n.ts` - 共享 i18n 资源与语言解析工具。
- `locales/en.json` - 英文文案资源。
- `locales/zh.json` - 中文文案资源。
