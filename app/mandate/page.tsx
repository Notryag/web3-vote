'use client'
import { Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import useEthers from '../hooks/useEthers';
import { ethers } from 'ethers'

const Mandate: React.FC = () => {
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [contract, setContract] = useState<ethers.Contract | null>(null)


    async function getHost() {
        const host = await contract?.host()
        console.log(host, 'hoset')
        setInput1(host)
    }

    const handleMandate = async () => { 
        const mandateArress = input2.split('\n')
        const tx = await contract?.mandate(mandateArress)
        await tx?.wait()
        console.log('mandate success')
    }



    // const ethersContract = useEthers();

    useEffect(() => {
        async function init() {
            const {contract} = await useEthers();
            setContract(contract)
            await getHost()
        }
        init()
    }, [])


    const handleInputChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput2(e.target.value);
    }

    return (
        <div>
            <h1>Mandate Page</h1>
            {/* Add your content here */}
            <div>
                主持人
                <Input type="text" disabled value={input1} />
            </div>
            <div>
                投票人地址
                <Input type="text" value={input2} onChange={handleInputChange2} />
            </div>
            <div>
                <button onClick={handleMandate}>分发投票权</button>
            </div>
            <button onClick={getHost}>get host</button>
        </div>
    );
};


export default Mandate

