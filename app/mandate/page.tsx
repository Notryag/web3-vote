'use client'
import { Button, Input, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import useEthers from '../hooks/useEthers';

const Mandate: React.FC = () => {
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');

    const {contract, account} =  useEthers()
    const toast = useToast()

    async function getHost() {
        const host = await contract?.host()
        setInput1(host)
    }

    const handleMandate = async () => { 
        if(!input2) {
            toast({
                title: '请输入投票人地址',
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
            return
        }
        if(!contract) {
            return
        }
        const mandateArress = input2.split('\n')
        const tx = await contract?.mandate(mandateArress)
        await tx?.wait()
        console.log('mandate success')
    }

    useEffect(() => {
        getHost()
    }, [contract, account])


    const handleInputChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput2(e.target.value);
    }

    return (
        <div>
            <h1>Mandate Page</h1>
            <div>
                主持人
                <Input type="text" disabled defaultValue={input1} readOnly/>
            </div>
            <div>
                投票人地址
                <Input type="text" value={input2} onChange={handleInputChange2} />
            </div>
            <div>
                <Button onClick={handleMandate}>分发投票权</Button>
            </div>
        </div>
    );
};


export default Mandate

