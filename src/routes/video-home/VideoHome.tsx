import React, { useEffect, useState } from "react";
import {Box} from "grommet";
import VideoGallery from "../../components/video-gallery/VideoGallery";
import { getOwnerVideos, VideoType } from "../../util/api/video-api";

import "./VideoHome.styles.scss";
import {Subscription} from "./Subscription";

const SubscriptionTimeout = 10 * 60 * 1000

const VideoHome = () => {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [featureVideo, setFeatureVideo] = useState<VideoType>();
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [subscriptionStart, setSubscriptionStart] = useState(0)

  const checkSubscription = () => {
    const subscriptionStartedValue = +(localStorage.getItem('stripe_subscription_start') || 0)
    if(Date.now() - subscriptionStartedValue < SubscriptionTimeout) {
      setIsSubscribed(true)
      setSubscriptionStart(subscriptionStartedValue)
      const subscriptionEnds = SubscriptionTimeout - (Date.now() - subscriptionStartedValue)

      setTimeout(() => {
        onUnsubscribe()
      }, subscriptionEnds)
    }
  }

  const onSubscribe = () => {
    const timeStart = Date.now()
    localStorage.setItem('stripe_subscription_start', timeStart.toString())
    setIsSubscribed(true)
    setSubscriptionStart(timeStart)
  }

  const onUnsubscribe = () => {
    localStorage.setItem('stripe_subscription_start', '0')
    setIsSubscribed(false)
    setSubscriptionStart(0)
  }

  useEffect(() => {
    const videos = getOwnerVideos("test");
    setVideos(videos);
    setFeatureVideo(videos[0]);
  }, []);

  useEffect(() => {
    checkSubscription()
  }, [])

  const subscriptionProps = {
    isSubscribed,
    subscriptionStart,
    subscriptionTimeout: SubscriptionTimeout,
    onSubscribe,
    onUnsubscribe
  }

  return (
    <>
        <Box width={'80%'}>
            <Box alignSelf={'start'} margin={{ top: '32px' }}>
                <Subscription {...subscriptionProps} />
            </Box>
            <div className="video-home">
                <VideoGallery videos={videos} isSubscribed={isSubscribed} />
            </div>
        </Box>

    </>
  );
};

export default VideoHome;
