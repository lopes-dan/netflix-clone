import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../../../context/movieContext";
import classes from "./Search.module.scss";
import TitleWrapper from "../../Carousel/TitleWrapper";

interface Result {
  id: string;
  title: any
}

interface Title {
  id: string;
  name: string;
  country: string[];
  genre: string[];
  language: string;
  video: string;
  overview: string;
  poster: string;
}


const SearchResultsPage = (title: any) => {

  const [titles, setTitles] = useState<Title[]>([]);
  const queryParams = new URLSearchParams(window.location.search);
  let key = queryParams.get("q");

  useEffect(() => {
    const fetchData = async () => {
      const urlShows = new URL('https://6367f480d1d09a8fa61e322a.mockapi.io/content/shows');
      const urlMovies = new URL('https://6367f480d1d09a8fa61e322a.mockapi.io/content/movies');
      urlShows.searchParams.append('name', key || "");
      urlMovies.searchParams.append('name', key || "");

      const requestShows = fetch(urlShows, {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      });

      const requestMovies = fetch(urlMovies, {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      });

      try {
        const [resShows, resMovies] = await Promise.all([requestShows, requestMovies]);

        if (resShows.ok && resMovies.ok) {
          const shows = await resShows.json();
          const movies = await resMovies.json();

          const combined = [...shows, ...movies];

          const uniqueMap: Record<string, boolean> = {};


          const uniqueTitles = combined.filter((title) => {
            if (uniqueMap[title.id]) {
              return false;
            } else {
              uniqueMap[title.id] = true;
              return true;
            }
          });

          setTitles(uniqueTitles);
        } else {
          // handle error
        }
      } catch (error) {
        // handle error
      }
    }

    fetchData();

  }, [key]);




  useEffect(() => {

    console.log(key)
  }, [key]);

  return (
    <div className={classes["searchResults"]}>
      <div className={classes["results"]}>

        {titles.map((title: any): any => (
          <div className={classes["result"]} key={title.id}>
            <TitleWrapper title={{ poster: title.poster, video: title.video, overview: title.overview }} />
          </div>
        ))}
      </div>
    </div>
  );
};


export default SearchResultsPage
