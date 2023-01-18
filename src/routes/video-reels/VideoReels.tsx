import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Slider from "react-slick";
import _ from "lodash";

import VideoPlayer from "../../components/video-player/VideoPlayer";
import { client } from "../../util/api/client";
import { VideoInfo } from "../../util/api/types";

import "./VideoReels.styles.scss";

const VideoReels = () => {
  const [videos, setVideos] = useState<VideoInfo[]>([]);
  const { vanityUrl } = useParams();
  const navigate = useNavigate();
  const wheelRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<any>(null);

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    const getVideos = async () => {
      let videoList = await client.loadVideoList();
      console.log('list update',videoList);
      if (vanityUrl) {
        const index = videoList.findIndex((v: VideoInfo) => v.sequenceId+"" === vanityUrl);
        videoList.unshift(videoList.splice(index, 1)[0]);
      }
      console.log(videoList);
      setVideos(videoList);
    };
    getVideos();
  }, []);

  useEffect(() => {
    const handleEsc = (event: any) => {
      if (event.keyCode === 27) {
        navigate("/home/");
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleWheelEvent = (event: any) => {
    event.stopPropagation();
    const deltaY = event.deltaY;
    if (deltaY < 0) {
      sliderRef.current.slickNext();
    } else {
      sliderRef.current.slickPrev();
    }
  };

  const onWheelThrottled = 
    useMemo(() => _.throttle(handleWheelEvent, 2000, { trailing: false })
  ,[]);

  return (
    <div className="video-reels" onWheel={onWheelThrottled} ref={wheelRef}>
      <Slider className="carousel" {...sliderSettings} ref={sliderRef}>
        {videos.map((video: any, index: React.Key | null | undefined) => {
          return <VideoPlayer vanityUrl={video.sequenceId} key={index} />;
        })}
      </Slider>
    </div>
  );
};

export default VideoReels;
