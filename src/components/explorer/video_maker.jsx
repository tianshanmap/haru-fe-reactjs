import { useState,useEffect } from "react";
import styles from "./video_maker.module.css";
import VideoTree from "./video_tree";
import AudioProfile from "./audio_profile";

function VideoMaker({isOpen,base_url,image_path}){
  console.log("VideoMaker,start");
  const [isAudioOpen,setIsAudioOpen] = useState(false);
  const [isVideoOpen,setIsVideoOpen] = useState(false);
  const [videoFile,setVideoFile] = useState("");

  useEffect(() => {
    // Logic for turning on/off goes here (e.g., after loading)
    setIsVideoOpen(false);
    setIsAudioOpen(true);
  }, []); // Empty dependency array means this runs on mount

  if(!isOpen){
    return null;
  }
  // const handleAudioConfirm = async (event,list) => {
  //   console.log("handleAudioConfirm=list" + list);
  //   let request = {
  //     "video_name": "australia_trip",
  //     "image_path": image_path,
  //     "audio_files": list
  //   };
  //   console.log("handleAudioConfirm::request=" + JSON.stringify(request));
  //   try {
  //        let remote_url = "http://localhost:8080/filesystem/video/generate";
  //        const response = await fetch(remote_url, {
  //          method: 'POST', // Explicitly declare POST method
  //          headers: {
  //            'Content-Type': 'application/json', // Instruct the server you are sending JSON data
  //          },
  //          body: JSON.stringify(request), // Serialize JavaScript object to JSON string
  //        });

  //        if (!response.ok) {
  //          throw new Error('Network response was not ok');
  //        }

  //        const data = await response.json(); // Parse the server response
  //        setVideoFile(data.file);
  //        setIsAudioOpen(false);
  //        setIsVideoOpen(true);
  //        console.log('handleAudioConfirm::Success:', data);
  //        console.log('handleAudioConfirm::isAudioOpen:', isAudioOpen);
  //   } catch (error) {
  //        console.error('Error:', error);
  //   }
  // };
  const handleAudioConfirm = (data) => {
    setVideoFile(data.file);
    setIsAudioOpen(false);
    setIsVideoOpen(true);
    console.log('handleAudioConfirm::isAudioOpen:', isAudioOpen);
    console.log('handleAudioConfirm::isVideoOpen:', isVideoOpen);
  }

  const onTestClick = (event) => {
    setIsAudioOpen(!isAudioOpen);
    setIsVideoOpen(!isVideoOpen);
  }
  console.log("component::VideoMaker::base_url=" + base_url);
  return (
      <div className={styles.video_maker_container}>
        {/* <button onClick={onTestClick}>Test</button> */}
        {/* <AudioProfile isOpen={isVideoOpen} base_url={base_url} image_path={image_path} onComplete={handleAudioConfirm}/> */}
        {/* <AudioTree isOpen={isAudioOpen} base_url={base_url} onComplete={handleAudioConfirm} /> */}
         {isAudioOpen && <AudioProfile isOpen={true} base_url={base_url} image_path={image_path} onComplete={handleAudioConfirm}/>}
         {isVideoOpen && <VideoTree isOpen={true} data={videoFile} base_url={base_url}/>}
      </div>
  );
}

export default VideoMaker;