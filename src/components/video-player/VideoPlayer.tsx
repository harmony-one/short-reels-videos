import React, { useState, useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

import MuxPlayer from "@mux/mux-player-react";
import MuxVideo from "@mux/mux-video-react";
import MuxPlayerElement from "@mux/mux-player";
import { useSwipeable } from "react-swipeable";
import Slider from "rc-slider";
import { BsVolumeMuteFill, BsVolumeDownFill } from "react-icons/bs";

import { client } from "../../util/api/client";
import { VideoInfo } from "../../util/api/types";

import 'rc-slider/assets/index.css';
import { VideoPlayerContainer } from "./VideoPlayer.styles";

type VideoPlayerProps = {
  vanityUrl: string;
};

const isVideoReady = (video: VideoInfo) => {
  return video.muxAsset.status === "ready";
};

const getPlaybackId = (video: VideoInfo) => {
  if (!video.muxAsset.playback_ids) {
    return "";
  }
  return video.muxAsset.playback_ids[0].id;
};

const VideoPlayer = ({ vanityUrl }: VideoPlayerProps) => {
  const [muted, setMuted] = useState(true);
  const [opaque, setOpaque] = useState(0.5);
  const [isPlayed, setIsPlayed] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [video, setVideo] = useState<VideoInfo | undefined>(undefined);
  const [isVideoExistAndReady, setIsVideoExistAndReady] = useState(false);
  const videoRef = useRef<MuxPlayerElement>(null);
  const navigate = useNavigate();
  const handlers = useSwipeable({
    onSwipedUp: (eventData) => navigate("/home/upload/"),
    onSwipedDown: (eventData) => navigate("/home/"),
    trackMouse: true,
    preventScrollOnSwipe: true,
  });
  const { ref, inView } = useInView({
    /* Optional options */
    rootMargin: "0px",
    root: null,
    threshold: 0.1,
  });

  const muteVideo = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setMuted((current) => !current);
  };

  useEffect(() => {
    const getVideoInfo = async () => {
      const responseData = await client.loadVideoBySequenceId(vanityUrl);
      setVideo(() => responseData);
      setIsVideoExistAndReady(isVideoReady(responseData));
      setMuted(true);
    };

    if (inView && !video) {
      getVideoInfo();
    }
  }, [inView, vanityUrl, video]);

  const pauseVideo = (e: any) => {
    console.log('click');
    const video = videoRef.current;
    if (isPlayed && video) {
      video.pause();
      setIsPlayed(false);
    } else {
      video && video.play();

      setIsPlayed(true);
    }
  };

  useEffect(() => {
    if (!inView) {
      setOpaque(0.5);
    }
    setMuted(true);
  }, [inView]);

  const handleVolumenChange = (value: any) => {
    const player = videoRef.current;
    if (!player) {
      return;
    }
    player.volume = value; 
    setVolume(value);
  };

  return (
    <VideoPlayerContainer opacity={opaque} ref={ref}>
      {!isVideoExistAndReady && (
        <div className="videoPlayer-preparation">...</div>
      )}
      {inView && video && isVideoExistAndReady && (
        <MuxPlayer
          ref={videoRef}
          streamType="on-demand"
          muted={muted}
          autoPlay="muted"
          loop
          // playsInline
          playbackId={getPlaybackId(video)}
          metadata={{
            video_id: "video-id-54321",
            video_title: "Test video title",
            viewer_user_id: "user-id-007",
          }}
        />
      )}
      <div className="videoPlayer-content">
        <div className="videoPlayer-bottom">
          <div className="videoPlayer-volume">
            {muted ? (
              <div className="videoPlayer-mute-icon" onClick={muteVideo}>
                <BsVolumeMuteFill />
              </div>
            ) : (
              <>
                <div className="videoPlayer-volume-slide">
                  <Slider
                    vertical
                    value={volume}
                    min={0}
                    max={1}
                    step={0.1}
                    onChange={handleVolumenChange}
                    handleStyle={{ width: 27, height: 27, marginLeft: -11 }}
                  />
                </div>
                <div className="videoPlayer-mute-icon" onClick={muteVideo}>
                  <BsVolumeDownFill />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className='videoPlayer-pause' onClick={pauseVideo} {...handlers}/>
    </VideoPlayerContainer>
  );
};

export default VideoPlayer;
