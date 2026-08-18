# 术语表

> 按章分组的速查索引：每个术语给出英文、一句话说明与首次系统讲解的页面。读正文遇到眼生的词，先来这里定位出处。

## 使用方式

术语按首次系统讲解所在章分组；同一术语在多章出现时，链接指向讲得最完整的那页。左侧搜索框可以全文检索。

## 01 数学基础

| 术语 | 英文 | 一句话说明 | 讲解页 |
|---|---|---|---|
| 期望 | expected value | 随机变量取值的加权平均，描述"中心位置" | [01-03](../01-math-foundations/01-03-expectation.md) |
| 方差 | variance | 偏离期望的平方平均，描述"波动大小" | [01-03](../01-math-foundations/01-03-expectation.md) |
| 总体 | population | 想描述的全部对象 | [01-03](../01-math-foundations/01-03-expectation.md) |
| 样本 | sample | 从总体中实际观测到的一部分 | [01-03](../01-math-foundations/01-03-expectation.md) |
| 自信息 | self-information | 一个事件发生携带的信息量，概率越小信息越大 | [01-05](../01-math-foundations/01-05-information-theory.md) |
| 比特 | bit | 以 2 为底的信息量单位 | [01-05](../01-math-foundations/01-05-information-theory.md) |
| 最优化 | optimization | 在约束下寻找使目标最优的参数 | [01-07](../01-math-foundations/01-07-optimization.md) |
| 截断 SVD | truncated SVD | 只保留最大奇异值的低秩近似分解 | [01-08](../01-math-foundations/01-08-matrix-decomposition.md) |
| 邻居 | neighbor | 图中直接相连的两个点 | [01-09](../01-math-foundations/01-09-probabilistic-graphs.md) |
| 邻接矩阵 | adjacency matrix | 用 0/1 矩阵表示"谁连谁" | [01-09](../01-math-foundations/01-09-probabilistic-graphs.md) |
| 拉普拉斯矩阵 | Laplacian | 度矩阵减邻接矩阵，刻画图上的"差分" | [01-09](../01-math-foundations/01-09-probabilistic-graphs.md) |

## 02 编程基础

| 术语 | 英文 | 一句话说明 | 讲解页 |
|---|---|---|---|
| 广播 | broadcasting | NumPy 让不同形状数组按规则自动对齐再运算的机制 | [02-02](../02-programming-basics/02-02-numpy.md) |
| 提交 | commit | Git 的一次快照式存档 | [02-05](../02-programming-basics/02-05-version-control.md) |
| 冲突 | conflict | 两分支改了同一处，合并时需人工裁决 | [02-05](../02-programming-basics/02-05-version-control.md) |
| 分支 + PR | Pull Request | 拉取请求 | [02-05](../02-programming-basics/02-05-version-control.md) |

## 03 机器学习

| 术语 | 英文 | 一句话说明 | 讲解页 |
|---|---|---|---|
| 基线 | baseline | 用来对照的"最笨但能跑"参照方法 | [03-01](../03-machine-learning/03-01-supervised-overview.md) |
| 负对数似然 | NLL | 负的对数似然，分类任务的标准损失 | [03-03](../03-machine-learning/03-03-logistic-regression.md) |
| 早停 | early stopping | 验证集变差就停训，防过拟合 | [03-04](../03-machine-learning/03-04-bias-variance.md) |
| 肘部法则 | elbow | 看"误差下降拐点"选簇数的方法 | [03-07](../03-machine-learning/03-07-unsupervised.md) |
| 标准化 | StandardScaler | 减均值除标准差的缩放器 | [03-08](../03-machine-learning/03-08-feature-engineering.md) |
| 归一化 | MinMaxScaler | 压到 [0,1] 区间的缩放器 | [03-08](../03-machine-learning/03-08-feature-engineering.md) |
| 目标编码 | target encoding | 用目标统计量给类别特征编码 | [03-08](../03-machine-learning/03-08-feature-engineering.md) |

## 04 深度学习

| 术语 | 英文 | 一句话说明 | 讲解页 |
|---|---|---|---|
| 神经元 | neuron | 加权求和加非线性的基本计算单元 | [04-01](../04-deep-learning/04-01-neural-net-intuition.md) |
| 单元 | unit | 神经元在同层语境下的别名 | [04-01](../04-deep-learning/04-01-neural-net-intuition.md) |
| 权重 | weights | 输入的加权系数，训练要学的参数 | [04-01](../04-deep-learning/04-01-neural-net-intuition.md) |
| 偏置 | bias | 加权和之后的平移量，让拟合更灵活 | [04-01](../04-deep-learning/04-01-neural-net-intuition.md) |
| 激活函数 | activation function | 引入非线性的函数 | [04-01](../04-deep-learning/04-01-neural-net-intuition.md) |
| 深度网络 | deep network | 多个隐藏层堆叠的网络 | [04-01](../04-deep-learning/04-01-neural-net-intuition.md) |
| 隐藏层 | hidden layer | 输入输出之间的中间层 | [04-01](../04-deep-learning/04-01-neural-net-intuition.md) |
| 反向传播 | backpropagation | 链式法则自动算出全部梯度的算法 | [04-02](../04-deep-learning/04-02-backpropagation.md) |
| 链式法则 | chain rule | 复合函数的导数逐层相乘法则 | [04-02](../04-deep-learning/04-02-backpropagation.md) |
| 计算图 | computational graph | 把计算画成图以便系统性求导 | [04-02](../04-deep-learning/04-02-backpropagation.md) |
| 前向传播 | forward pass | 从输入算到输出的过程 | [04-02](../04-deep-learning/04-02-backpropagation.md) |
| 反向传播 | backward pass | 从输出损失反推各层梯度的过程 | [04-02](../04-deep-learning/04-02-backpropagation.md) |
| 梯度消失 | vanishing gradient | 梯度逐层缩小导致深层学不动 | [04-03](../04-deep-learning/04-03-activations.md) |
| ELU | Exponential Linear Unit | 负区平滑趋近 -1 的激活函数 | [04-03](../04-deep-learning/04-03-activations.md) |
| 困惑度 | perplexity | 困惑度：下一词的平均选择数，越低越好 | [04-04](../04-deep-learning/04-04-loss-functions.md) |
| 峡谷 | ravine | 狭长陡峭的山谷地形，梯度下降易震荡 | [04-05](../04-deep-learning/04-05-optimizers.md) |
| Adam | Adaptive Moment Estimation | 自适应动量的优化器 Adam | [04-05](../04-deep-learning/04-05-optimizers.md) |
| 余弦退火 | cosine annealing | 学习率按余弦曲线先慢后快再缓降 | [04-05](../04-deep-learning/04-05-optimizers.md) |
| 滤波器 | filter / kernel | 也叫卷积核 | [04-07](../04-deep-learning/04-07-cnn.md) |
| 感受野 | receptive field | 一个输出像素能"看到"的输入区域大小 | [04-07](../04-deep-learning/04-07-cnn.md) |
| 池化 | pooling | 局部取最大/平均来缩小特征图 | [04-07](../04-deep-learning/04-07-cnn.md) |
| 残差连接 | skip connection | 跨层直连，让梯度有高速公路 | [04-07](../04-deep-learning/04-07-cnn.md) |
| LSTM | Long Short-Term Memory | 长短期记忆 | [04-08](../04-deep-learning/04-08-rnn-lstm.md) |
| 细胞状态 | cell state | LSTM 中贯穿时间的信息传送带 | [04-08](../04-deep-learning/04-08-rnn-lstm.md) |
| GRU | Gated Recurrent Unit | LSTM 的简化版门控循环单元 | [04-08](../04-deep-learning/04-08-rnn-lstm.md) |
| 出现空闲 | bubble | 流水线气泡 | [04-09](../04-deep-learning/04-09-distributed.md) |
| 梯度累积 | gradient accumulation | 多个小 batch 梯度攒起来再更新，等效大 batch | [04-09](../04-deep-learning/04-09-distributed.md) |

## 05 NLP 与 Transformer

| 术语 | 英文 | 一句话说明 | 讲解页 |
|---|---|---|---|
| 大语言模型 | LLM | 大语言模型 | [05-01](../05-nlp-transformers/05-01-lm-basics.md) |
| 向量 | vector | 一组数表示的有序列表 | [05-02](../05-nlp-transformers/05-02-word-representation.md) |
| 词向量 / 词嵌入 | word embedding | 把词映射为稠密向量 | [05-02](../05-nlp-transformers/05-02-word-representation.md) |
| 分布假说 | Distributional Hypothesis | 上下文相似的词语义相近 | [05-02](../05-nlp-transformers/05-02-word-representation.md) |
| CBOW | Continuous Bag of Words | 用上下文预测中心词的词向量训练法 | [05-02](../05-nlp-transformers/05-02-word-representation.md) |
| GloVe | Global Vectors | 全局向量 | [05-02](../05-nlp-transformers/05-02-word-representation.md) |
| 上下文相关的表示 | contextualized embeddings | 随上下文变化的词表示 | [05-02](../05-nlp-transformers/05-02-word-representation.md) |
| 序列到序列 | Sequence-to-Sequence | Seq2Seq | [05-04](../05-nlp-transformers/05-04-seq2seq.md) |
| 编码器-解码器 | Encoder-Decoder | 先把输入压成表示、再从表示生成输出的两段结构 | [05-04](../05-nlp-transformers/05-04-seq2seq.md) |
| 编码器 | Encoder | 把输入序列变成表示的部分 | [05-04](../05-nlp-transformers/05-04-seq2seq.md) |
| 解码器 | Decoder | 从表示逐词生成输出的部分 | [05-04](../05-nlp-transformers/05-04-seq2seq.md) |
| 贪心解码 | greedy search | 每步都取当前概率最高的词 | [05-04](../05-nlp-transformers/05-04-seq2seq.md) |
| QKV | Query-Key-Value | 注意力的检索三件套 | [05-05](../05-nlp-transformers/05-05-attention.md) |
| 自注意力 | self-attention | 序列内部元素互相注意的机制 | [05-05](../05-nlp-transformers/05-05-attention.md) |
| 多头注意力 | Multi-Head Attention | 多组注意力并行捕捉不同关系 | [05-05](../05-nlp-transformers/05-05-attention.md) |
| 交叉注意力 | cross-attention | 解码器查询编码器输出的注意力 | [05-06](../05-nlp-transformers/05-06-transformer.md) |
| 因果掩码 | causal mask | 禁止看到未来位置的掩码 | [05-06](../05-nlp-transformers/05-06-transformer.md) |
| 置换不变 | permutation invariant | 打乱输入顺序输出不变 | [05-07](../05-nlp-transformers/05-07-positional-encoding.md) |
| 正弦波 | sinusoidal | 不同频率 sin/cos 叠加的位置编码 | [05-07](../05-nlp-transformers/05-07-positional-encoding.md) |
| 旋转位置编码 | RoPE | Rotary Position Embedding | [05-07](../05-nlp-transformers/05-07-positional-encoding.md) |
| 长度外推 | length extrapolation | 用比训练更长的序列推理 | [05-07](../05-nlp-transformers/05-07-positional-encoding.md) |
| 预训练 + 微调 | pretrain + finetune | 先通用预训练、再下游任务微调的两段范式 | [05-08](../05-nlp-transformers/05-08-pretraining.md) |
| 掩码语言建模 | Masked Language Modeling | MLM | [05-08](../05-nlp-transformers/05-08-pretraining.md) |
| 自回归语言建模 | autoregressive LM | 根据前文预测下一词的建模方式 | [05-08](../05-nlp-transformers/05-08-pretraining.md) |
| 任务头 | head | 骨干网络顶部的小任务专属层 | [05-08](../05-nlp-transformers/05-08-pretraining.md) |
| 灾难性遗忘 | catastrophic forgetting | 学新任务时旧能力大幅丢失 | [05-08](../05-nlp-transformers/05-08-pretraining.md) |
| 提示工程 | prompting | 不训练、只改输入来引导模型 | [05-08](../05-nlp-transformers/05-08-pretraining.md) |
| 命名实体识别 | NER | 从文本中找出人名/地名/机构名等实体 | [05-09](../05-nlp-transformers/05-09-nlp-tasks.md) |

## 06 LLM 基础

| 术语 | 英文 | 一句话说明 | 讲解页 |
|---|---|---|---|
| 幻觉 | hallucination | 模型一本正经地编造 | [06-01](../06-llm-fundamentals/06-01-what-is-llm.md) |
| 输出头 | LM Head | 把隐藏状态映射到词表概率的输出层 | [06-02](../06-llm-fundamentals/06-02-token-through-model.md) |
| 贪心 | greedy | 每步取概率最高的词 | [06-02](../06-llm-fundamentals/06-02-token-through-model.md) |
| 采样 | sampling | 按概率分布随机取词 | [06-02](../06-llm-fundamentals/06-02-token-through-model.md) |
| 缩放定律 | Scaling Laws | 缩放=规模化 | [06-04](../06-llm-fundamentals/06-04-scaling-laws.md) |
| RLHF | Reinforcement Learning from Human Feedback | 基于人类反馈的强化学习；强化学习见 [01 章](../01-math-foundations/README.md) 之外的 [08](../08-agent-foundations/README.md) 语境，这里只需理解为"用奖励信号训练模型" | [06-05](../06-llm-fundamentals/06-05-training-stages.md) |
| 上下文窗口 | context window | 模型一次能看到的 token 上限 | [06-07](../06-llm-fundamentals/06-07-context-window.md) |
| 涌现能力 | emergent capabilities | 规模到一定程度才显现的新能力 | [06-08](../06-llm-fundamentals/06-08-emergent-capabilities.md) |

## 07 LLM 工程

| 术语 | 英文 | 一句话说明 | 讲解页 |
|---|---|---|---|
| 检查点 | checkpoint | 训练中途保存的完整状态 | [07-01](../07-llm-engineering/07-01-training-engineering.md) |
| 知识蒸馏 | knowledge distillation | 用大模型输出教小模型 | [07-02](../07-llm-engineering/07-02-inference-optimization.md) |
| 上下文工程 | context engineering | 设计"模型每次看到什么"的工程 | [07-03](../07-llm-engineering/07-03-context-engineering.md) |
| 自洽性 | self-consistency | 多次采样取多数答案 | [07-03](../07-llm-engineering/07-03-context-engineering.md) |
| 思维树 | Tree-of-Thoughts | 让模型沿多条思路分支探索再择优 | [07-03](../07-llm-engineering/07-03-context-engineering.md) |
| 对齐 | alignment | 让模型行为符合人类意图的调适 | [07-04](../07-llm-engineering/07-04-alignment.md) |
| 奖励模型 | reward model | 学会给回答打分的模型 | [07-04](../07-llm-engineering/07-04-alignment.md) |
| KL 散度 | KL divergence | 衡量两个分布差异的非对称度量 | [07-04](../07-llm-engineering/07-04-alignment.md) |
| DPO | Direct Preference Optimization | 直接偏好优化 | [07-05](../07-llm-engineering/07-05-dpo.md) |
| RAG | Retrieval-Augmented Generation | 检索增强生成 | [07-08](../07-llm-engineering/07-08-rag.md) |
| 全量微调 | full fine-tuning | 更新全部参数的微调 | [07-09](../07-llm-engineering/07-09-finetuning.md) |
| 参数高效微调 | PEFT | 只训练少量新增参数的微调家族 | [07-09](../07-llm-engineering/07-09-finetuning.md) |
| LoRA | Low-Rank Adaptation | 低秩适配 | [07-09](../07-llm-engineering/07-09-finetuning.md) |
| 指令微调（SFT） | SFT | 用指令-回答对监督训练 | [07-09](../07-llm-engineering/07-09-finetuning.md) |
| 继续预训练 | domain-adaptive pretraining | 在领域语料上继续预训练 | [07-09](../07-llm-engineering/07-09-finetuning.md) |

## 08 Agent 基础

| 术语 | 英文 | 一句话说明 | 讲解页 |
|---|---|---|---|
| 闭环 | closed loop | 行动结果回流影响下一步决策 | [08-01](../08-agent-foundations/08-01-what-is-an-agent.md) |
| ReAct | Reason + Act | 思考与行动交替 | [08-01](../08-agent-foundations/08-01-what-is-an-agent.md) |
| 循环（loop） | loop | "调模型-执行-再调"的反复过程 | [08-01](../08-agent-foundations/08-01-what-is-an-agent.md) |
| 能力缝 | capability seam | 定义/提供者/消费者三件套的扩展点 | [08-01](../08-agent-foundations/08-01-what-is-an-agent.md) |
| 工具（tools） | tools | 模型可调用的外部能力 | [08-02](../08-agent-foundations/08-02-tools-and-function-calling.md) |
| Agent 循环 | agent loop | Agent 反复"请求-执行-观察"的主循环 | [08-03](../08-agent-foundations/08-03-agent-loop.md) |
| 规划 | planning | 把目标拆成可执行子任务 | [08-05](../08-agent-foundations/08-05-planning.md) |
| 多步推理 | multi-step reasoning | 多步推导而非一步出答案 | [08-07](../08-agent-foundations/08-07-multi-step.md) |

## 09 Agent 架构

| 术语 | 英文 | 一句话说明 | 讲解页 |
|---|---|---|---|
| 关注点分离 | separation of concerns | 各模块只管一件事 | [09-01](../09-agent-architecture/09-01-design-principles.md) |
| 最小权限 | least privilege | 只给完成任务所需的最小权限 | [09-06](../09-agent-architecture/09-06-scope-permission.md) |
| 沙箱 | sandbox | 限制进程能力的隔离执行环境 | [09-06](../09-agent-architecture/09-06-scope-permission.md) |
| 纵深防御 | defense in depth | 多层防线叠加，单层失效不致全局失守 | [09-06](../09-agent-architecture/09-06-scope-permission.md) |
| 多智能体 | multi-agent | 多个 Agent 分工协作 | [09-08](../09-agent-architecture/09-08-multi-agent.md) |

## 10 实战 Lab

| 术语 | 英文 | 一句话说明 | 讲解页 |
|---|---|---|---|
| MCP | Model Context Protocol | 连接外部工具服务器的开放协议 | [10-07](../10-practical-lab/10-07-mcp.md) |

## 11 安全与治理

| 术语 | 英文 | 一句话说明 | 讲解页 |
|---|---|---|---|
| 提示注入 | prompt injection | 把恶意指令混进模型输入的攻击 | [11-03](../11-safety-governance/11-03-prompt-injection.md) |
| 凭据引用 | credential reference | 配置只存代号、执行时才解析注入 | [11-05](../11-safety-governance/11-05-privacy.md) |
| 脱敏 | sanitize/mask | 把敏感片段替换成打码形式 | [11-05](../11-safety-governance/11-05-privacy.md) |
| 红队 | red team | 用攻击者思维主动找漏洞 | [11-06](../11-safety-governance/11-06-redteam.md) |
| 不可抵赖性 | non-repudiation | 事后无法否认动作确实发生过 | [11-07](../11-safety-governance/11-07-audit.md) |
| 门禁（gate） | gate | 不通过自动检查就不放行的关卡 | [11-08](../11-safety-governance/11-08-eval-driven.md) |

## 08 Agent 基础

| 术语 | 英文 | 一句话说明 | 讲解页 |
|---|---|---|---|
| Agent（智能体） | Agent | 能调用工具、观察结果、循环行动直到完成任务的语言模型系统 | [08-01](../08-agent-foundations/08-01-what-is-an-agent.md) |
| turn | turn | 一次完整处理 | [08-03](../08-agent-foundations/08-03-agent-loop.md) |
| step | step | turn 内的一次模型请求及其工具执行 | [08-03](../08-agent-foundations/08-03-agent-loop.md) |

## 06 LLM 基础

| 术语 | 英文 | 一句话说明 | 讲解页 |
|---|---|---|---|
| Tokenizer | Tokenizer | 把文本切分为 token 的工具 | [06-03](../06-llm-fundamentals/06-03-tokenizer.md) |

## 09 Agent 架构

| 术语 | 英文 | 一句话说明 | 讲解页 |
|---|---|---|---|
| model-visible ⟺ logged | model-visible ⟺ logged | 模型可见输入必须可从会话日志重建的硬规则 | [09-05](../09-agent-architecture/09-05-session-log.md) |

> 想系统性补概念，回到对应章的 README；想看 harness 官方定义，见仓库 [docs/glossary.md](../../docs/glossary.md)。

[返回目录](../README.md)
