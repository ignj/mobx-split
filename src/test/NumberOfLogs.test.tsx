import { render, screen } from "@testing-library/react";
import { HookResult, renderHook } from "@testing-library/react-hooks";
import React, { useContext } from "react";
import NumberOfLogs from "../NumberOfLogs";
import { getRenewedRootStore, RootStore } from "../store/RootStore";

let context: HookResult<RootStore> | null = null;

beforeEach(() => {
  const { result } = renderHook(() => useContext(getRenewedRootStore()));
  context = result;
});

test("number of logs is rendered", () => {
  render(<NumberOfLogs />);

  const counter = screen.getByTestId("number-of-logs");
  expect(counter.textContent).toContain("0");

  context!.current.logsStore.incrementNumberOfLogs();
  expect(counter.textContent).toContain("1");
});
