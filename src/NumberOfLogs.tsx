import { observer } from "mobx-react-lite";
import React, { useContext, useRef } from "react";
import { RootStoreContext } from "./store/RootStore";

const NumberOfLogs = () => {
  const rootStore = useContext(RootStoreContext);
  const { numberOfLogs } = rootStore.logsStore;
  const logsRenders = useRef(0);

  return (
    <div data-testid="container-number-of-logs">
      <h1>NumberOfLogs component</h1>

      <div data-testid="number-of-logs">NumberOfLogs: {numberOfLogs}</div>
      <div data-testid="number-of-renders">
        NumberOfLogs renders: {logsRenders.current++}
      </div>
    </div>
  );
};

export default observer(NumberOfLogs);
