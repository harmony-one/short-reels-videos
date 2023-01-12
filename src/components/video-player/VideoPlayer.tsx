import React, { useState, useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { muxClient, VideoInfo } from "../../util/api/video-api";
import MuxPlayer from "@mux/mux-player-react";

import { BsVolumeMuteFill, BsVolumeDownFill } from "react-icons/bs";

import { VideoPlayerContainer } from "./VideoPlayer.styles";

type VideoPlayerProps = {
  videoId: string; //VideoInfo;
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

const VideoPlayer = ({ videoId }: VideoPlayerProps) => {
  const [muted, setMuted] = useState(true);
  const [opaque, setOpaque] = useState(0.5);
  const [isPlayed, setIsPlayed] = useState(true);
  const [video, setVideo] = useState<VideoInfo | undefined>(undefined);
  const [isVideoExistAndReady, setIsVideoExistAndReady] = useState(false);
  const videoRef = useRef<any>(null);

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
      const responseData = await muxClient.loadVideoInfo(videoId);
      setVideo(() => responseData);
      setIsVideoExistAndReady(isVideoReady(responseData));
      setMuted(false);
    };

    if (inView && !video) {
      getVideoInfo();
    }
  }, [inView, videoId, video]);

  const pauseVideo = (e: any) => {
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
      setMuted(true);
      setOpaque(0.5);
      // setVideo(undefined);
    } else {
      setMuted(false);
    }
  }, [inView]);

  return (
    <VideoPlayerContainer opacity={opaque} ref={ref}>
      {!isVideoExistAndReady && <div>video preparing...</div>}
      {inView && video && isVideoExistAndReady && (
        <MuxPlayer
          // preferPlayback="mse"
          ref={videoRef}
          streamType="on-demand"
          muted={muted}
          autoPlay
          loop
          // loading="viewport"
          playbackId={getPlaybackId(video)}
          metadata={{
            video_id: "video-id-54321",
            video_title: "Test video title",
            viewer_user_id: "user-id-007",
          }}
        />
      )}
      <div className="videoPlayer-content" onClick={pauseVideo}>
        <div className="videoPlayer-bottom">
          <div style={{ width: "3em" }}></div>
          <div className="swipe-action-icon-bottom"></div>
          <div className="videoPlayer-mute-icon" onClick={muteVideo}>
            {muted ? <BsVolumeMuteFill /> : <BsVolumeDownFill />}
          </div>
        </div>
      </div>
    </VideoPlayerContainer>
  );
};

export default VideoPlayer;
