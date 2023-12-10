'use client'
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import abiJson from '../../contract/artifacts/contracts/Vote.sol/Vote.json'
const useEthers = async() => {


    const { ethereum } = window as any

    const accounts = await ethereum.request({ method: "eth_requestAccounts" })
    const provider = new ethers.BrowserProvider(ethereum)
    const signer = await provider.getSigner();

    const contractInfo = {
        address: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
        abi: abiJson.abi,
        signer
    }

    const contract = new ethers.Contract(contractInfo.address, contractInfo.abi, signer);
    console.log('contract', { provider, account: accounts[0], contract })
    return { provider, account: signer, contract }
};

export default useEthers;
