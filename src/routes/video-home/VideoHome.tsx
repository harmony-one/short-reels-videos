import React, { useCallback, useEffect, useState } from "react";
import VideoThumbnail from "../../components/video-thumbnail/VideoThumbnail";
import {
  muxClient,
  VideoInfo,
} from "../../util/api/video-api";

import "./VideoHome.styles.scss";

const VideoHome = () => {
  const [videoList, setVideoList] = useState<VideoInfo[]>([]);

  const loadVideoList = useCallback(async () => {
    const list = await muxClient.loadVideoList();
    console.log('list', list);
    setVideoList(() => list);
  }, []);

  useEffect(() => {
    console.log('useEffect')
    loadVideoList();
  }, [loadVideoList]);

  console.log(videoList);
  return (
    <>
      <div className="video-home">
        <div className="video-gallery">
          {videoList.length > 0 &&
            videoList.map((video, index) => (
              <VideoThumbnail video={video} key={index} />
            ))}
        </div>
      </div>
    </>
  );
};

export default VideoHome;
