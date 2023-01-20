import { useNavigate } from "react-router";
import { VideoType } from "../../util/api/video-api";

import './VideoThumbnail.styles.scss';
import {useEffect, useRef} from "react";

type VideoThumbnailProps = {
  video : VideoType
  isAvailable: boolean
}

const VideoThumbnail = ({ video, isAvailable = true } : VideoThumbnailProps) => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if(!isAvailable) {
      videoRef.current!.pause();
    } else {
      videoRef.current!.play();
    }
  }, [isAvailable])

  const watchVideo = (vanityUrl: string) => {
    navigate(`${vanityUrl}`);
  };

  const styles = {
    filter: isAvailable ? 'unset' : 'grayscale(100%)',
    cursor: isAvailable ? 'pointer' : 'not-allowed'
  }

  return (
    <div className='thumbnail' style={styles}>
      <video
        ref={videoRef}
        playsInline
        muted
        autoPlay={isAvailable}
        loop={isAvailable}
        onClick={() => isAvailable && watchVideo(video.vanityUrl)}
      >
        <source type="video/mp4" src={video.url} />
      </video>
    </div>
  )
}

export default VideoThumbnail;
