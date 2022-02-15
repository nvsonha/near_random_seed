# Demo - Aurora Random Function With Bomb Game Example

This repo is a companion to this video:
[![Demo](https://previews.123rf.com/images/sarahdesign/sarahdesign1403/sarahdesign140301122/26700150-demo-icon.jpg)](https://mytu.be)

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
random_seed() return a value that is less than a randomly generated threshold 128. 

- The thresholds can be found at Lines 15 - 23 in 'contracts/src/lib.rs'
(50% win percentage to 10% win percentage with an interval of 5%).

- Based on the following expected-value formula with the given probabilities and a fixed bet cost,
reward NEAR tokens are derived (in case of floats, ground values are used for game-owner's benefits).\
Bet each round: 5.\
Expected value: 0.5.\
| Win Percentage        | Reward           |\
| --------------------- |:----------------:|\		     
| 0.1___________________| 50_______________|\ 
| 0.15__________________| 31.66666667______|\
| 0.2___________________| 22.5_____________|\ 
| 0.25__________________| 17_______________|\ 
| 0.3___________________| 13.33333333______|\ 
| 0.35__________________| 10.71428571______|\ 
| 0.4___________________| 8.75_____________|\ 
| 0.45__________________| 7.222222222______|\ 
| 0.5___________________| 6________________| 
For example, if a player plays "Flip50", the player must bet 5 NEAR. If the player wins, a reward of 6
NEAR is given and updated to the player's credits.

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
