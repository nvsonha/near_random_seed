use borsh::{BorshDeserialize, BorshSerialize};
use near_sdk::{
    collections::UnorderedMap,
    env,
    json_types::{Base58PublicKey, U128},
    near_bindgen, AccountId, Balance, Promise, PublicKey,
};
use serde::Serialize;

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

const ONE_NEAR: u128 = 1_000_000_000_000_000_000_000_000;
const PROB50: u8 = 128;
const PROB45: u8 = 115;
const PROB40: u8 = 102;
const PROB35: u8 = 89;
const PROB30: u8 = 76;
const PROB25: u8 = 64;
const PROB20: u8 = 51;
const PROB15: u8 = 38;
const PROB10: u8 = 25;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct SlotMachine {
    pub owner_id: AccountId,
    pub credits: UnorderedMap<AccountId, Balance>,
}

impl Default for SlotMachine {
    fn default() -> Self {
        panic!("Should be initialized before usage")
    }
}

#[near_bindgen]
impl SlotMachine {
    #[init]
    pub fn new(owner_id: AccountId) -> Self {
        assert!(!env::state_exists(), "The contract is already initialized");
        assert!(
            env::is_valid_account_id(owner_id.as_bytes()),
            "Invalid owner account"
        );
        assert!(!env::state_exists(), "Already initialized");
        Self {
            owner_id,
            credits: UnorderedMap::new(b"credits".to_vec()),
        }
    }

    #[payable]
    pub fn deposit(&mut self) {
        let account_id = env::signer_account_id();
        let deposit = env::attached_deposit();
        let mut credits = self.credits.get(&account_id).unwrap_or(0);
        credits = credits + deposit;
        self.credits.insert(&account_id, &credits);
    }
    pub fn play50(&mut self) -> u8 {
        let account_id = env::signer_account_id();
        let mut credits = self.credits.get(&account_id).unwrap_or(0);
        assert!(credits > 0, "no credits to play");
        credits = credits - ONE_NEAR;
        let rand: u8 = *env::random_seed().get(0).unwrap();
        if rand < PROB50 {
            credits = credits + 10 * ONE_NEAR;
        }

        self.credits.insert(&account_id, &credits);
        rand
    }

    pub fn get_credits(&self, account_id: AccountId) -> U128 {
        self.credits.get(&account_id).unwrap_or(0).into()
    }
}
