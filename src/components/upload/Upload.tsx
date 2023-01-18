import React, { ChangeEvent, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Box } from "grommet";
import { Spinner } from "grommet";

import { VideoInfo } from "../../util/api/types";
import { client } from "../../util/api//client";
import { AppText } from "../../util/appText";

type UploadProps = {
  children: JSX.Element;
};

const Upload = ({ children }: UploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<VideoInfo | undefined>();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileChange = (e?: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    if (!e || !e.target.files) {
      return;
    }
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    const videoUpload = async () => {
      let data = new FormData();
      data.append("video", file!);
      const response = await client.uploadVideo(data);
      console.log(response);
      setResult(response);
    };
    if (file) {
      setUploading(true);
      videoUpload();
    }
  }, [file]);

  useEffect(() => {
    if (result) {
      toast.success(AppText.upload.success);
      navigate("/home/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  const getFile = () => {
    const inputFile = inputFileRef.current;
    if (inputFile) {
      inputFile.click();
    }
  };

  return (
    <Box onClick={getFile}>
      <input
        type="file"
        hidden
        onChange={handleFileChange}
        ref={inputFileRef}
      />
      {!uploading && children}
      {uploading && (
        <div>
          <Spinner size="large" />
        </div>
      )}
    </Box>
  );
};

export default Upload;
