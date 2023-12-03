import { useEffect, useRef } from "react";

export const VideoPlayer: React.FC<{ stream?: MediaStream }> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) videoRef.current.srcObject = stream;
  }, [stream]);
  return (
    <video
      data-testid="peer-video"
      className="shadow-md rounded-xl m-2 bg-white"
      style={{ width: "100%" }}
      ref={videoRef}
      autoPlay
      muted={true}
    />
  );
};
