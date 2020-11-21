import React, { useContext } from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { RootStoreContext } from "../store/RootStore";

test("log counter increments by 1", () => {
  const { result: context } = renderHook(() => useContext(RootStoreContext));
  expect(context.current.logsStore.numberOfLogs).toBe(0);

  context.current.logsStore.incrementNumberOfLogs();
  expect(context.current.logsStore.numberOfLogs).toBe(1);
  
  context.current.logsStore.incrementNumberOfLogs();
  expect(context.current.logsStore.numberOfLogs).toBe(2);
});

test("log data gets updated", async () => {
  const { result: context } = renderHook(() => useContext(RootStoreContext));
  const initialLogData = context.current.logsStore.logData;
  expect(initialLogData).toBe("");

  context.current.logsStore.updateLogData();
  const firstDataUpdate = context.current.logsStore.logData;
  expect(firstDataUpdate).not.toEqual(initialLogData);

  await new Promise((r) => setTimeout(r, 1000));

  context.current.logsStore.updateLogData();
  const secondDataUpdate = context.current.logsStore.logData;
  expect(secondDataUpdate).not.toEqual(firstDataUpdate);
});