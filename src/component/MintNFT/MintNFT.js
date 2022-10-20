import React from 'react';
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';

export function MinNFT() {
  const { config, error: prepareError, isError: isPrepareError } = usePrepareContractWrite({
    address: '0x95903BE0DF352cf5CB97c646B89E231099632990',
    abi: [
      {
        name: 'mint',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [],
        outputs: [],
      },
    ],
    functionName: 'mint',
  })

  const { data, write, error, isError } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.has
  })
  return (
    <div>
      <button disabled={!write || isLoading} onClick={() => write?.()}>
        {isLoading ? 'Minting...' : 'Mint'}
      </button>
      {isSuccess && (
        <div>
          Successfully minted your NFT!
          <div>
            <a href={`http://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}

      {(isPrepareError || isError) && (
        <div>Error: {(prepareError || error)?.message}</div>
      )}
    </div>
  )
}