import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEllipsis,
  faUserPlus,
  faShare,
  faPlay,
  faHeart,
  faLock,
  faBookmark,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import "./UserProfile.css";

const UserProfile = ({ 
  isVisible, 
  onClose, 
  username, 
  profilePic, 
  description,
  videos = []
}) => {
  const [activeTab, setActiveTab] = useState("videos");
  const [isFollowing, setIsFollowing] = useState(false);

  // Generate random stats for demonstration
  const stats = {
    following: Math.floor(Math.random() * 500) + 50,
    followers: Math.floor(Math.random() * 100000) + 1000,
    likes: Math.floor(Math.random() * 1000000) + 10000,
  };

  // Format large numbers
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  // Extract hashtags from description
  const extractHashtags = (desc) => {
    if (!desc) return [];
    const matches = desc.match(/#\w+/g);
    return matches || [];
  };

  // Generate sample video thumbnails
  const sampleThumbnails = [
    "https://picsum.photos/seed/vid1/200/350",
    "https://picsum.photos/seed/vid2/200/350",
    "https://picsum.photos/seed/vid3/200/350",
    "https://picsum.photos/seed/vid4/200/350",
    "https://picsum.photos/seed/vid5/200/350",
    "https://picsum.photos/seed/vid6/200/350",
    "https://picsum.photos/seed/vid7/200/350",
    "https://picsum.photos/seed/vid8/200/350",
    "https://picsum.photos/seed/vid9/200/350",
  ];

  // Generate random view counts for thumbnails
  const generateViewCount = () => {
    const views = Math.floor(Math.random() * 500000) + 1000;
    return formatNumber(views);
  };

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" || e.key === "Escape") {
        onClose();
      }
    };

    if (isVisible) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVisible, onClose]);

  const hashtags = extractHashtags(description);
  const bioText = description ? description.replace(/#\w+/g, "").trim() : "";

  return (
    <div className={`user-profile-overlay ${isVisible ? "visible" : ""}`}>
      <div className={`user-profile-container ${isVisible ? "slide-in" : ""}`}>
        {/* Header */}
        <div className="profile-header">
          <button className="back-btn" onClick={onClose}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <span className="header-username">@{username}</span>
          <button className="more-btn">
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
        </div>

        {/* Profile Info Section */}
        <div className="profile-info">
          {/* Large Profile Picture */}
          <div className="profile-avatar-container">
            <img 
              src={profilePic} 
              alt={username} 
              className="profile-avatar-large"
            />
            <div className="avatar-badge">
              <FontAwesomeIcon icon={faUserPlus} />
            </div>
          </div>

          {/* Username */}
          <h1 className="profile-username">@{username}</h1>

          {/* Stats Row */}
          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-number">{formatNumber(stats.following)}</span>
              <span className="stat-label">Following</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">{formatNumber(stats.followers)}</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">{formatNumber(stats.likes)}</span>
              <span className="stat-label">Likes</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="profile-actions">
            <button 
              className={`follow-btn ${isFollowing ? "following" : ""}`}
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
            <button className="action-btn instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </button>
            <button className="action-btn youtube">
              <FontAwesomeIcon icon={faYoutube} />
            </button>
            <button className="action-btn share">
              <FontAwesomeIcon icon={faShare} />
            </button>
            <button className="action-btn dropdown">
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
          </div>

          {/* Bio/Description */}
          <div className="profile-bio">
            {bioText && <p className="bio-text">{bioText}</p>}
            {hashtags.length > 0 && (
              <div className="hashtags-container">
                {hashtags.map((tag, index) => (
                  <span key={index} className="hashtag">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          <button 
            className={`tab-btn ${activeTab === "videos" ? "active" : ""}`}
            onClick={() => setActiveTab("videos")}
          >
            <FontAwesomeIcon icon={faPlay} className="tab-icon" />
            <span>Videos</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === "liked" ? "active" : ""}`}
            onClick={() => setActiveTab("liked")}
          >
            <FontAwesomeIcon icon={faHeart} className="tab-icon" />
            <span>Liked</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === "saved" ? "active" : ""}`}
            onClick={() => setActiveTab("saved")}
          >
            <FontAwesomeIcon icon={faBookmark} className="tab-icon" />
            <span>Saved</span>
          </button>
        </div>

        {/* Video Grid */}
        <div className="video-grid-container">
          {activeTab === "videos" && (
            <div className="video-grid">
              {sampleThumbnails.map((thumb, index) => (
                <div key={index} className="video-thumbnail">
                  <img src={thumb} alt={`Video ${index + 1}`} />
                  <div className="video-overlay">
                    <div className="video-views">
                      <FontAwesomeIcon icon={faPlay} className="play-icon" />
                      <span>{generateViewCount()}</span>
                    </div>
                  </div>
                  {index === 0 && <div className="pinned-badge">📌 Pinned</div>}
                </div>
              ))}
            </div>
          )}
          
          {activeTab === "liked" && (
            <div className="private-content">
              <FontAwesomeIcon icon={faLock} className="lock-icon" />
              <p>This user's liked videos are private</p>
            </div>
          )}
          
          {activeTab === "saved" && (
            <div className="private-content">
              <FontAwesomeIcon icon={faLock} className="lock-icon" />
              <p>Only you can see saved videos</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

