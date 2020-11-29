import { useContext } from "react";
import { HookResult, renderHook } from "@testing-library/react-hooks";
import { getRenewedRootStore, RootStore } from "../store/RootStore";

let context: HookResult<RootStore> | null = null;

beforeEach(() => {
  const { result } = renderHook(() => useContext(getRenewedRootStore()));
  context = result;
});

test("log counter increments by 1", () => {
  expect(context!.current.logsStore.numberOfLogs).toBe(0);

  context!.current.logsStore.incrementNumberOfLogs();
  expect(context!.current.logsStore.numberOfLogs).toBe(1);

  context!.current.logsStore.incrementNumberOfLogs();
  expect(context!.current.logsStore.numberOfLogs).toBe(2);
});

test("log data gets updated", async () => {
  const initialLogData = context!.current.logsStore.logData;
  expect(initialLogData).toBe("");

  context!.current.logsStore.updateLogData();
  const firstDataUpdate = context!.current.logsStore.logData;
  expect(firstDataUpdate).not.toEqual(initialLogData);

  await new Promise((r) => setTimeout(r, 1000));

  context!.current.logsStore.updateLogData();
  const secondDataUpdate = context!.current.logsStore.logData;
  expect(secondDataUpdate).not.toEqual(firstDataUpdate);
});
