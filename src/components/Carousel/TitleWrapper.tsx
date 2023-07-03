import classes from "./Carousel.module.scss";
import { useState } from "react";


interface Props {
  title: {
    poster: string;
    video: string;
    overview: string
  };
}

const TitleWrapper: React.FC<Props> = ({ title }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isSiblingHovering, setIsSiblingHovering] = useState(false);

  const handleMouseEnter = () => {

    setIsHovering(true);
  };

  const handleMouseLeave = () => {

    if (!isSiblingHovering) {
      setTimeout(() => setIsHovering(false), 200);
    }
  };

  return (
    <>
      <div
        style={{
          background: `url(${title.poster}) no-repeat center center/cover`, position: "relative", zIndex: 20
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={classes["video"]}
      >
        {isHovering && (
          <>
            <div className={classes["description"]}>
              <div className={classes["description-margin"]}>
                <iframe
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    pointerEvents: 'auto',
                    width: '100%',
                    height: '100%',
                    border: "none",
                  }}
                  src={`https://www.youtube.com/embed/${title.video.slice(
                    title.video.lastIndexOf("=") + 1
                  )}?controls=0&autoplay=1&mute=0`}
                  allow="autoplay; encrypted-media"
                />

              </div>
              <div style={{cursor: "pointer"}} className={classes["description-section"]}>
                <p className={classes["description-details"]}> {title.overview}</p>
                <a href={title.video} target="_blank">
                  <button className={classes["description.play"]}>Play</button>
                </a>
              </div>
            </div>

          </>
        )}
      </div>
    </>
  );
};

export default TitleWrapper;











/*
interface Props {
  title: object | any
}

const TitleWrapper: React.FC<Props> = ({ title }) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);


  const triggerOn = (e: any) => {
    //e.stopProgation()
    setIsHovering(true);

  };

  const triggerOut = (e: any) => {
    setIsHovering(false);
  };

  useEffect(() => {
    console.log("here bro", isHovering)
  }, [isHovering])
  return (
    <>

      <div
      className={classes["video"]}
        onMouseEnter={triggerOn}
        onMouseOut={triggerOut} >

        {isHovering && (


          <div className={classes["description"]}>
            <iframe

              allow="autoplay; encrypted-media"
              src={`https://www.youtube.com/embed/${title.video.slice(
                title.video.lastIndexOf("=") + 1
              )}?controls=0&autoplay=1&mute=0`}
            ></iframe>
          </div>
        )}
      </div>
      <img


        id="poster"
        src={title.poster}
        alt="title-poster"
        className={`${classes.poster}`}
      />


    </>
  );
};

export default TitleWrapper;

*/