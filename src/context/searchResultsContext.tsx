// SearchResultsContext.js
import { createContext } from "react";

export const SearchResultsContext = createContext({
  results: [],
  setResults: () => {}
});
