import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faCircleCheck,
  faHeart,
  faCommentDots,
  faBookmark,
  faShare,
  faVolumeHigh,
  faVolumeXmark
} from "@fortawesome/free-solid-svg-icons";
import "./FooterRight.css";

export default function FooterRight({
  likes,
  comments,
  saves,
  shares,
  profilePic,
  isMuted,
  onMuteToggle,
  videoUrl,
  onProfileClick
}) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [userAddIcon, setUserAddIcon] = useState(faCirclePlus);
  const [copyMessage, setCopyMessage] = useState("");

  // ---- FORMAT LIKES ----
  const parseLikesCount = (count) => {
    if (typeof count === "string") {
      if (count.endsWith("k")) return parseFloat(count) * 1000;
      return parseInt(count);
    }
    return count;
  };

  const formatLikesCount = (count) => {
    if (count >= 10000) return (count / 1000).toFixed(1) + "k";
    return count;
  };

  // ---- HANDLERS ----
  const handleLikeClick = () => setLiked((prev) => !prev);

  const handleSaveClick = () => {
    const newSaved = !saved;
    setSaved(newSaved);
    
    // Copy video URL to clipboard when saving
    if (newSaved && videoUrl) {
      navigator.clipboard.writeText(videoUrl).then(() => {
        setCopyMessage("URL Copied!");
        setTimeout(() => setCopyMessage(""), 2000);
      }).catch(() => {
        setCopyMessage("Copy failed");
        setTimeout(() => setCopyMessage(""), 2000);
      });
    }
  };

  const handleUserAddClick = () => {
    setUserAddIcon(faCircleCheck);
    setTimeout(() => setUserAddIcon(null), 3000);
  };

  // ---- COMPUTE DISPLAYED LIKES ----
  const displayedLikes =
    formatLikesCount(parseLikesCount(likes) + (liked ? 1 : 0));

  return (
    <div className="footer-right">

      {/* ---------------- PROFILE + ADD USER ---------------- */}
      <div className="sidebar-icon">
        {profilePic ? (
          <img
            src={profilePic}
            className="userprofile"
            alt="Profile"
            style={{ width: "45px", height: "45px", color: "#616161", cursor: "pointer" }}
            onClick={onProfileClick}
            title="View profile"
          />
        ) : null}

        {/* Add user icon */}
        <FontAwesomeIcon
          icon={userAddIcon}
          className="useradd"
          style={{ width: "15px", height: "15px", color: "#FF0000" }}
          onClick={handleUserAddClick}
        />
      </div>

      {/* ---------------- LIKE ---------------- */}
      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={faHeart}
          style={{
            width: "35px",
            height: "35px",
            color: liked ? "#FF0000" : "white"
          }}
          onClick={handleLikeClick}
        />
        <p>{displayedLikes}</p>
      </div>

      {/* ---------------- COMMENT ---------------- */}
      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={faCommentDots}
          style={{ width: "35px", height: "35px", color: "white" }}
        />
        <p>{comments}</p>
      </div>

      {/* ---------------- SAVE / BOOKMARK ---------------- */}
      <div className="sidebar-icon save-btn">
        <FontAwesomeIcon
          icon={faBookmark}
          style={{ 
            width: "35px", 
            height: "35px", 
            color: saved ? "#ffc107" : "white" 
          }}
          onClick={handleSaveClick}
        />
        <p>{saved ? saves + 1 : saves}</p>
        {copyMessage && <span className="copy-toast">{copyMessage}</span>}
      </div>

      {/* ---------------- SHARE ---------------- */}
      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={faShare}
          style={{ width: "35px", height: "35px", color: "white" }}
        />
        <p>{shares}</p>
      </div>

      {/* ---------------- MUTE/UNMUTE ---------------- */}
      <div className="sidebar-icon mute-btn" onClick={onMuteToggle}>
        <FontAwesomeIcon
          icon={isMuted ? faVolumeXmark : faVolumeHigh}
          style={{ width: "35px", height: "35px", color: "white" }}
        />
        <p>{isMuted ? "Unmute" : "Mute"}</p>
      </div>

      {/* ---------------- RECORD ICON ---------------- */}
      <div className="sidebar-icon record">
        <img
          src="https://static.thenounproject.com/png/934821-200.png"
          alt="Record Icon"
        />
      </div>

    </div>
  );
}
