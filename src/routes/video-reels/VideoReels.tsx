import React, { useEffect, useState } from 'react'
import VideoPlayer from '../../components/video-player/VideoPlayer';
import Slider from "react-slick";
import { useParams, useNavigate } from 'react-router-dom'
import { getOwnerVideos, muxClient, VideoInfo, VideoType } from '../../util/api/video-api'
import { useSwipeable } from 'react-swipeable'

import './VideoReels.styles.scss';

const VideoReels = () => {
  const [videos, setVideos] = useState<VideoInfo[]>([])
  const { vanityUrl } = useParams();
  const navigate = useNavigate();
  const handlers = useSwipeable({
    onSwipedUp: (eventData) => navigate('/upload/'),
    onSwipedDown: (eventData) => navigate('/home/'), 
    trackMouse: true,
    preventScrollOnSwipe: true,
  });


  const sliderSettings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // responsive: [
    //   {
    //     // breakpoint: 600,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //     },
    //   },
    // ],
  }
  
  useEffect(() => {
    const getVideos = async () => {
      let videoList = await muxClient.loadVideoList();
      const index = videoList.findIndex((v:VideoInfo) => v.id === vanityUrl);
      videoList.unshift(videoList.splice(index, 1)[0])
      console.log(videoList, vanityUrl);
      setVideos(videoList)
    }
    
    getVideos();
  
  }, [])

  return (
    <div className='video-reels'  {...handlers}>
      <Slider className='carousel' {...sliderSettings}>
        {videos.map((video: any, index: React.Key | null | undefined) => {
          return <VideoPlayer videoId={video.id} key={index} />
        })}
      </Slider>
    </div>
  )
}

export default VideoReels;