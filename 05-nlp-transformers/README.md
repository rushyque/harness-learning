# 05 NLP 与 Transformer

> 目标：从"让机器理解文字"一路走到 Transformer 与预训练范式。这是进入大语言模型之前必须具备的架构语言。

## 核心脉络

NLP 的演进可以概括为一个问题不断升级的过程：

```text
怎么表示词（one-hot → 词向量）
  → 怎么建模顺序（RNN）
  → 怎么让模型关注重点（Attention）
  → 怎么并行地建模全部词（Transformer）
  → 怎么用海量文本预训练（BERT/GPT）
```

每一步都在解决上一步的瓶颈。理解这条线，Transformer 就不是凭空冒出来的。

## 本子目录

> 本章 9 页均为完整正文，每页从"解决什么直觉问题"讲起，包含定义、手算/代码验证、**思考题与参考答案**，以及与后续章节的链接。

> 视觉补充：本章 9 页共嵌入 **28 张**内容驱动的矢量图（第五章主体 + 拓展）。除了核心结构图（链式分解、词向量几何、BPE、Seq2Seq、注意力、Transformer 与因果掩码、位置编码、预训练目标、任务全景），还补充了 16 张概念图：统计计数 vs 神经网络、困惑度刻度、one-hot vs 稠密向量、共现矩阵、tokenizer 三件套、特殊 token、teacher forcing、beam search、scaled dot-product 数学、自注意力长距离、编码器-解码器宏观、GPT 只留解码器、RoPE 旋转、长度外推对比、预训练-微调流程、NER 的 BIO 标注。每张图都配了说明文字，用于把抽象的结构和路径画成可对照的图。图片位于 [assets/figures](../assets/figures/)。

| 页 | 主题 | 一句话内容 |
|---|---|---|
| [05-01 语言模型的起点](05-01-lm-basics.md) | 统计语言模型 | n-gram、困惑度、"预测下一个词" |
| [05-02 词表示](05-02-word-representation.md) | one-hot/word2vec/GloVe | 分布假说、词向量几何、一词多义 |
| [05-03 子词分词](05-03-tokenization.md) | BPE/WordPiece | 词表、编码/解码三件套 |
| [05-04 Seq2Seq](05-04-seq2seq.md) | 编码器-解码器 | 上下文向量、teacher forcing、beam search |
| [05-05 注意力机制](05-05-attention.md) | Attention 数学 | QKV、scaled dot-product、多头 |
| [05-06 Transformer](05-06-transformer.md) | 完整架构 | block 组装、因果掩码、维度三件套 |
| [05-07 位置编码](05-07-positional-encoding.md) | 顺序信息 | 正弦/可学习/RoPE、长度外推 |
| [05-08 预训练范式](05-08-pretraining.md) | BERT/GPT | MLM vs 自回归、预训练+微调 |
| [05-09 NLP 任务全景](05-09-nlp-tasks.md) | 分类/生成/抽取 | 常见任务的建模方式与速查表 |

## 与其他章的连接

- **向后衔接**：上一章 [04 深度学习](../04-deep-learning/README.md) 的 RNN/LSTM 解释了"为什么需要注意力"。
- **向前直达**：`05-06 Transformer` 与 `05-03 分词` 直接构成 [06 LLM 原理](../06-llm-fundamentals/README.md) 的骨架。
- **本页地基**：[04 RNN/LSTM](../04-deep-learning/04-08-rnn-lstm.md) 与 [01 信息论](../01-math-foundations/01-05-information-theory.md)。

## 最小子集

至少读透：`05-03`、`05-05`、`05-06`、`05-07`。这四个是你理解一切现代 LLM 论述的通行证。

[返回目录](../../README.md)
