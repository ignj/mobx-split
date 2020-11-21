import { render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import React, { useContext } from "react";
import NumberOfLogs from "../NumberOfLogs";
import { RootStoreContext } from "../store/RootStore";

test("number of logs is rendered", () => {
  const { result: context } = renderHook(() => useContext(RootStoreContext));
  render(<NumberOfLogs />);

  const counter = screen.getByTestId("number-of-logs");
  expect(counter.textContent).toContain("0");

  context.current.logsStore.incrementNumberOfLogs();
  expect(counter.textContent).toContain("1");
});
