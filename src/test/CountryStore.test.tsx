import "@testing-library/jest-dom";
import { renderHook } from "@testing-library/react-hooks";
import { useContext } from "react";
import { RootStoreContext } from "../store/RootStore";
import * as getCountryApiModule from "../store/countryStore/api/getCountryApiCall";

const europeanCountryMock = '{"name": "Belarus","region": "Europe"}';
const nonEuropeanCountryMock = '{"name": "Argentina","region": "Americas"}';

test("when no country data is loaded, computed isCountryLoaded returns false", async () => {
  const { result: context } = renderHook(() => useContext(RootStoreContext));

  expect(context.current.countryStore.countryData).toBe(null);
  expect(context.current.countryStore.isCountryLoaded()).toBe(false);
});

test("getCountryData updates countryData", async () => {
  const { result: context } = renderHook(() => useContext(RootStoreContext));
  const spy = jest.spyOn(getCountryApiModule, "getCountryApiCall");
  spy.mockImplementation(() =>
    Promise.resolve(JSON.parse(europeanCountryMock))
  );

  expect(context.current.countryStore.countryData).toBe(null);

  await context.current.countryStore.getCountryData("randomstring");

  expect(context.current.countryStore.countryData).not.toBe(null);
});

test("countryData updates triggers computed isCountryLoaded", async () => {
  const { result: context } = renderHook(() => useContext(RootStoreContext));
  const spy = jest.spyOn(getCountryApiModule, "getCountryApiCall");
  spy.mockImplementation(() =>
    Promise.resolve(JSON.parse(europeanCountryMock))
  );

  await context.current.countryStore.getCountryData("randomstring");

  expect(context.current.countryStore.isCountryLoaded()).toBe(true);
});

test("countryData updates triggers computed isEuropeanCountry, which is true for belarus", async () => {
  const { result: context } = renderHook(() => useContext(RootStoreContext));
  const spy = jest.spyOn(getCountryApiModule, "getCountryApiCall");
  spy.mockImplementation(() =>
    Promise.resolve(JSON.parse(europeanCountryMock))
  );

  await context.current.countryStore.getCountryData("randomstring");

  expect(context.current.countryStore.isEuropeanCountry()).toBe(true);
});

test("countryData updates triggers computed isEuropeanCountry, which is false for argentina", async () => {
  const { result: context } = renderHook(() => useContext(RootStoreContext));
  const spy = jest.spyOn(getCountryApiModule, "getCountryApiCall");
  spy.mockImplementation(() =>
    Promise.resolve(JSON.parse(nonEuropeanCountryMock))
  );

  await context.current.countryStore.getCountryData("randomstring");

  expect(context.current.countryStore.isEuropeanCountry()).toBe(false);
});
