import classes from "./Carousel.module.scss";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/swiper-bundle.css';
import 'swiper/swiper-bundle.css';
import SwiperCore, { Autoplay } from 'swiper';
import TitleWrapper from "./TitleWrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import "./../../index.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useEffect, useRef, useState } from "react";
import { Swiper as SwiperType } from 'swiper';
import { Title } from "./../../Types/types";

interface Props {
    titles: Title[],
    category: string
}
const CarouselRow: React.FC<Props> = ({ titles, category }) => {
    const [zIndex, setZIndex] = useState(1);
    const [hidePrev, setHidePrev] = useState<boolean>(true)
    const [offset, setOffset] = useState<number>(40);
    const [clickCount, setClickCount] = useState(0);
    const mediaQueryXl = window.matchMedia('(min-width: 1441px)');

    const breakpoints = {
        // When the screen width is less than or equal to 640px
        340: {
            slidesPerView: 1, // Display 1 slide at a time
        },
        // When the screen width is greater than 640px and less than or equal to 768px
        768: {
            //slidesPerView: 2, // Display 2 slides at a time
            spaceBetween: -3, // Adjust space between slides
        },
        // When the screen width is greater than 768px and less than or equal to 1024px
        1024: {
            // slidesPerView: 5, // Display 3 slides at a time
            spaceBetween: 0, // Adjust space between slides
        },
        // Default settings for larger screens
        1440: {
            // slidesPerView: 6, // Display 4 slides at a time
            spaceBetween: 0, // Adjust space between slides
        },
    };
    const slideContainerRef = useRef<HTMLDivElement>(null);

    SwiperCore.use([Autoplay]);

    // const [slidesPerGroup, setSlidesPerGroup] = useState<number>(6); // Initial value


    const handleTransitionEnd = (swiper: SwiperType) => {
        const currentSlideIndex = swiper.activeIndex;
        if (swiper.progress <= 0) {
            setHidePrev(true);
        } else {
            setHidePrev(false);
        }
    };

    const handleNextClick = () => {
        setClickCount((clickCount) => clickCount + 1);
    };

    useEffect(() => {
        // console.log(slideContainerRef)
    }, [])

    return (
        <div style={{ position: "relative", zIndex }}
            className={classes['carousel-row-div']}
            onMouseLeave={() => setZIndex(1)}
            onMouseEnter={() => setZIndex(2)}>
            <div style={{ overflow: "unset", position: "relative" }}>
                <h1 className={classes["header-carousel-row"]}> {category} </h1>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    slideNextClass={"prev"}

                    loop={true}
                    slidesPerGroup={6}
                    slidesPerView={7}
                  
                    slidesOffsetBefore={offset}
                    key={category}
                    speed={500}

                    navigation={{
                        prevEl: `.swiper-button-prev-${category}`,
                        nextEl: `.swiper-button-next-${category}`,
                    }}
                    onSlideChangeTransitionEnd={(e) => handleTransitionEnd(e)}
                    watchSlidesProgress={true}
                    className={classes["external-buttons"]}>

                    {Array.isArray(titles) ? titles.map((title: any): any => (
                        <SwiperSlide className={classes["title-div"]} key={title.id}>
                            <TitleWrapper title={{ poster: title.poster, video: title.video, overview: title.overview }} />
                        </SwiperSlide>
                    )) : []}

                </Swiper>
                <div className={`swiper-button-prev swiper-button-prev-${category}`} style={{ visibility: hidePrev ? 'hidden' : 'visible' }}></div>
                <div onClick={handleNextClick} style={{ position: "absolute", zIndex: 1 }} className={`swiper-button-next swiper-button-next-${category}`}></div>
            </div>
        </div>
    )
}

export default CarouselRow


