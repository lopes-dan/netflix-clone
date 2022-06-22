import classes from "./Carousel.module.css";
import useFetch from "../useFetch";
//https://api.themoviedb.org/3/search/movie?api_key=61f6df5ed9d51d8fbe5ad9c6d5acc000&query=easy+rider
import { useState, useRef } from 'react';

interface Props {
  genre: String;
  title: string;
  isSearchOn: boolean;
  className: string;
  results?: any
}
const CarouselItem: React.FC<Props> = ({ genre, title, isSearchOn, results }) => {
 let [data] = useFetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=61f6df5ed9d51d8fbe5ad9c6d5acc000&with_genres=${genre}`
  );
  const [IsPosterBig, setIsPosterBig] = useState<boolean>(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState<number>(0)


  const covers = (movie: { poster_path: string }) => {

    return (
      <div key={movie.poster_path} className={classes["grid-item"]}>
        <img
          className={classes['poster']}
          onMouseOver={() => setIsPosterBig(true)}
          onMouseLeave={() => setIsPosterBig(false)}
          alt="poster"
          src={`https://image.tmdb.org/t/p/w154/${movie.poster_path}`}
        />
      </div>)
  }

  const scrollRight = () => {

    const scrollX = scrollRef.current
    if (scrollX) {
      scrollX.scrollLeft += 1500;
      console.log(scrollX.scrollWidth)
      setScrollPosition(scrollX.scrollWidth)
    }

  }


  const scrollLeft = () => {
    const scrollX = scrollRef.current

    if (scrollX) {
      scrollX.scrollLeft -= 1500;
    }

  }


  return (
    <>
      <h2
        style={{
          position: "relative",
          left: "4vw",
          marginTop: 23,
          marginBottom: 23
        }}
      >
        {" "}
        {title}{" "}
      </h2>

      <div
        ref={scrollRef}
        className={`${classes["latest"]} ${isSearchOn ? classes["wrap-results"] : " "
          }`}
      >

        <span onClick={scrollLeft} className={`${classes["arrow-wrapper"]} ${classes["arrow-left"]}`}> {'<'} </span>

        {results
          ? results.map((movie: any) => (
            covers(movie)
          ))
          : data &&


          data.map((movie: any) => (

            covers(movie)
          ))}


        <div onClick={scrollRight} className={`${classes["arrow-wrapper"]} ${classes["arrow-right"]}`}>
          <span className={classes['arrow-icon-right']}> {'>'} </span>
        </div>


      </div>
    </>
  );
};

export default CarouselItem;