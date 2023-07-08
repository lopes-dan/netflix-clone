import classes from "./Search.module.scss";
import SearchIcon from "./SearchIcon";
import SearchBar from "./SearchBar";

import { useState, useRef } from "react";


const SearchContainer = () => {
 const [isWide, setIsWide] = useState(false);
 // const [isWide, setIsWide] = useState(key && key.length > 0 ? true : false);

  const displaySearch = () => {
    setIsWide((prev) => !prev);
  };

  const searchRef = useRef<HTMLDivElement>(null);

  const alterIsWide = (inputValue: boolean) => {
    setIsWide(inputValue);
  };

  return (
    <div className={classes["search-container"]}>
      <SearchBar
        alterIsWide={alterIsWide}
        isWide={isWide}
        className={classes["search"]}
      />

      {isWide ? (
        " "
      ) : (
        <div
          data-testid="search-container"
          className={`box ${classes["search-container"]} `}
          ref={searchRef}
        >
          {" "}
          {!isWide && (
            <button
              data-testid="buttonIconRight"
              onClick={displaySearch}
              className={`${classes["search-icon"]} searchTab `}
              aria-label="Search"
              data-uia="search-box-launcher"
            >
              <SearchIcon width={24} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchContainer;
