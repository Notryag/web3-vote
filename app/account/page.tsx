'use client'
import { Button, FormControl, FormLabel, Input, Stack, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import useEthers from "../hooks/useEthers"
import useInput from "../hooks/useInput"

function Account() {
  const [voter, setVoter] = useState<any>({
    amount: null,
    isVoted: false,
    delegator: '',
    targetId: null
  })
  const [dalegatorAddress, setDalegatorAddress] = useState('')

  const { contract, account } =  useEthers()

  const toast = useToast()

  useEffect(() => {
    getVoter()
  }, [contract, account])



  function getVoter() {
    if (!contract || !account) return
    contract.voters(account).then((res: any) => {
      setVoter(res)
    })
  }

  const handleDalegate = async () => {
    if(!dalegatorAddress) {
      toast({
        title: "请输入受托人地址",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
      return
    }
    if (!contract || !account) return
    const tx = await contract.dalegate(voter.targetId)
    await tx.wait()
    toast({
      title: "委托成功",
      status: "success",
      duration: 9000,
      isClosable: true,
    })
  }


  return (
    <div>
      <FormControl>

        <FormLabel>当前账户</FormLabel>
        <Input defaultValue={account?.address} readOnly placeholder="当前账户" />
        <FormLabel>账户票数</FormLabel>
        <Input defaultValue={String(voter.amount)} readOnly placeholder="账户票数" />
        <FormLabel>是否已投票</FormLabel>
        <Input defaultValue={voter.isVoted} readOnly placeholder="是否已投票" />
        <FormLabel>委托账户</FormLabel>
        <Input defaultValue={voter.delegator} readOnly  placeholder="First name" />
        <FormLabel>受托人地址</FormLabel>
        <Input value={dalegatorAddress} onChange={(e) => setDalegatorAddress(e.target.value)} placeholder="受托人地址" />
        <div>
          <Button onClick={handleDalegate}>委托他人投票</Button>
        </div>
      </FormControl>
    </div>
  )

}

export default Account