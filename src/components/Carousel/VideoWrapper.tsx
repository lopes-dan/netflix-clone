import classes from "./Carousel.module.scss";


const VideoWrapper = () => {

    return (
        <div className={classes["subVid"]} >
            <iframe width="420" height="345" src="https://www.youtube.com/embed/tgbNymZ7vqY">
            </iframe>
        </div>
    )
}


export default VideoWrapper;