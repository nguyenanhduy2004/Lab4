import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import VideoCard from './components/VideoCard';
import BottomNavbar from './components/BottomNavbar';
import TopNavbar from './components/TopNavbar';

// This array holds information about different videos
const videoUrls = [
  {
    url: require('./videos/video1.mp4'),
    profilePic: 'https://randomuser.me/api/portraits/women/44.jpg',
    username: 'csjackie',
    description: 'Lol nvm #compsci #chatgpt #ai #openai #techtok',
    song: 'Original sound - Famed Flames',
    likes: 430,
    comments: 13,
    saves: 23,
    shares: 1,
  },
  {
    url: require('./videos/video2.mp4'),
    profilePic: 'https://randomuser.me/api/portraits/men/32.jpg',
    username: 'dailydotdev',
    description: 'Every developer brain @francesco.ciulla #developerjokes #programming #programminghumor #programmingmemes',
    song: 'tarawarolin wants you to know this isnt my sound - Chaplain J Rob',
    likes: '13.4K',
    comments: 3121,
    saves: 254,
    shares: 420,
  },
  {
    url: require('./videos/video3.mp4'),
    profilePic: 'https://randomuser.me/api/portraits/men/75.jpg',
    username: 'wojciechtrefon',
    description: '#programming #softwareengineer #vscode #programmerhumor #programmingmemes',
    song: 'help so many people are using my sound - Ezra',
    likes: 5438,
    comments: 238,
    saves: 12,
    shares: 117,
  },
  {
    url: require('./videos/video4.mp4'),
    profilePic: 'https://randomuser.me/api/portraits/men/22.jpg',
    username: 'faruktutkus',
    description: 'Wait for the end | Im RTX 4090 TI | #softwareengineer #softwareengineer #coding #codinglife #codingmemes ',
    song: 'orijinal ses - Computer Science',
    likes: 9689,
    comments: 230,
    saves: 1037,
    shares: 967,
  },
];

function App() {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Drag state
  const dragState = useRef({
    isDragging: false,
    startY: 0,
    currentY: 0,
  });

  useEffect(() => {
    setVideos(videoUrls);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8, // Adjust this value to change the scroll trigger point
    };

    // This function handles the intersection of videos
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const videoElement = entry.target;
          videoElement.play();
          // Update current index based on which video is visible
          const index = videoRefs.current.indexOf(videoElement);
          if (index !== -1) {
            setCurrentIndex(index);
          }
        } else {
          const videoElement = entry.target;
          videoElement.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // We observe each video reference to trigger play/pause
    videoRefs.current.forEach((videoRef) => {
      observer.observe(videoRef);
    });

    // We disconnect the observer when the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, [videos]);

  // This function handles the reference of each video
  const handleVideoRef = (index) => (ref) => {
    videoRefs.current[index] = ref;
  };

  // Navigate to a specific video by index
  const scrollToVideo = (index) => {
    if (index >= 0 && index < videos.length && videoRefs.current[index]) {
      videoRefs.current[index].scrollIntoView({ behavior: 'smooth' });
      setCurrentIndex(index);
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    dragState.current.isDragging = true;
    dragState.current.startY = e.clientY;
    dragState.current.currentY = e.clientY;
    
    // Prevent text selection while dragging
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!dragState.current.isDragging) return;
    dragState.current.currentY = e.clientY;
  };

  const handleMouseUp = () => {
    if (!dragState.current.isDragging) return;
    
    const dragDistance = dragState.current.startY - dragState.current.currentY;
    const threshold = 50; // Minimum drag distance to trigger navigation
    
    if (dragDistance > threshold) {
      // Dragged up - go to next video
      scrollToVideo(currentIndex + 1);
    } else if (dragDistance < -threshold) {
      // Dragged down - go to previous video
      scrollToVideo(currentIndex - 1);
    }
    
    dragState.current.isDragging = false;
  };

  const handleMouseLeave = () => {
    if (dragState.current.isDragging) {
      handleMouseUp();
    }
  };

  // Touch handlers for mobile support
  const handleTouchStart = (e) => {
    dragState.current.isDragging = true;
    dragState.current.startY = e.touches[0].clientY;
    dragState.current.currentY = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (!dragState.current.isDragging) return;
    dragState.current.currentY = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  return (
    <div className="app">
      <div 
        className="container"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: dragState.current.isDragging ? 'grabbing' : 'grab' }}
      >
        <TopNavbar className="top-navbar" />
        {/* Here we map over the videos array and create VideoCard components */}
        {videos.map((video, index) => (
          <VideoCard
            key={index}
            username={video.username}
            description={video.description}
            song={video.song}
            likes={video.likes}
            saves={video.saves}
            comments={video.comments}
            shares={video.shares}
            url={video.url}
            profilePic={video.profilePic}
            setVideoRef={handleVideoRef(index)}
            autoplay={index === 0}
          />
        ))}
        <BottomNavbar className="bottom-navbar" />
      </div>
    </div>
  );
  
}

export default App;
