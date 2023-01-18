import { VideoInfo } from '../../util/api/types'; 
import VideoThumbnail from "../video-thumbnail/VideoThumbnail";
import "./VideoGallery.styles.scss";

type VideoGalleryProps = {
  videos: VideoInfo[]
}
const VideoGallery = ({ videos } : VideoGalleryProps) => {
  return (
    <div className="video-gallery">
      {videos.length > 0 &&
        videos.map((video, index) => (
          <VideoThumbnail video={video} key={index} />
        ))}
    </div>
  );
};

export default VideoGallery;
