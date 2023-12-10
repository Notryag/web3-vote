'use client'
import { Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import useEthers from "../hooks/useEthers"

function Account() {
  const [voter, setVoter] = useState<any>({
    amount: null,
    isVoted: false,
    delegator: null,
    targetId: null
  })
  const [contract, setContract] = useState<any>(null)
  const [account, setAccount] = useState<any>(null)
  const [dalegatorAddress, setDalegatorAddress] = useState<any>(null)
  useEffect(() => {
    async function init() {
      const {contract, account} = await useEthers()
      setContract(contract)
      setAccount(account)
    }
    init()
  }, [])

  function getVoter() {
    contract.getVoter(account).then((res: any) => {
      setVoter(res)
    })

  }

  const handleDalegate = async () => {
    const tx = await contract.delegate(voter.targetId)
    await tx.wait()
    console.log('delegate success');
    
  }


  return (
    <div>
      <FormControl>
        
        <FormLabel>当前账户</FormLabel>
        <Input placeholder="First name" />
        <FormLabel>账户票数</FormLabel>
        <Input placeholder="First name" />
        <FormLabel>是否已投票</FormLabel>
        <Input placeholder="First name" />
        <FormLabel>委托账户</FormLabel>
        <Input value={voter.delegate} onChange={e => setVoter(voter => ({...voter, delegate: e.target.value}))} placeholder="First name" />
        <FormLabel>受托人地址</FormLabel>
        <Input value={dalegatorAddress} onChange={e => setDalegatorAddress(e.target.value)} placeholder="First name" />
        <div>
          <Button onClick={handleDalegate}>委托他人投票</Button>
        </div>
      </FormControl>
    </div>
  )

}

export default Account