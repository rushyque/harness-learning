# 09 Agent 架构

> 目标：理解"框架"这层。不是每个人都要从零写一个 agent 框架，但只有理解设计范式，你才能在真实系统（如 `deepseek-harness`）上自如扩展。

> 可视化：本章 10 个正文页共嵌入 14 幅矢量图（关注点分离、能力缝三件套、插件装配与补丁、事件驱动 turn/step 流、model-visible ⟺ logged、append-only 日志、四层纵深防御、工作流 vs Agent、编排式多智能体、子代理、可观测三大信号、主动告警、快照与日志重放），统一采用章节配色，保证文字不重叠、布局稳定。

## 核心范式

这一章反复出现的几个概念是理解现代 agent 框架的钥匙：**能力缝（capability seam）**、**插件化组合**、**事件驱动循环**、**可追溯会话日志**、**作用域与权限**。

## 本子目录

本章 10 页均为完整正文，每页都从"解决什么直觉问题"讲起，包含定义、代码/类比验证、**思考题与参考答案**，以及与后续章节的链接。

| 页 | 主题 | 一句话内容 |
|---|---|---|
| [09-01 框架设计原则](09-01-design-principles.md) | 关注点分离、可替换 | 为什么"一切皆插件"有效 |
| [09-02 能力缝](09-02-capability-seam.md) | 定义/提供者/消费者 | 能力缝三件套与扩展 |
| [09-03 插件化组合](09-03-plugin-composition.md) | bundle、配置、补丁 | 配置驱动、依赖解析、profile |
| [09-04 事件驱动循环](09-04-event-loop.md) | turn/step/事件 | 事件、回调、审批挂钩 |
| [09-05 会话日志与可追溯](09-05-session-log.md) | model-visible ⟺ logged | 追溯硬规则、append-only |
| [09-06 作用域与权限](09-06-scope-permission.md) | 隔离、审批、沙箱 | 最小权限、白名单、纵深防御 |
| [09-07 工作流 vs Agent](09-07-workflow-vs-agent.md) | 确定性 vs 自主 | 两者取舍、混合范式 |
| [09-08 多智能体协作](09-08-multi-agent.md) | 子代理、编排、通信 | 子代理、编排式、新问题 |
| [09-09 可观测性](09-09-observability.md) | 日志、追踪、评估 | Logs/Metrics/Traces、告警 |
| [09-10 状态与恢复](09-10-state-recovery.md) | 持久化、fork、resume | 快照/重放/resume/fork |

## 与其他章的连接

- **向后衔接**：上一章 [08 Agent 基础](../08-agent-foundations/README.md) 讲清了"Agent 是什么"，本章讲"框架怎么把它组织起来"。
- **本页回扣**：这一章大量引用本仓库 [docs/architecture.md](../../docs/architecture.md) 与 [glossary](../../docs/glossary.md)，是最贴合真实源码的章节。
- **向前**：[10 实战 Lab](../10-practical-lab/README.md) 让你在这些概念上动手。

## 最小子集

至少读透：`09-02`、`09-05`、`09-06`。能力缝是扩展任何框架的钥匙，"model-visible ⟺ logged" 与最小权限是两条安全底线。

[返回目录](../../README.md)
