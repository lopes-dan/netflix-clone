import classes from "./Carousel.module.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CarouselRows from './CarouselRows';

const Carousel = () => {

  const { id } = useParams();
  const [products, setProducts] = useState<[] | null>(null);

  useEffect(() => {
    const abortCont = new AbortController();
    async function getProducts(endpoint: string) {
      const newProductsFetch = await fetch(`https://6367f480d1d09a8fa61e322a.mockapi.io/content/${endpoint}`, {

        signal: abortCont.signal
      });
      const newProducts = await newProductsFetch.json();
      setProducts(newProducts);
    }

    if (id === "shows") {
      getProducts('shows');
    }
    if (id === "movies") {
      getProducts('movies');
    }

    return () => {
      abortCont.abort();
      setProducts(null)
    }

  }, [id])

  return (
    <div style={{ background: '#141414' }} data-testid="carousel">
      <div className={classes["wrapper"]}></div>
      <div className={products ? "noMargin" : "marginOn"}></div>
      <div style={{boxShadow: "0px -55px 44px #141414"}}>
        {products && <CarouselRows id={id} products={products} />}
      </div>
    </div>
  );
};

export default Carousel;