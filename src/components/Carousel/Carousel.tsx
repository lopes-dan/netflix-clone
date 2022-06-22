import classes from "./Carousel.module.css";
import CarouselItem from "./CarouselItem";
import {  useContext } from "react";
import { MovieContext } from "../../context/movieContext"
//import { useLocation } from "react-router-dom";


const Carousel = () => {
  const { title: results } = useContext(MovieContext);
  //const location = useLocation();
  //const queryParams = new URLSearchParams(location.search);
  //const key = queryParams.get("q");
  let renderItem: any
  renderItem = "";

  if (results) {
    if (results.length > 0) {
      renderItem = (

        <CarouselItem
          title="Results"
          className={classes['index']}
          results={results}
          isSearchOn={true}
          genre="80"
        />
      );
    }
  } else {
    renderItem = (
      <div>
        <CarouselItem

          title="Trending Now"
          className={classes['index']}
          isSearchOn={false}
          genre="80"
        />
        <CarouselItem

          className={classes['index-two']}
          title="Horror"
          isSearchOn={false}
          genre="27"
        />
        <CarouselItem

          className={classes['index-two']}
          title="Fantasy"
          isSearchOn={false}
          genre="14"
        />
        <CarouselItem

          className={classes['index-two']}
          title="Adventure"
          isSearchOn={false}
          genre="12"
        />
      </div>
    );
  }

  return (
    <div style={{ background: '#141414' }} data-testid="carousel">
      <div className={classes["wrapper"]}></div>
      <div className={results ? "noMargin" : "marginOn"}></div>
      {renderItem}
    </div>
  );
};

export default Carousel;