export const getCountryApiCall = async (name: string) => {
  const response = await fetch(
    `https://restcountries.eu/rest/v2/name/${name}?fullText=true`
  );
  return (await response.json())[0] ?? null;
};
