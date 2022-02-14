import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup } from '@mui/material'
import * as nearAPI from 'near-api-js';
import { GAS, parseNearAmount } from '../state/near';
import {
    createAccessKeyAccount,
    getContract,
} from '../utils/near-utils';

const {
    KeyPair,
    utils: { format: { formatNearAmount } }
} = nearAPI;

export const Contract = ({ near, update, account }) => {

    if (!account) return null;

    const [credits, setCredits] = useState('');
    const [amount, setAmount] = useState('');
    const [flips, setFlips] = useState([]);
    const [outcomes, setOutcomes] = useState([]);

    useEffect(() => {
        updateCredits();
    }, []);

    const updateCredits = async () => {
        const contract = getContract(account);
        setCredits(await contract.get_credits({ account_id: account.accountId }))
    };

    const handleDeposit = async () => {
        const contract = getContract(account);
        await contract.deposit({}, GAS, parseNearAmount(amount))
        updateCredits()
    };

    const handlePlay50 = async () => {
        const contract = getContract(account);
        const outcome = await contract.play50({}, GAS)
        outcomes.push(outcome)
        flips.push(outcome < 128)
        updateCredits()
    };

    const handlePlay45 = async () => {
        const contract = getContract(account);
        const outcome = await contract.play45({}, GAS)
        outcomes.push(outcome)
        flips.push(outcome < 115)
        updateCredits()
    };

    const handlePlay40 = async () => {
        const contract = getContract(account);
        const outcome = await contract.play40({}, GAS)
        outcomes.push(outcome)
        flips.push(outcome < 102)
        updateCredits()
    };

    const handlePlay35 = async () => {
        const contract = getContract(account);
        const outcome = await contract.play35({}, GAS)
        outcomes.push(outcome)
        flips.push(outcome < 89)
        updateCredits()
    };

    const handlePlay30 = async () => {
        const contract = getContract(account);
        const outcome = await contract.play30({}, GAS)
        outcomes.push(outcome)
        flips.push(outcome < 76)
        updateCredits()
    };

    const handlePlay25 = async () => {
        const contract = getContract(account);
        const outcome = await contract.play25({}, GAS)
        outcomes.push(outcome)
        flips.push(outcome < 64)
        updateCredits()
    };

    const handlePlay20 = async () => {
        const contract = getContract(account);
        const outcome = await contract.play20({}, GAS)
        outcomes.push(outcome)
        flips.push(outcome < 51)
        updateCredits()
    };

    const handlePlay15 = async () => {
        const contract = getContract(account);
        const outcome = await contract.play15({}, GAS)
        outcomes.push(outcome)
        flips.push(outcome < 38)
        updateCredits()
    };

    const handlePlay10 = async () => {
        const contract = getContract(account);
        const outcome = await contract.play10({}, GAS)
        outcomes.push(outcome)
        flips.push(outcome < 25)
        updateCredits()
    };

    return <>
        <h3>Play</h3>
        <p>Current Credits: {formatNearAmount(credits, 0)}</p>
        <input placeholder="Credits (N)" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <br />
        <button onClick={() => handleDeposit()}>Buy Credits</button>
        <br />
        <br />
        <ButtonGroup>
            <Button onClick={() => handlePlay50()}>Flip50</Button>
            <Button onClick={() => handlePlay45()}>Flip45</Button>
            <Button onClick={() => handlePlay40()}>Flip40</Button>
        </ButtonGroup>
        <br />
        <ButtonGroup>
            <Button onClick={() => handlePlay35()}>Flip35</Button>
            <Button onClick={() => handlePlay30()}>Flip30</Button>
            <Button onClick={() => handlePlay25()}>Flip25</Button>
        </ButtonGroup>
        <br />
        <ButtonGroup>
            <Button onClick={() => handlePlay20()}>Flip20</Button>
            <Button onClick={() => handlePlay15()}>Flip15</Button>
            <Button onClick={() => handlePlay10()}>Flip10</Button>
        </ButtonGroup>
        <br />
        <br />
        {
            outcomes.map((f, i) => {
                return (
                    <p key={i}>{f}{flips[i] ? <p key={i}>Won</p> : <p key={i}>Lost</p>}</p>
                );
            })
        }
    </>;
};
