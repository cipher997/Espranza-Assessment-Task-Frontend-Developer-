import { createContext, useState } from "react";

// 1️⃣ Create context
export const SearchContext = createContext();

// 2️⃣ Create provider
export function SearchProvider({ children }) {
  const [searchData, setSearchData] = useState(null);

  return (
    <SearchContext.Provider value={{ searchData, setSearchData }}>
      {children}
    </SearchContext.Provider>
  );
}
