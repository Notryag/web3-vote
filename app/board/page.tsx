'use client'
import { Button,useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import useEthers from "../hooks/useEthers"

type Board = {
    name: string
    totalAmount: BigInt
}

function Board() {


    const [boardList, setBoardList] = useState<Board[]>([])
    const { contract, account } = useEthers()

    const toast = useToast()


    useEffect(() => {
        if (!contract || !account) return

        getBoardList()
    }, [contract, account])

    const getBoardList = async () => {
        const tx = await contract?.getBoardInfo()
        setBoardList(tx)
    }

    async function handleVote(targetId: number) {
        if (!contract || !account) return
        try {

            const tx = await contract.vote(targetId)
            tx.wait()
            getBoardList()
            console.log(tx)
        } catch (error) {
            console.log(error.reason)
            toast({
                title: "Error",
                description: error.reason,
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }
    }


    return (
        <div>
            <h1>Board</h1>
            <div>
                {boardList?.map((board: Board, index: number) => {
                    return (
                        <div className="m-2" key={board.name}>
                            <span className="mr-2">{board.name}</span>
                            <Button onClick={() => handleVote(index)}>{String(board.totalAmount)}</Button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Board
