import { VideoType } from "../../util/api/video-api";
import VideoThumbnail from "../video-thumbnail/VideoThumbnail";
import "./VideoGallery.styles.scss";

type VideoGalleryProps = {
  videos: VideoType[]
  isSubscribed: boolean
}
const VideoGallery = ({ videos, isSubscribed } : VideoGalleryProps) => {
  return (
    <div className="video-gallery">
      {videos.length > 0 &&
        videos.map((video, index) => (
          <VideoThumbnail video={video} key={index} isAvailable={isSubscribed} />
        ))}
    </div>
  );
};

export default VideoGallery;
