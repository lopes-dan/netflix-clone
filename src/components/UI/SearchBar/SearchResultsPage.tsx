import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../../../context/movieContext";
import classes from "./Search.module.scss";
import TitleWrapper from "../../Carousel/TitleWrapper";

interface Result {
  id: string;
  title: any
}

const SearchResultsPage = (title: any) => {

  const [titles, setTitles] = useState([]);
  const queryParams = new URLSearchParams(window.location.search);
  let key = queryParams.get("q");


  useEffect(() => {
    const fetchData = async () => {
      const url = new URL('https://6367f480d1d09a8fa61e322a.mockapi.io/content/shows');
      url.searchParams.append('name', key || "");

      try {
        const res = await fetch(url, {
          method: 'GET',
          headers: { 'content-type': 'application/json' },
        });

        if (res.ok) {
          const shows = await res.json();
          console.log(shows); // log the response here
          // mockapi returns only the show with name as per search input
          setTitles(shows);
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
