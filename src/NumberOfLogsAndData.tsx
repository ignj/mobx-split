import { observer } from "mobx-react-lite";
import React, { useContext, useRef } from "react";
import { LogsStoreContext } from "./store/logsStore/LogsStore";

const NumberOfLogsAndData = () => {
  const { numberOfLogs, logData } = useContext(LogsStoreContext);
  const logsAndDatarenders = useRef(0);

  return (
    <div data-testid="container-number-of-logs-and-data">
      <h1>NumberOfLogs and LogData component</h1>

      <div data-testid="number-of-logs">NumberOfLogs: {numberOfLogs}</div>
      <div data-testid="log-data">logData: {logData}</div>
      <div data-testid="number-of-renders">
        NumberOfLogs renders: {logsAndDatarenders.current++}
      </div>
    </div>
  );
};

export default observer(NumberOfLogsAndData);
