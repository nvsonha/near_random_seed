# Demo - Aurora Random Function With Bomb Game Example

This repo is a companion to this video:
[![Demo](https://i.ytimg.com/vi/WfE4b8QT3e0/maxresdefault.jpg)](https://youtu.be/WfE4b8QT3e0)

## Installation

- Follow NEAR Metabuild Hackathon guide to setup development environment: https://docs.near.org/docs/develop/basics/hackathon-startup-guide.
- Clone this repository and install dependencies by calling 'yarn'.

---

## NEAR Config

Regarding Aurora Random Function, this PR is given: https://github.com/aurora-is-near/aurora-engine/pull/368. Specifically, the function near_sdk::env::random_seed should be utilized.	

---

## React 17

- 'src/index.html', 'src/index.js' and 'src/components/*.js" handle front-end functionalities.

---

## Getting Started

- All back-end functionalities are implemented in Rust, which can be found in 'contracts/src/lib.rs'.
- Sign-in and sign-out NEAR accounts are handled with near-sdk 2.0.1,
which can be found in 'contracts/Cargo.toml'.
- Start the web game by calling 'yarn start'.
- Testnet account should be signed-in.
- Players needs to buy NEAR to deposit credits for betting. Players cannot do anything before depositing at least 5 NEAR to the game, because it costs 5 NEAR by each play round.
- Players are motivated to keep depositing and playing, thus the game is designed without any stop, except
sign-out button.
- After signing-out and signing-in again, the game credits are maintained.

---

## Game Description

- It a web game, thus it is mobile-friendly and pc-friendly.

- There are 9 buttons representing 9 play modes with different probabilities, e.g Flip50 yields "Won" if
random_seed() returns a value that is less than a randomly generated threshold 128. 

- The thresholds can be found at Lines 15 - 23 in 'contracts/src/lib.rs'
(50% win percentage to 10% win percentage with an interval of 5%).

- Based on an expected-value formula of 0.5 with the given probabilities and a fixed bet cost,
reward NEAR tokens are derived as follows:\
Bet each round equals 5.\
Expected value equals 0.5.\
Specifically, every round costs 5 NEAR to play or to bet. If a player wins, a NEAR profit for a winning round
is listed as follows:\
1) Flip50: 1 NEAR (50 percentage of winning opportunity)\
2) Flip45: 2 NEAR (45 percentage of winning opportunity)\
3) Flip40: 3 NEAR (40 percentage of winning opportunity)\
4) Flip35: 5 NEAR (35 percentage of winning opportunity)\
5) Flip30: 8 NEAR (30 percentage of winning opportunity)\
6) Flip25: 12 NEAR (25 percentage of winning opportunity)\
7) Flip20: 17 NEAR (20 percentage of winning opportunity)\
8) Flip15: 26 NEAR (15 percentage of winning opportunity)\
9) Flip10: 45 NEAR (10 percentage of winning opportunity)

- This game system is sustainable and able to re-designed for game rewards, which players collect
and trade game items for NEAR tokens.

- The withdraw function has not yet been implemented, because it depends on each game, i.e. limitation of
items and rewards that players can collect and trade.

---

## For Development

- To update back-end Rust functions, wasm binary file should be re-built.
- Contract should be re-deployed with near-cli: https://www.near-sdk.io/upgrading/prototyping.

---

Reference:
- https://reactjs.org/docs/context.html
- https://dmitripavlutin.com/use-react-memo-wisely/
- https://github.com/near-apps/nearbp
