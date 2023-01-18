import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

import VideoGallery from "../../components/video-gallery/VideoGallery";
import { client } from "../../util/api/client";
import { VideoInfo } from "../../util/api/types";

import "./VideoHome.styles.scss";

const VideoHome = () => {
  const [videoList, setVideoList] = useState<VideoInfo[]>([]);
  const navigate = useNavigate();
  const handlers = useSwipeable({
    onSwipedUp: (eventData) => navigate("/"),
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  const loadVideoList = useCallback(async () => {
    const list = await client.loadVideoList();
    setVideoList(() => list);
  }, []);

  useEffect(() => {
    loadVideoList();
  }, [loadVideoList]);

  return (
    <>
      <div className="video-home" {...handlers}>
        <VideoGallery videos={videoList} />
      </div>
    </>
  );
};

export default VideoHome;
