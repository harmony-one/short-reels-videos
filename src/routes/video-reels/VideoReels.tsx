import React, { useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import Slider from "react-slick";
import { useParams, useNavigate } from "react-router-dom";

import VideoPlayer from "../../components/video-player/VideoPlayer";
import { client } from "../../util/api/client";
import { VideoInfo } from "../../util/api/types";

import "./VideoReels.styles.scss";

const VideoReels = () => {
  const [videos, setVideos] = useState<VideoInfo[]>([]);
  const { vanityUrl } = useParams();
  const navigate = useNavigate();
  const wheelRef=useRef<HTMLDivElement>(null);
  const sliderRef = useRef<any>(null);
  const handlers = useSwipeable({
    onSwipedUp: (eventData) => navigate("/home/upload/"),
    onSwipedDown: (eventData) => navigate("/home/"),
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    const getVideos = async () => {
      let videoList = await client.loadVideoList();
      if (vanityUrl) {
        const index = videoList.findIndex((v: VideoInfo) => v.id === vanityUrl);
        videoList.unshift(videoList.splice(index, 1)[0]);
      }
      setVideos(videoList);
    };
    getVideos();
  }, []);

  useEffect(() => {
    const wheel = wheelRef.current;

    const handleWheelEvent = (event: WheelEvent) => {
      const deltaY = event.deltaY;
      if (deltaY < 0) {
        sliderRef.current.slickNext();
      } else {
        sliderRef.current.slickPrev();
      }
    };

    wheel?.addEventListener("wheel", (event) => handleWheelEvent(event));

    return () => {
      wheel?.removeEventListener("wheel", (event) =>
        handleWheelEvent(event)
      );
    };
  }, []);

  useEffect(() => {
    const handleEsc = (event: any) => {
       if (event.keyCode === 27) {
        navigate("/home/");
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <div className="video-reels" {...handlers}>
      <div ref={wheelRef}> 
        <Slider className="carousel" {...sliderSettings} ref={sliderRef}>
          {videos.map((video: any, index: React.Key | null | undefined) => {
            return <VideoPlayer videoId={video.id} key={index} />;
          })}
        </Slider>
      </div>
    </div>
  );
};

export default VideoReels;
