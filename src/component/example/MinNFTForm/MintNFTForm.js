import React from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useDebounce } from "use-debounce";
export function MintNFTForm() {
  const [tokenId, setTokenId] = React.useState("");
  const [debounceTokenId] = useDebounce(tokenId, 500);
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: "0xbE01F13f55dFC9cDAe7475FEa3198de7B1499EEB",
    abi: [
      {
        name: "mint",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [{ internalType: "uint32", name: "tokenId", type: "uint32" }],
        outputs: [],
      },
    ],
    functionName: "mint",
    args: [parseInt(debounceTokenId)],
    enabled: Boolean(debounceTokenId),
  });

  const { data, write, error, isError } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        write?.();
      }}
    >
      <label for="tokenId">Token id</label>
      <input
        id="tokenId"
        placeholder="420"
        onChange={(e) => setTokenId(e.target.value)}
        value={tokenId}
      />
      <button disabled={!write || isLoading}>
        {isLoading ? "Minting.." : "Mint"}
      </button>
      {isSuccess && (
        <div>
          Successfully minted your NFT
          <div>
            <a hef={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
       {(isPrepareError || isError) && (
        <div>Error: {(prepareError || error)?.message}</div>
      )}
    </form>
  );
}
