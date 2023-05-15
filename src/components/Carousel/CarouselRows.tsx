import { useEffect, useState } from 'react';
import CarouselRow from './CarouselRow';

interface Props {
    products: [],
    id: undefined | string
}

const TITLE_URL = 'https://6367f480d1d09a8fa61e322a.mockapi.io/content/';

const CarouselRows: React.FC<Props> = ({ id }) => {
    const [trendingTitles, setTrendingTitle] = useState<[] | null>(null);
    const [comedyTitles, setComedyTitle] = useState<[] | null>(null);
    const [dramaTitles, setDramaTitle] = useState<[] | null>(null);

    useEffect(() => {
        async function getTitles(id: string | undefined, genre: string) {
            const titleData = await fetch(TITLE_URL + `${id}?search=${genre}`);
            const titles = await titleData.json();

            switch (genre) {
                case "Trending":
                    setTrendingTitle(titles)
                    break;
                case "Comedy":
                    setComedyTitle(titles)
                    break;
                case "Drama":
                    setDramaTitle(titles)
                    break;
            }
        }
        getTitles(id, "Trending");
        getTitles(id, "Comedy");
        getTitles(id, "Drama");
    }, [])

    return (
        <div style={{marginTop:"-32px", position:"relative", zIndex: 0}}>
            <CarouselRow titles={trendingTitles} category={"Trending"} />
            <CarouselRow titles={comedyTitles} category={"Comedy"} />
            <CarouselRow titles={dramaTitles} category={"Drama"} />
        </div>

    )
}


export default CarouselRows;