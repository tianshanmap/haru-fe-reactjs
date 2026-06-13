import { useState } from "react";
import styles from "./video_tree.module.css";

function VideoNameSelector({onComplete}){
  const [videoName,setVideoName] = useState("Give a name for your video");
  // let videoName = "Give a name";

  const onContinue = (event) => {
    console.log("onContinue,videoName=" + videoName);
    onComplete(videoName);
  }

  return (
      <div className={styles.video_profile_container}>
          <label>Final Video Name</label>
          <input 
            type="text" 
            value={videoName} 
            onChange={(e) => setVideoName(e.target.value)} // Updates state on typing
          />
          {/* <input type="text" name="video_name" value={videoName} onChange={onVideoNameChange}/> */}
          <button onClick={onContinue}>Continue</button> 
      </div>
  );
}

export default VideoNameSelector;