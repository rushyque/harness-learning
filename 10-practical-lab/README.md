# 10 实战 Lab

> 目标：在 `deepseek-harness` 上真正动手——读代码、跑任务、写一个自己的插件。这是让前面所有"概念"变成"能力"的地方。

> 可视化：本章 10 个正文页共嵌入 10 幅矢量图（源码/产物双平面、启动链、事件流投影、循环出口与守卫、工具信息流、工具/Skill/MCP 分工、MCP 客户端连接、profile 配方、bundle 层级、诊断循环），统一采用章节配色，保证文字不重叠、布局稳定。

## 前置准备

进入本章前，请确认环境就绪（参考 [AGENTS.md](../../AGENTS.md) 的命令）：

```sh
pnpm install
pnpm run build
```

Lab 练习需要模型密钥的会明确标注；无密钥的任务（如读代码、写插件、跑单元测试）不受影响。

## 本子目录

本章 10 页均为完整正文，每页都从"解决什么直觉问题"讲起，包含步骤、验证、**思考题与参考答案**，以及与后续章节的链接。

| 页 | 主题 | 一句话内容 |
|---|---|---|
| [10-01 环境与仓库](10-01-environment.md) | 结构、命令、双平面 | 装环境、建产物、跑通命令 |
| [10-02 读懂启动流程](10-02-boot-flow.md) | profile、bundle、入口 | dsh 启动链、插件注册 |
| [10-03 拆解会话日志](10-03-session-internals.md) | core/session | SessionEvent、projection、可回放 |
| [10-04 拆解 Agent 循环](10-04-agent-loop.md) | core/agent-loop | turn/step 驱动、终止与守卫 |
| [10-05 写一个工具](10-05-write-a-tool.md) | 注册到 ctx.tools | 契约+逻辑+注册、验证 |
| [10-06 写一个 skill](10-06-write-a-skill.md) | skill 目录 | SKILL.md、触发、与工具/MCP 关系 |
| [10-07 接入 MCP 服务器](10-07-mcp.md) | 外部工具 | 协议、为何用、接入步骤 |
| [10-08 搭自定义 profile](10-08-custom-profile.md) | 组合与补丁 | 目标→工具→模型→权限→系统提示 |
| [10-09 写一个插件 bundle](10-09-plugin-bundle.md) | 独立扩展 | 工具→插件→bundle、cordis.patch.yml |
| [10-10 端到端任务](10-10-end-to-end.md) | 综合 | 综合任务、诊断循环、复盘 |

## 与其他章的连接

- **向后衔接**：上一章 [09 Agent 架构](../09-agent-architecture/README.md) 的概念语汇在本章逐页落地。
- **向后**：做完本章，建议进入 [11 安全与治理](../11-safety-governance/README.md) 补责任意识。

## 最小子集

至少做透：`10-01`、`10-03`、`10-05`。读懂仓库结构、看懂会话日志、写出第一个工具，就从"读过"变成"会改"。

[返回目录](../../README.md)
