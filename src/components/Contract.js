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

    const handlePlay = async () => {
        const contract = getContract(account);
        const outcome = await contract.play50({}, GAS)
        outcomes.push(outcome)
        flips.push(outcome < 128)
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
            <Button onClick={() => handlePlay()}>Flip50</Button>
            <Button onClick={() => handlePlay()}>Flip45</Button>
            <Button onClick={() => handlePlay()}>Flip40</Button>
        </ButtonGroup>
        <br />
        <ButtonGroup>
            <Button onClick={() => handlePlay()}>Flip35</Button>
            <Button onClick={() => handlePlay()}>Flip30</Button>
            <Button onClick={() => handlePlay()}>Flip25</Button>
        </ButtonGroup>
        <br />
        <ButtonGroup>
            <Button onClick={() => handlePlay()}>Flip20</Button>
            <Button onClick={() => handlePlay()}>Flip15</Button>
            <Button onClick={() => handlePlay()}>Flip10</Button>
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
