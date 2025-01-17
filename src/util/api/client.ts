import { config } from "../../config";

const HOST = config.uploader.host;

export const client = {
  loadVideoList: async () => {
    const response = await fetch(`${HOST}/videos`, {
      method: "Get",
      mode: "cors",
    });

    const responseData = await response.json();

    return responseData.data.slice(0,3);
  },
  uploadVideo: async (data: FormData) => {
    const response = await fetch(`${HOST}/upload`, {
      method: "POST",
      body: data,
      mode: "cors",
    });

    const responseData = await response.json();

    return responseData.data;
  },
  loadVideoInfo: async (videoId: string) => {
    const response = await fetch(`${HOST}/videos/${videoId}`, {
      method: "Get",
      mode: "cors",
    });

    const responseData = await response.json();

    return responseData.data;
  },
  loadVideoByUrl: async (videoUrl: string) => {
    const response = await fetch(`${HOST}/videos/url/${videoUrl}`, {
      method: "Get",
      mode: "cors",
    });

    const responseData = await response.json();

    return responseData.data;
  },
  loadVideoBySequenceId: async (sequenceId: string) => {
    const response = await fetch(`${HOST}/videos/bySequenceId/${sequenceId}`, {
      method: "Get",
      mode: "cors",
    });

    const responseData = await response.json();

    return responseData.data;
  },
};
