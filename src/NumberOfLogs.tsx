import { observer } from "mobx-react-lite";
import React, { useContext, useRef } from "react";
import { LogsStoreContext } from "./store/logsStore/LogsStore";

const NumberOfLogs = () => {
  const { numberOfLogs } = useContext(LogsStoreContext);
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
