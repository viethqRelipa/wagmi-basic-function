import React from "react";
import { Tabs } from 'antd'

import UseBalance from "./UseBalance";
import UseBlockNumber from "./UseBlockNumber";

const Hooks = () => {
  return (
    <div>
      <Tabs>
        <Tabs.TabPane tab="Use Balance" key="1">
          <UseBalance />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Use Block Number" key="2">
          <UseBlockNumber />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Hooks;
