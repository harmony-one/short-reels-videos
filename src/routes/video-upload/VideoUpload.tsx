import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { AiOutlinePlus } from "react-icons/ai";

import Upload from "../../components/upload/Upload";
import { VideoUploadDiv } from "./VideoUpload.styles";

import "react-dropzone-uploader/dist/styles.css";
import "/node_modules/video-react/dist/video-react.css";

const VideoUpload = () => {
  const [opaque, setOpaque] = useState(0.5);
  const navigate = useNavigate();
  const handlers = useSwipeable({
    onSwipedDown: (eventData) => navigate("/home/"),
    onSwipedUp: (eventData) => navigate(-1),
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  useEffect(() => {
    setTimeout(function () {
      setOpaque(0);
    }, 3000);
  }, []);

  return (
    <VideoUploadDiv opacity={opaque} {...handlers}>
      <Upload>
        <div className="upload-icon">
          <AiOutlinePlus />
        </div>
      </Upload>
    </VideoUploadDiv>
  );
};

export default VideoUpload;
