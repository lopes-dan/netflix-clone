import classes from "./Carousel.module.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CarouselRows from './CarouselRows';
import { Title } from "./../../Types/types";



const Carousel = () => {
  const { id = "" } = useParams(); // provide a default value
  const [titles, setTitles] = useState<Title[] | null>(null);

  useEffect(() => {
    const abortCont = new AbortController();

    async function getTitles(endpoint: string) {
      const response = await fetch(`https://6367f480d1d09a8fa61e322a.mockapi.io/content/${endpoint}`, {
        signal: abortCont.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    }

    async function fetchAll() {
      const [shows, movies] = await Promise.all([getTitles('shows'), getTitles('movies')]);
     
      let merged = [];
      for (let i = 0; i < 18; i++) {
        if (shows[i]) {
          merged.push(shows[i]);
        }
        if (movies[i]) {
          merged.push(movies[i]);
        }
      }

      setTitles(merged)
    }


    if (id === "shows") {
      getTitles('shows').then(setTitles);
    } else if (id === "movies") {
      getTitles('movies').then(setTitles);
    } else {
      fetchAll();
    }

    return () => {
      abortCont.abort();
      setTitles(null);
    }
  }, [id]);
  return (

    <div style={{ background: '#141414' }} data-testid="carousel">
      <div className={classes["wrapper"]}></div>
      <div className={titles ? "noMargin" : "marginOn"}></div>
      <div style={{ boxShadow: "0px -55px 44px #141414" }}>
        {titles && <CarouselRows id={id} titles={titles} />}
      </div>
    </div>
  );
};



export default Carousel;