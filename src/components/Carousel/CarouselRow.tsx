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


interface Props {
    titles: [] | null,
    category: string
}const CarouselRow: React.FC<Props> = ({ titles, category }) => {
    const [zIndex, setZIndex] = useState(1);
    const [hidePrev, setHidePrev] = useState<boolean>(true)
    const [offset, setOffset] = useState<number>(40);
    const [clickCount, setClickCount] = useState(0);
    const mediaQueryMd = window.matchMedia('(min-width: 768px) and (max-width: 1024px)');
    const mediaQueryLg = window.matchMedia('(min-width: 1025px) and (max-width: 1440px)');
    const mediaQueryXl = window.matchMedia('(min-width: 1441px)');

    const slideContainerRef = useRef<HTMLDivElement>(null);

    SwiperCore.use([Autoplay]);

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
        if (mediaQueryXl.matches){
          //  setOffset(91)
           // setOffset(0)
        }
    }, [])

    return (
        <div ref={slideContainerRef} style={{ position: "relative", zIndex }}
            className={classes['carousel-row-div']}
            onMouseLeave={() => setZIndex(1)}
            onMouseEnter={() => setZIndex(2)}>
            <div style={{ overflow: "unset", position: "relative" }}>
                <h1 className={classes["header-carousel-row"]}> {category} </h1>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    slideNextClass={"prev"}
                    slidesPerView={7}
                    slidesPerGroup={6}
                    loop={true}
                    onReachEnd={() => console.log("damn")}
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


                    {titles && titles.map((title: any): any => (
                        <SwiperSlide className={classes["title-div"]} key={title.id}>
                            <TitleWrapper title={{ poster: title.poster, video: title.video, overview: title.overview }} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className={`swiper-button-prev swiper-button-prev-${category}`} style={{ visibility: hidePrev ? 'hidden' : 'visible' }}></div>
                <div onClick={handleNextClick} style={{ position: "absolute", zIndex: 1 }} className={`swiper-button-next swiper-button-next-${category}`}></div>
            </div>
        </div>
    )
}

export default CarouselRow



/*import classes from "./Carousel.module.scss";
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


interface Props {
    titles: [] | null,
    category: string
}
const CarouselRow: React.FC<Props> = ({ titles, category }) => {
    const [zIndex, setZIndex] = useState(1);
    const [hidePrev, setHidePrev] = useState(true);
    const [offset, setOffset] = useState<number>(41);

    
    const slideContainerRef = useRef<HTMLDivElement>(null);

    SwiperCore.use([Autoplay]);

    const handleSlideProgress = (swiper: any) => {

        if (swiper.progress <= 0) {
            setHidePrev(true);
        } else {
            setHidePrev(false);
        }
        setOffset(prevOffset => prevOffset + 40);
        if (offset === 40) {
            setOffset(80)
        }
        if(offset >= 80){
            setOffset(80)
        }
      
        else{
            setOffset(80)
        }

        if(offset === 82){
            setOffset(40)
        }
        // increase the offset value by 10 on each click

        const currentSlideIndex = swiper.activeIndex;
        if (currentSlideIndex % 2 === 0 && window.innerWidth < 1290) { // check if the current slide index is a multiple of 3
            setOffset(210)
          }
        if (currentSlideIndex % 2 === 0 && window.innerWidth > 2000) { // check if the current slide index is a multiple of 3
            setOffset(210)
          }
       else if (currentSlideIndex % 2 === 0 && window.innerWidth > 3000) { // check if the current slide index is a multiple of 3
          setOffset(200)
        }
       else if (currentSlideIndex % 2 === 0 && window.innerWidth > 4000) { // check if the current slide index is a multiple of 3
            setOffset(310)
          }
    }


    useEffect(() => {
        if(window.innerWidth > 3000 && offset >= 80){
         setOffset(4000)
        }
    }, [window.innerWidth])

    return (
        <div ref={slideContainerRef} style={{ position: "relative", zIndex }}
            className={classes['carousel-row-div']}
            onMouseLeave={() => setZIndex(1)}
            onMouseEnter={() => setZIndex(2)}>
            <div style={{ overflow: "unset", position: "relative" }}>
                <h1 className={classes["header-carousel-row"]}> {category} </h1>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    slideNextClass={"prev"}
                    slidesPerView={7}
                    slidesPerGroup={6}
                    loop={true}
                    onReachEnd={() => console.log("damn")}
                    slidesOffsetBefore={offset}
                    key={category}
                    speed={500}
                    navigation={{
                        prevEl: `.swiper-button-prev-${category}`,
                        nextEl: `.swiper-button-next-${category}`,
                    }}

                    onSlideChangeTransitionEnd={(e) => handleSlideProgress(e)}
                    watchSlidesProgress={true}
                    className={classes["external-buttons"]}>


                    {titles && titles.map((title: any): any => (
                        <SwiperSlide className={classes["title-div"]} key={title.id}>
                            <TitleWrapper title={{ poster: title.poster, video: title.video, overview: title.overview }} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className={`swiper-button-prev swiper-button-prev-${category}`} style={{ visibility: hidePrev ? 'hidden' : 'visible' }}></div>
                <div style={{ position: "absolute", zIndex: 1 }} className={`swiper-button-next swiper-button-next-${category}`}></div>
            </div>
        </div>
    )
}
export default CarouselRow*/

/*
;*/