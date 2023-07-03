import { useState, useEffect, useContext, useRef } from "react";
import useFetch from "../../useFetch";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { MovieContext } from "../../../context/movieContext";
import { animated, useTransition } from "react-spring";
import { ImCross } from "react-icons/im";
import useOutsideSearch from "./useOutsideSearch";
import classes from "./Search.module.scss"
import SearchIcon from './SearchIcon';

interface SearchBarTypes {
  isWide: boolean;
  alterIsWide: (isWide: boolean) => void;
  className: string;
}

//https://api.themoviedb.org/3/tv/popular?api_key=61f6df5ed9d51d8fbe5ad9c6d5acc000&language=en-US&page=1
//URL for tv shows

const SearchBar: React.FC<SearchBarTypes> = ({ isWide, alterIsWide }) => {

  const [search, setSearch] = useState<string>("");
  const { setTitle } = useContext(MovieContext);

  let navigate: NavigateFunction;
  navigate = useNavigate();

  const wrapperRef = useRef<HTMLInputElement>(null);
  useOutsideSearch(wrapperRef, isWide, search, alterIsWide);
  const location = useLocation();

  const transition = useTransition(isWide, {
    from: { width: 100, right: 123, height: 32, overflow: 'hidden' },
    enter: { x: 30, width: 262, right: 123, opacity: 1, delay: 0 },
    leave: { width: 0 },
    config: { duration: 200 },
  });

  const queryParams = new URLSearchParams(location.search);

  let key: string | null;

  key = queryParams.get("q");

  const goTo = (where: string) => {
    navigate(where);
  };

  const [data] = useFetch(
  `https://api.themoviedb.org/3/search/movie?api_key=61f6df5ed9d51d8fbe5ad9c6d5acc000&query=${search}`, search
  );

  const [searched] = useFetch(
   `https://api.themoviedb.org/3/search/movie?api_key=61f6df5ed9d51d8fbe5ad9c6d5acc000&query=${key}`, search
    
  );

  const getSearch = (e: any) => {
    setSearch(e.target.value.toString())
  }

  useEffect(() => {

    const id = setTimeout(() => {
      setTitle(data);
      if (search) {
        goTo(`/search?q=${search}`);
      }

      else {
        if (key) {
          setTitle(searched);
        } else {
          goTo("/");

          alterIsWide(false)
          setSearch('')
        }
      }
    }, 200);
    return () => {
      clearTimeout(id);
    };
  }, [data, key]);


  useEffect(() => {
    if (location.pathname === "/movies") {
      setSearch('');

      alterIsWide(false)
    }

    if (!location.pathname.includes('search')) {
      setSearch('')

      alterIsWide(false)
    }

  }, [location]);

  const turnOff = () => {
    setSearch('')

    alterIsWide(false)
    goTo("/");
  }
  useEffect(() => {

    if (search.length === 0) {

      alterIsWide(false)

      if (key) {
        if (key.length === 1) {
          goTo('/')
        }
      }

    }

  }, [search, location.search])
  return (
    <>
      {transition((style, item) => {
        return item ? (
          <>
            <animated.div

              className={`${classes["container-input"]} box`}
              style={style}>
              <div data-testid="search-input" className={classes["container-search"]}>

                <button data-testid="search-back" className={`${classes["search-icon"]} ${classes["search-tab"]} `}
                  aria-label="Szukaj"
                  data-uia="search-box-launcher">
                  <SearchIcon width={12} />
                </button>

                <input type="text"
                  className={classes["search-input"]}
                  ref={wrapperRef}
                  id="search-input"
                  value={search}
                  onChange={getSearch}
                  placeholder={isWide ? "Search titles" : ''} />

              </div>
              {isWide && search.length > 0 && <ImCross onClick={turnOff} className={classes["delete"]} />}

            </animated.div>
          </>
        ) : (
          ""
        );
      })}
    </>
  );
};

export default SearchBar;

/*import { useState, useEffect, useContext, useRef } from "react";
import useFetch from "../../useFetch";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { MovieContext } from "../../../context/movieContext";
import { animated, useTransition } from "react-spring";
import { ImCross } from "react-icons/im";
import useOutsideSearch from "./useOutsideSearch";
import classes from "./Search.module.scss"
import SearchIcon from './SearchIcon';

interface SearchBarTypes {
  isWide: boolean;
  alterIsWide: (isWide: boolean) => void;
  className: string;
}

//https://api.themoviedb.org/3/tv/popular?api_key=61f6df5ed9d51d8fbe5ad9c6d5acc000&language=en-US&page=1
//URL for tv shows

const SearchBar: React.FC<SearchBarTypes> = ({ isWide, alterIsWide }) => {

  const [search, setSearch] = useState<string>("");
  const { setTitle } = useContext(MovieContext);
  // const [titles, setTitles] = useState(null);

  let navigate: NavigateFunction;
  navigate = useNavigate();

  const wrapperRef = useRef<HTMLInputElement>(null);
  useOutsideSearch(wrapperRef, isWide, search, alterIsWide);
  const location = useLocation();

  const transition = useTransition(isWide, {
    from: { width: 100, right: 123, height: 32, overflow: 'hidden' },
    enter: { x: 30, width: 262, right: 123, opacity: 1, delay: 0 },
    leave: { width: 0 },
    config: { duration: 200 },
  });

  const queryParams = new URLSearchParams(location.search);

  let key: string | null;

  key = queryParams.get("q");

  const goTo = (where: string) => {
    navigate(where);
  };

  const [data, loading, error] = useFetch(
    `https://6367f480d1d09a8fa61e322a.mockapi.io/content/movies?search=${search}`
  );


  const url = new URL('https://6367f480d1d09a8fa61e322a.mockapi.io/content/shows');
  url.searchParams.append('name', 'Vikings');



  useEffect(() => {
    const fetchData = async () => {
      const url = new URL('https://6367f480d1d09a8fa61e322a.mockapi.io/content/shows');
      url.searchParams.append('name', search);

      try {
        const res = await fetch(url, {
          method: 'GET',
          headers: { 'content-type': 'application/json' },
        });

        if (res.ok) {
          const shows = await res.json();
          console.log(shows); // log the response here
          // mockapi returns only the show with name as per search input
          setTitle(shows);
        } else {
          // handle error
        }
      } catch (error) {
        // handle error
      }
    }

    fetchData();
  }, [search]);



  useEffect(() => {

    const id = setTimeout(() => {
      setTitle(data);
      if (search) {
        goTo(`/search?q=${search}`);
      }
      else {
        if (key) {
          setTitle(search);
        } else {
          goTo("/");

          alterIsWide(false)
          setSearch('')
        }
      }
    }, 200);
    return () => {
      clearTimeout(id);
    };

    console.log(data)
  }, [data, key]);


  useEffect(() => {
    if (location.pathname === "/movies") {
      setSearch('');

      alterIsWide(false)
    }

    if (!location.pathname.includes('search')) {
      setSearch('')

      alterIsWide(false)
    }

  }, [location]);


  const turnOff = () => {
    setSearch('')

    alterIsWide(false)
    goTo("/");
  }

  const getSearch = (e: any) => {
    setSearch(e.target.value.toString())
    console.log(e.target.value)
  }


  useEffect(() => {

    if (search.length === 0) {

      alterIsWide(false)

      if (key) {
        if (key.length === 1) {
          goTo('/')
        }
      }

    }

  }, [search, location.search])
  return (
    <>
      {transition((style, item) => {
        return item ? (
          <>
            <animated.div

              className={`${classes["container-input"]} box`}
              style={style}>
              <div data-testid="search-input" className={classes["container-search"]}>

                <button data-testid="search-back" className={`${classes["search-icon"]} ${classes["search-tab"]} `}
                  aria-label="Szukaj"
                  data-uia="search-box-launcher">
                  <SearchIcon width={12} />
                </button>

                <input type="text"
                  className={classes["search-input"]}
                  ref={wrapperRef}
                  id="search-input"
                  value={search}
                  onChange={getSearch}
                  placeholder={isWide ? "Search titles" : ''} />

              </div>
              {isWide && search.length > 0 && <ImCross onClick={turnOff} className={classes["delete"]} />}

            </animated.div>
          </>
        ) : (
          ""
        );
      })}
    </>
  );
};

export default SearchBar;*/