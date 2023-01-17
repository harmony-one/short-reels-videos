import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { AiOutlinePlus, AiFillCloseCircle } from "react-icons/ai";
import { FcCollapse } from "react-icons/fc";

import Upload from "../../components/upload/Upload";
import { VideoUploadDiv } from "./VideoUpload.styles";

import "react-dropzone-uploader/dist/styles.css";
import "/node_modules/video-react/dist/video-react.css";

const VideoUpload = () => {
  const [opaque, setOpaque] = useState(0.5);
  const [uploadEnabled, setUploadEnabled] = useState(false);
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

  const buttonHandler = () => {
    setUploadEnabled((current) => !current);
  };
  return (
    <VideoUploadDiv opacity={opaque} {...handlers}>
      {!uploadEnabled ? (
        <div className="upload-icon" onClick={buttonHandler}>
          <AiOutlinePlus />
        </div>
      ) : (
        <Upload />
      )}
      <div></div>
    </VideoUploadDiv>
  );
};

export default VideoUpload;
