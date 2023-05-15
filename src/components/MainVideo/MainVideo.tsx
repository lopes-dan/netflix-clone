import { useEffect, useRef, useState } from "react";
import { GrPlayFill } from 'react-icons/gr';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import * as React from "react";


const urlImg = "https://occ-0-1432-1433.1.nflxso.net/dnm/api/v6/tx1O544a9T7n8Z_G12qaboulQQE/AAAABfkgjGOWUEYkqRTg0ekQkAq3o00-Ad9jgunnZ3Xb3q9lDQcGy_hmkCp51w7Kok8ePDGvpnWIxl6rJuSW73sO8QBJAWtiUrTkOtM.webp?r=4ae";

interface Props {
  title: string;
}

const MainVideo: React.FC<Props> = ({ title }) => {

  const [isCover, setIsCover] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null)



  useEffect(() => {
    if (!title) {
      if (videoRef.current) {
        videoRef.current.play();
      }

    }
  }, [title, videoRef.current]);

  return (
    <>
      {title && title.length > 0 ? (
        ""
      ) : (

        <div className="video-div">
          <img
            className="main-show-logo"
            height="120"
            alt="vikings-icon"
            src={urlImg}
          />
          <section className="main-section-btn">
            <button className="btn-group"> <GrPlayFill className="play-icon" /> <span className="ltr-zd4xih">Play</span> </button>
            <button className="btn-group info-button"> <AiOutlineInfoCircle className="info-icon" /> <span className="more-info">More Info </span></button>
          </section>
          {!isCover ? <video onEnded={() => setIsCover(true)} autoPlay  muted className="video-container" width="555" ref={videoRef}>
            <source src="/vikings.mp4" type="video/mp4" />
          </video> : <figure className="main-cover">

          </figure>}
        </div>
      )}
    </>
  )

}

export default MainVideo;
