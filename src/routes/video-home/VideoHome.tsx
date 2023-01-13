import React, { useCallback, useEffect, useState } from "react";
import VideoThumbnail from "../../components/video-thumbnail/VideoThumbnail";
import { client } from "../../util/api/client";
import { VideoInfo } from "../../util/api/types";

import "./VideoHome.styles.scss";

const VideoHome = () => {
  const [videoList, setVideoList] = useState<VideoInfo[]>([]);

  const loadVideoList = useCallback(async () => {
    const list = await client.loadVideoList();
    setVideoList(() => list);
  }, []);

  useEffect(() => {
    loadVideoList();
  }, [loadVideoList]);

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
