# aa-leaderboard-rank

🏅 Rank numbers for the Artificial Analysis LLM leaderboard

| Category | Stack        |
| -------- | ------------ |
| Type     | Userscript   |
| Manager  | Tampermonkey |

## Install

1. Install [Tampermonkey](https://www.tampermonkey.net/)
2. Open [aa-leaderboard-rank.user.js](https://raw.githubusercontent.com/guanyme/aa-leaderboard-rank/main/aa-leaderboard-rank.user.js) and confirm the install

On Chrome, turn on **Allow User Scripts** in Tampermonkey's extension details first.

## Usage

Open the [LLM leaderboard](https://artificialanalysis.ai/leaderboards/models) (any locale, e.g. `/en/leaderboards/models`). Every model gets a rank number in front of its name, with the top three in gold, silver and bronze.

### Ranking

The number is the model's position in the current sort order. Sorting by another column or filtering the table renumbers it from 1. Models with the same score get consecutive numbers rather than a shared rank.

## License

[MIT](https://opensource.org/licenses/MIT) © Guany
