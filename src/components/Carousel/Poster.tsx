import classes from "./Carousel.module.scss";
import { useState, useLayoutEffect, useRef, useEffect } from "react";


interface Props {
    url: string | any,
    triggerOn: Function | any,
    triggerOut: Function | any,
    title: any
}


const Poster: React.FC<Props> = ({ url, triggerOn, triggerOut, title }) => {
    const [isHovering, setIsHovering] = useState<boolean>(false);

    return (
        <>
            <img
                style={{cursor: "pointer"}}
                onMouseEnter={triggerOn}
                onMouseOut={triggerOut}
                id="poster"
                src={url}
                alt="title-poster"
                className={`${classes.poster}`}
            />

        </>
    )
}

export default Poster