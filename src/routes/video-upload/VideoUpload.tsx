import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { AiOutlinePlus } from "react-icons/ai";

import Upload from "../../components/upload/Upload";
import { VideoUploadDiv } from "./VideoUpload.styles";
import _ from "lodash";

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

  const handleWheelEvent = (event: any) => {
    event.stopPropagation();
    const deltaY = event.deltaY;
    if (deltaY < 0) {
      navigate(-1);
    }
  };

  const onWheelThrottled = 
    useMemo(() => _.throttle(handleWheelEvent, 2000, { trailing: false })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ,[]);

  return (
    <VideoUploadDiv opacity={opaque} {...handlers} onWheel={onWheelThrottled}>
      <Upload>
        <div className="upload-icon">
          <AiOutlinePlus />
        </div>
      </Upload>
    </VideoUploadDiv>
  );
};

export default VideoUpload;
