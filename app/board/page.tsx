'use client'

import React, { useEffect } from 'react';
import useEthers from '../hooks/useEthers';

const Board: React.FC = () => {
    const [contract, setContract] = React.useState<any>(null)
    const [boardList, setBoardList] = React.useState<any>([])


    useEffect(() => {
        document.title = 'Board';
        async function init() {
            console.log('init')
            const {contract} = await useEthers()
            setContract(contract)
            getBoarList()
        }
        init()
    }, [])

    async function getBoarList() {
        const boardList = await contract?.getBoardInfo()
        console.log(boardList, 'boardList')
        setBoardList(boardList)
    }

    const vote = async (id: number) => {
        const tx = await contract?.vote(id)
        await tx.wait()
        getBoarList()
    }


  return (
    <div>
        <h1>Board</h1>
        <div>
            {boardList?.map((board: any) => {
                return (
                    <div key={board.id}>
                        <div>{board.id}</div>
                        <div>{board.title}</div>
                        <div>{board.content}</div>
                        <div>{board.voteCount}</div>
                        <button onClick={() => vote(board.id)}>vote</button>
                    </div>
                )
            })}
        </div>
    </div>
  );
};

export default Board;
