'use client'
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import abiJson from '../../contract/artifacts/contracts/Vote.sol/Vote.json';

const useEthers = () => {
    const [contract, setContract] = useState<any>(null);
    const [account, setAccount] = useState<any>(null);
    useEffect(() => {
        const getContract = async () => {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum)
                const signer = await provider.getSigner();
                const network = await provider.getNetwork();
                const contractInstance = new ethers.Contract(abiJson.info.address, abiJson.abi, signer);
                setAccount(signer);
                setContract(contractInstance);
            } catch (error) {
                console.error('Error retrieving contract:', error);
            }
        };

        getContract();
    }, []);

    return {contract, account};
};

export default useEthers;

