import { useState,useEffect } from "react";
import styles from "./video_creator_main.module.css"
import ImageBlock from "../common/image_block";
import VideoMaker from "../common/video_maker"
import ChunkedUploader from "../common/file_upload_chunk"


const VideoCreatorMain = ({ base_url }) => {
  const [targetUploadPath,setTargetUploadPath] = useState("");
  const [isFileUploadOpen,setIsFileUploadOpen] = useState(false);
  const [isVideoMakerOpen,setIsVideoMakerOpen] = useState(false);
  const [isImageOpen,setIsImageOpen] = useState(false);
  const [name,setName] = useState("");
  const [parentName,setParentName] = useState("");
  const [list,setList] = useState([]);
  useEffect(() => {
    // 1. Declare the async function inside the effect
    const init = async () => {
      try {
        const response = await fetch(base_url + 'upload_target_path');
        const result = await response.json();
        setTargetUploadPath(result.path); // 2. Update state to trigger re-render
        setIsFileUploadOpen(true);
        setIsImageOpen(false);
        setIsVideoMakerOpen(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    // 3. Call the function immediately
    init();
  }, []); // Empty dependency array ensures this runs only once on mount

  const callRemote = async (remote_url) => {
      try {
        const response = await fetch(remote_url);
        const data = await response.json();
        console.log("data.files=" + JSON.stringify(data));
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
  } 

  const handleOpenVideoMaker = async (event) => {
    console.log("handleOpenVideoMaker::called");
    setIsVideoMakerOpen(true); 
    setIsImageOpen(false);   
  }

  const handleFileUpload = (data) => {
    setIsVideoMakerOpen(false); 
    setIsFileUploadOpen(false); 
    // const data = await callRemote("http://localhost:8081/filesystem/unzip?filename=" + filename + "&target=" + targetUploadPath);
    setName(data.name);
    setList(data.files);
    setParentName(data.targetPath);
    console.log("handleFileUpload------ topPath=" +data.targetPath);
    setIsImageOpen(true);   
  }

  const handleExit = async (event) => {
    setIsFileUploadOpen(true);
    setIsVideoMakerOpen(false); 
    setIsImageOpen(false);   
  }

  // console.log("styles.div_image_cmd=" + styles.div_image_cmd);
  return (
    <div className="main">
        <div className={styles.div_image_wrapper}>
          {isFileUploadOpen &&
              <div className={styles.div_image_container_fileupload}>
                <ChunkedUploader 
                  title="Upload compressed photoes for making video"
                  name={targetUploadPath}
                  base_url="http://localhost:8081/filesystem/"
                  accept_type=".gz,.zip"
                  onComplete={handleFileUpload}
                />  
              </div>
          }
          {isImageOpen && 
              <div className={styles.div_image_container_image}>
                <ImageBlock 
                  name={name}
                  list={list}
                  base_url={base_url}
                  onComplete={handleOpenVideoMaker}
                  onExit={handleExit}
                />  
              </div>
          }
          {isVideoMakerOpen && 
              <div className={styles.div_image_container_audio}>
                <VideoMaker 
                  base_url={base_url} 
                  image_path={parentName}
                  onExit={handleExit}
                />
              </div>
          }          
        </div>
    </div>  
  );
}
export default VideoCreatorMain;