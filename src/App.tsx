import React, { useContext } from "react";
import { LogsStore } from "./store/LogsStore";
import NumberOfLogs from "./NumberOfLogs";
import NumberOfLogsAndData from "./NumberOfLogsAndData";

const App = () => {
  const { incrementNumberOfLogs, updateLogData } = useContext(LogsStore);

  return (
    <>
      <button
        data-testid="increment-logs"
        onClick={() => incrementNumberOfLogs()}
      >
        Add new log
      </button>
      <button data-testid="update-logs" onClick={() => updateLogData()}>
        Update Log data
      </button>
      <NumberOfLogs />
      <NumberOfLogsAndData />
    </>
  );
};

export default App;
