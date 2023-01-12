import video1 from '../../assets/test-videos/h.mov';
import video2 from '../../assets/test-videos/h2.mov'
import video3 from '../../assets/test-videos/Harmony launches on Binance.mov'
import video4 from '../../assets/test-videos/Harmony launches.mov'
import { config } from '../../config';

const HOST = config.uploader.host;

export type VideoType = {
  url : string;
  vanityUrl : string;
  merchandiseId : string | undefined
}

export interface VideoInfo {
  id: string,
  createdAt: string,
  muxPlaybackId: string | '',
  muxAssetStatus: 'preparing' | 'ready' | 'error',
  muxAsset: {
    status: 'preparing' | 'ready' | 'errored',
    playback_ids?: [
      {
        id: string
      }
    ]
  }
}

export const muxClient = {
  loadVideoList: async () => {
    const response = await fetch(`${HOST}/videos`, {
      method: 'Get',
      mode: 'cors',
    });

    const responseData = await response.json();

    return responseData.data.slice(0, 3);
  },
  
  uploadVideo: async (data: FormData) => {

    const response = await fetch(`${HOST}/upload`, {
      method: 'POST',
      body: data,
      mode: 'cors',
    });

    const responseData = await response.json();

    return responseData.data;
  },

  loadVideoInfo: async (videoId: string) => {
    const response = await fetch(`${HOST}/videos/${videoId}`, {
      method: 'Get',
      mode: 'cors',
    });

    const responseData = await response.json();

    return responseData.data;
  }
}

export const TEST_VIDEOS = [
  {
    url: video1,
    vanityUrl: '1',
    merchandiseId: undefined,
  },
  {
    url: video2,
    vanityUrl: '2',
    merchandiseId: '34342',
  },
  {
    url: video3,
    vanityUrl: '3',
    merchandiseId: '34234',
  },
  {
    url: video4,
    vanityUrl: '4',
    merchandiseId: undefined,
  }
]

export const getOwnerVideos = (name: string) => {
  return TEST_VIDEOS
}

export const getVideo = (vanityUrl: string) => {
  return TEST_VIDEOS.find(v => v.vanityUrl === vanityUrl)
}
