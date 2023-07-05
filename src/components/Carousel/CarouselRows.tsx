import { useEffect, useState } from 'react';
import CarouselRow from './CarouselRow';

import { Title } from "./../../Types/types";

interface CarouselRowsProps {
    id: string;
    category?: string;  // make category optional
    titles: Title[] | null;
}

const TITLE_URL = 'https://6367f480d1d09a8fa61e322a.mockapi.io/content/';

const CarouselRows: React.FC<CarouselRowsProps> = ({ id, titles }) => {
    const [trendingTitles, setTrendingTitle] = useState<Title[]>([]);
    const [comedyTitles, setComedyTitle] = useState<Title[]>([]);
    const [dramaTitles, setDramaTitle] = useState<Title[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const genreStateMap = {
        "Trending": setTrendingTitle,
        "Comedy": setComedyTitle,
        "Drama": setDramaTitle
    };

    useEffect(() => {
        async function getTitles(id: string | undefined, genre: string) {
            setIsLoading(true);
            try {
                if (id) {
                    const titleData = await fetch(TITLE_URL + `${id}?search=${genre}`);
                    const titles = await titleData.json();
                    genreStateMap[genre as keyof typeof genreStateMap](titles);
                } else {
                    if(titles){
                        const filteredTitles = titles.filter(title => title.genre.includes(genre));
                        genreStateMap[genre as keyof typeof genreStateMap](filteredTitles);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch titles: ", error);
            } finally {
                setIsLoading(false);
            }
        }
        getTitles(id, "Trending");
        getTitles(id, "Comedy");
        getTitles(id, "Drama");
    }, [id, titles])


    return (
        <div style={{ marginTop: "-32px", position: "relative", zIndex: 0 }}> 
            <CarouselRow titles={trendingTitles} category={"Trending"} />
            <CarouselRow titles={comedyTitles} category={"Comedy"} />
            <CarouselRow titles={dramaTitles} category={"Drama"} />
        </div>
    )
}

export default CarouselRows;
