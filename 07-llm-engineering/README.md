# 07 LLM 工程

> 目标：从"知道 LLM 是什么"到"能训练、部署、对齐、评估一个 LLM 系统"。这是把研究转化为可靠产品的工程层。

## 核心范围

这一章回答的都是工程问题：如何把模型练出来、如何让它跑得快、如何让它"听话且少犯错"、如何衡量它到底行不行。

## 本子目录

> 本章 9 页均为完整正文，每页都从"解决什么直觉问题"讲起，包含定义、手算/代码验证、**思考题与参考答案**，以及与后续章节的链接。
>
> **可视化**：本章共 19 幅内容驱动的 SVG 示意图，覆盖训练流水线、3D 并行、checkpoint 续训、prefill/解码两阶段、KV cache、量化阶梯、投机解码、上下文窗口布局、prompt 四件套、RLHF/DPO 对齐、防幻觉工具箱与接地作答、评测阶梯与 Agent 评测维度、RAG 流程与向量检索、LoRA 低秩适配与微调决策流。

| 页 | 主题 | 一句话内容 |
|---|---|---|
| [07-01 训练工程](07-01-training-engineering.md) | 数据、并行、调度 | 数据管线、3D 并行、checkpoint |
| [07-02 推理优化](07-02-inference-optimization.md) | KV cache、量化、蒸馏 | KV cache、量化、投机解码 |
| [07-03 上下文工程](07-03-context-engineering.md) | Prompt、长上下文、压缩 | system prompt、few-shot、CoT、压缩 |
| [07-04 对齐](07-04-alignment.md) | RLHF、奖励模型 | reward model、PPO、KL 约束 |
| [07-05 DPO 与替代](07-05-dpo.md) | 无需强化学习的对齐 | 直接偏好优化、对比 RLHF |
| [07-06 幻觉与缓解](07-06-hallucination.md) | 检索、验证、抑制 | 训练/提示/推理/Agent 四层工具箱 |
| [07-07 评估基准](07-07-evaluation.md) | 自动/人工/agent 评估 | benchmark、LLM-judge、agent 评测 |
| [07-08 RAG](07-08-rag.md) | 检索增强 | 检索-注入-生成、向量检索、局限 |
| [07-09 微调实践](07-09-finetuning.md) | LoRA、指令微调 | 全量 vs LoRA、领域继续预训练 |

## 与其他章的连接

- **向后衔接**：上一章 [06 LLM 基础](../06-llm-fundamentals/README.md) 讲了模型怎么练出来，本章讲怎么把它用好。
- **向前直达**：`07-03 上下文工程` 与 `07-08 RAG` 是 [08 Agent 基础](../08-agent-foundations/README.md) 的直接工具。
- **本页地基**：[06 训练三阶段](../06-llm-fundamentals/06-05-training-stages.md)。

## 最小子集

至少读透：`07-02`、`07-04`、`07-07`。这三页覆盖"跑得快、听话、能评估"三件核心事。

[返回目录](../../README.md)
