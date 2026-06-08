import { useState } from "react";
import styles from "./ImageContainer.module.css"
import AudioTree from "./audio_tree";
import ImageBlock from "./image_block";

const ImageContainer = ({ name,parentName,list,base_url,onExitAction }) => {

  const [currentImage, setCurrentImage] = useState(name);
  const [remoteUrl,setRemoteUrl] = useState(base_url + "view?name=" + name);
  const [imageList,setImageList] = useState(list);
  const [isAudioOpen,setIsAudioOpen] = useState(false);
  const [isImageOpen,setIsImageOpen] = useState(true);
  const [audioList,setAudioList] = useState({});

  console.log("ImageContainer::name=" + name);  
  console.log("ImageContainer::parent=" + parentName);  
  console.log("ImageContainer::list=" + JSON.stringify(list));  
  console.log("ImageContainer::onExitAction=" + onExitAction);  
  const callRemote = async (remote_url) => {
    try {
      console.log("handleSelection-calling remote_url=" + remote_url);
      const response = await fetch(remote_url);
      const data = await response.json();
      console.log("data.files=" + JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }  
  const nextItem = (list, currentItem,pos) => {
    // Find where the current item sits
    const currentIndex = list.indexOf(currentItem);

    // If the item isn't in the list, return null
    if (currentIndex === -1) return currentItem;

    // Calculate the next position
    const nextIndex = currentIndex + pos;

    // Handle the end of the list boundary
    if (nextIndex >= list.length) {
        return currentItem; // Or return list[0] if you want to loop back
    }
    if (nextIndex < 0){
        return currentItem;
    }
    return list[nextIndex];
  }

  const handlePrev = async (event) => {
    let item = nextItem(imageList,currentImage,-1);
    setCurrentImage(item);
    setRemoteUrl(base_url + "view?name=" + item);    
  };
  const handleNext = async (event) => {
    let item = nextItem(imageList,currentImage,1);
    setCurrentImage(item);
    setRemoteUrl(base_url + "view?name=" + item);    
  };
  const handleBack = async (event) => {
    onExitAction(parentName);
  };
  const handleScaleUp = async (event) => {
    document.getElementById("img_container").width = document.getElementById("img_container").width + 100;
  };
  const handleScaleDown = async (event) => {
    document.getElementById("img_container").width = document.getElementById("img_container").width - 100;
  };
  const handleDelete = async (event) => {
    console.log("handleDelete::called");
    let data = await callRemote(base_url + "delete?name=" + currentImage);
    console.log("handleDelete::data=" + data);
    if (data != null){
      handleNext(event);
      console.log("handleDelete::data.files=" + JSON.stringify(data.files));
      let image_list = data.files.filter(x => x.path.endsWith(".jpg") || x.path.endsWith(".jpeg") || x.path.endsWith(".png")).map(x => x.path);
      setImageList(image_list);
    }
  };
  const handleLoadAudio = async (event) => {
    console.log("handleLoadAudio::called");
    let data = await callRemote(base_url + "video/audio_list");
    console.log("handleLoadAudio::data=" + data);
    if (data != null){
      console.log("handleLoadAudio::data.files=" + JSON.stringify(data.files));
      setAudioList(data);
      setIsAudioOpen(true);
      setIsImageOpen(false);
    }
  }
  const handleAudioConfirm = async (event,list) => {
    console.log("handleAudioConfirm=list" + list);
    setIsAudioOpen(false);
    setIsImageOpen(true);
  }  
  console.log("styles=" + JSON.stringify(styles));
  console.log("styles.div_image_cmd=" + styles.div_image_cmd);
  return (
    <div className="main">
        <div className={styles.div_image_wrapper}>
            <div className={styles.div_image_cmd_container}>
                <button className={styles.action_btn} onClick={handlePrev}>Prev</button>
                <button className={styles.action_btn} onClick={handleNext}>Next</button>
                <button className={styles.action_btn} onClick={handleScaleUp}>+</button>
                <button className={styles.action_btn} onClick={handleScaleDown}>-</button>
                <button className={styles.action_btn} onClick={handleDelete}>Trash</button>
                <button className={styles.action_btn} onClick={handleLoadAudio}>Video</button>
                <button className={styles.action_btn} onClick={handleBack}>Back</button>
            </div>
            <div className={styles.div_image_container}>
              <div className={styles.div_image_container_image}>
                <ImageBlock id="img_container"
                  isOpen={isImageOpen}
                  url={remoteUrl}
                />  
              </div>
              <div className={styles.div_image_container_audio}>
                <AudioTree isOpen={isAudioOpen} data={audioList} base_url={base_url} onComplete={handleAudioConfirm}/>
              </div>
            </div>
        </div>
    </div>  
  );
}
export default ImageContainer;