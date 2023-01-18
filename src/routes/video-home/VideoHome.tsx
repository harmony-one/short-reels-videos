import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import _ from "lodash";
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

  const handleWheelEvent = (event: any) => {
    event.stopPropagation();
    const deltaY = event.deltaY;
    if (deltaY > 0) {
      navigate('/');
    }
  };

  const onWheelThrottled = 
    useMemo(() => _.throttle(handleWheelEvent, 2000, { trailing: false })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ,[]);

  return (
    <>
      <div className="video-home" {...handlers} onWheel={onWheelThrottled}>
        <VideoGallery videos={videoList} />
      </div>
    </>
  );
};

export default VideoHome;
