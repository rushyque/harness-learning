# 02 编程基础

> 目标：掌握足够用来"做练习、读源码、改系统"的工程能力。重点是 Python + NumPy，以及读懂 `deepseek-harness`（TypeScript/Node）所需的最低门槛。

## 为什么单独设一章

理论学得再深，最终都要落到代码上。这一章不追求编程竞赛，而是让你能：写干净可复现的脚本、用 NumPy 做矩阵运算、读得懂一个中型仓库、会用 Git 和测试兜底。

## 本子目录

> 本章 7 页均为完整正文，每页从"解决什么直觉问题"讲起，包含代码示例、**思考题与参考答案**、跨章链接，并配有 SVG 矢量图与 Mermaid 图解。

| 页 | 主题 | 一句话内容 |
|---|---|---|
| [02-01 Python 基础](02-01-python-basics.md) | 语法、类型、函数 | 对象模型、容器、作用域、异常 |
| [02-02 NumPy](02-02-numpy.md) | 数组、向量化 | 广播、视图、轴归约、线性预测 |
| [02-03 数据结构](02-03-data-structures.md) | 复杂度、常用容器 | 大 O、内置容器、优先队列 |
| [02-04 工程习惯](02-04-engineering-habits.md) | 可复现、测试、日志 | 种子、测试、logging、错误处理 |
| [02-05 版本控制](02-05-version-control.md) | Git 基础 | 三区域、分支、回滚、.gitignore |
| [02-06 读 TypeScript 仓库](02-06-reading-typescript.md) | TS/Node 心智模型 | TS↔Python、异步、monorepo、读仓库方法 |
| [02-07 用 Python 做研究](02-07-python-for-research.md) | notebook、绘图、复现 | notebook/脚本、matplotlib、研究骨架 |

## 与源码的衔接

`deepseek-harness` 是 **TypeScript / Node + pnpm monorepo**。你在 [02-06](02-06-reading-typescript.md) 会建立读它的心态；真正的拆解在 [10 实战 Lab](../10-practical-lab/README.md)。

## 与其他章的连接

- **向后衔接**：上一章 [01 数学基础](../01-math-foundations/README.md) 给了你"算"的语言，本章让你把它落成代码。
- **向前**：下一章 [03 机器学习](../03-machine-learning/README.md) 的所有练习都假设你能写 NumPy。

## 最小子集

至少读透：`02-02`、`02-03`、`02-04`。会让你后续所有章节的练习顺畅许多。

[返回目录](../../README.md)
