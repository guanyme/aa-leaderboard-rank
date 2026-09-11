# aa-leaderboard-rank

🏅 给 Artificial Analysis 的 LLM 排行榜加上排名序号

| 类别   | 技术栈       |
| ------ | ------------ |
| 类型   | 用户脚本     |
| 管理器 | Tampermonkey |

## 安装

1. 安装 [Tampermonkey（篡改猴）](https://www.tampermonkey.net/)
2. 打开 [aa-leaderboard-rank.user.js](https://raw.githubusercontent.com/guanyme/aa-leaderboard-rank/main/aa-leaderboard-rank.user.js)，确认安装

在 Chrome 中需要先到 Tampermonkey 的扩展详情里打开「允许用户脚本」。

## 使用说明

打开 [LLM 排行榜](https://artificialanalysis.ai/zh/leaderboards/models)（任意语言版本均可），每个模型名前会显示排名序号，前三名分别以金、银、铜色标出。

### 排名规则

序号是模型在当前排序下的位置。按其他列排序或筛选后，会从 1 重新编号。分数相同的模型依次编号，不合并为并列名次。

## 使用许可

[MIT](https://opensource.org/licenses/MIT) © Guany
