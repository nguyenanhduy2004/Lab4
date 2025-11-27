import React, { useState } from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faCircleCheck,
  faHeart,
  faCommentDots,
  faBookmark,
  faShare,
  faVolumeHigh,
  faVolumeXmark,
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";
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
  const [showSharePopup, setShowSharePopup] = useState(false);

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

  const handleShareClick = () => {
    setShowSharePopup(true);
  };

  const handleCloseSharePopup = () => {
    setShowSharePopup(false);
  };

  const handleShareOption = (platform) => {
    // Here you could add actual share functionality
    console.log(`Sharing to ${platform}`);
    setShowSharePopup(false);
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
      <div className="sidebar-icon share-btn" onClick={handleShareClick}>
        <FontAwesomeIcon
          icon={faShare}
          style={{ width: "35px", height: "35px", color: "white" }}
        />
        <p>{shares}</p>
      </div>

      {/* ---------------- SHARE POPUP (Portal to body) ---------------- */}
      {showSharePopup && ReactDOM.createPortal(
        <div className="share-popup-overlay" onClick={handleCloseSharePopup}>
          <div className="share-popup" onClick={(e) => e.stopPropagation()}>
            <div className="share-popup-header">
              <h3>Share to</h3>
              <button className="share-close-btn" onClick={handleCloseSharePopup}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <div className="share-options">
              <div className="share-option" onClick={() => handleShareOption('Facebook')}>
                <div className="share-icon facebook">
                  <FontAwesomeIcon icon={faFacebook} />
                </div>
                <span>Facebook</span>
              </div>
              <div className="share-option" onClick={() => handleShareOption('Instagram')}>
                <div className="share-icon instagram">
                  <FontAwesomeIcon icon={faInstagram} />
                </div>
                <span>Instagram</span>
              </div>
              <div className="share-option" onClick={() => handleShareOption('Threads')}>
                <div className="share-icon threads">
                  <svg viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C120.004 17.1113 137.552 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"/>
                  </svg>
                </div>
                <span>Threads</span>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

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
