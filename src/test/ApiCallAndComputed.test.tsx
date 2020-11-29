import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { renderHook, HookResult } from "@testing-library/react-hooks";
import { runInAction } from "mobx";
import React from "react";
import { useContext } from "react";
import ApiCallAndComputed from "../ApiCallAndComputed";
import { getRenewedRootStore, RootStore } from "../store/RootStore";
import * as getCountryApiModule from "../store/countryStore/api/getCountryApiCall";
import * as getCountryDataModule from "../store/countryStore/actions/getCountryDataAction";
import { CountryStore } from "../store/countryStore/CountryStore";

const europeanCountryMock = '{"name": "Belarus","region": "Europe"}';
const nonEuropeanCountryMock = '{"name": "Argentina","region": "Americas"}';

let context: HookResult<RootStore> | null = null;

beforeEach(() => {
  const { result } = renderHook(() => useContext(getRenewedRootStore()));
  context = result;
});

test("no country label is shown when no data is loaded", () => {
  render(<ApiCallAndComputed />);

  const countryDataLabel = screen.getByTestId("country-data");
  expect(countryDataLabel.textContent).toContain("No country data");
});

test("non european country is loaded", async () => {
  render(<ApiCallAndComputed />);

  runInAction(
    () =>
      (context!.current.countryStore.countryData = JSON.parse(
        nonEuropeanCountryMock
      ))
  );

  const countryDataLabel = screen.getByTestId("country-data");
  expect(countryDataLabel.textContent).toContain("There is some country data");

  const europeanLabel = screen.getByTestId("european-label");
  expect(europeanLabel.textContent).toContain("Bad luck");
});

test("european country is loaded", () => {
  render(<ApiCallAndComputed />);

  runInAction(
    () =>
      (context!.current.countryStore.countryData = JSON.parse(
        europeanCountryMock
      ))
  );

  const countryDataLabel = screen.getByTestId("country-data");
  expect(countryDataLabel.textContent).toContain("There is some country data");

  const europeanLabel = screen.getByTestId("european-label");
  expect(europeanLabel.textContent).toContain("Yes it is");
});

test("click search triggers api call", async () => {
  render(<ApiCallAndComputed />);
  const getCountryDataSpy = jest.spyOn(
    getCountryDataModule,
    "getCountryDataAction"
  );
  getCountryDataSpy.mockImplementation(
    (parentStore: CountryStore, name: string) => Promise.resolve()
  );

  const countryInput = screen.getByTestId("country-input");
  fireEvent.change(countryInput, { target: { value: "someValue" } });

  const searchButton = screen.getByTestId("search-country-button");
  fireEvent.click(searchButton);

  await waitFor(() => expect(getCountryDataSpy).toHaveBeenCalledTimes(1));
});

test("click search updates countryData", async () => {
  const getCountryApiModuleSpy = jest.spyOn(
    getCountryApiModule,
    "getCountryApiCall"
  );
  getCountryApiModuleSpy.mockImplementation((name: string) =>
    Promise.resolve(JSON.parse(europeanCountryMock))
  );

  render(<ApiCallAndComputed />);

  let countryDataLabel = screen.getByTestId("country-data");
  expect(countryDataLabel.textContent).toContain("No country data");

  let countryInput = screen.getByTestId("country-input");
  fireEvent.change(countryInput, { target: { value: "randomstring" } });

  const searchButton = screen.getByTestId("search-country-button");
  fireEvent.click(searchButton);

  await waitFor(() => expect(getCountryApiModuleSpy).toHaveBeenCalledTimes(1));

  countryInput = screen.getByTestId("country-data");
  expect(countryInput.textContent).toContain("There is some country data");

  const europeanLabel = screen.getByTestId("european-label");
  expect(europeanLabel.textContent).toContain("Yes it is");
});
