import {VideoInfo} from "./util/api/types";

export const getVideoUrl = (video: VideoInfo) => {
  if (!video) {
    return '';
  }
  console.log(video);
  return `/${video.id}`;
}