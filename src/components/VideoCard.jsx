import React, { useEffect, useRef, useState } from "react";
import FooterLeft from "./FooterLeft";
import FooterRight from "./FooterRight";
import "./VideoCard.css";

const VideoCard = (props) => {
  const {
    url,
    username,
    description,
    song,
    likes,
    comments,
    saves,
    shares,
    profilePic,
    setVideoRef,
    autoplay
  } = props;

  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  // Auto play video if autoplay = true
  useEffect(() => {
    if (autoplay && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [autoplay]);

  // Toggle mute/unmute
  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  // Toggle video play/pause on click
  const onVideoPress = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  return (
    <div className="video">

      {/* ------------------ VIDEO ELEMENT ------------------ */}
      <video
        className="player"
        onClick={onVideoPress}
        ref={(ref) => {
          videoRef.current = ref;
          setVideoRef(ref);
        }}
        loop
        muted
        src={url}
      />

      {/* ------------------ FOOTER OVER VIDEO ------------------ */}
      <div className="bottom-controls">

        {/* LEFT SIDE */}
        <div className="footer-left">
          <FooterLeft
            username={username}
            description={description}
            song={song}
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="footer-right">
          <FooterRight
            likes={likes}
            shares={shares}
            comments={comments}
            saves={saves}
            profilePic={profilePic}
            isMuted={isMuted}
            onMuteToggle={handleMuteToggle}
            videoUrl={url}
          />
        </div>

      </div>

    </div>
  );
};

export default VideoCard;
