import React from 'react';
import { useBlockNumber } from 'wagmi';
import { Spin } from 'antd';

const UseBlockNumber = () => {
  const { data, isError, isLoading } = useBlockNumber();
  return (
    <div>
      {isLoading ? <Spin /> : <div>Block Number: {data}</div>}
    </div>
  )
}

export default UseBlockNumber;