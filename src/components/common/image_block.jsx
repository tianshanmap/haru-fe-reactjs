import { useState } from "react";
import styles from "./image_block.module.css"
import { 
        getViewEndPoint,
        deleteFile
      } from "../api/api_service_8080";

function ImageBlock({name,list,onComplete,onExit}){
  const [currentImage, setCurrentImage] = useState(name);
  const [remoteUrl,setRemoteUrl] = useState(getViewEndPoint(name));
  const [imageList,setImageList] = useState(list);

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
    setRemoteUrl(getViewEndPoint(item));    
  };
  const handleNext = async (event) => {
    let item = nextItem(imageList,currentImage,1);
    setCurrentImage(item);
    setRemoteUrl(getViewEndPoint(item));    
  };
  const handleBack = async (event) => {
    onExit();
  };
  const handleScaleUp = async (event) => {
    document.getElementById("img_container").width = document.getElementById("img_container").width + 100;
  };
  const handleScaleDown = async (event) => {
    document.getElementById("img_container").width = document.getElementById("img_container").width - 100;
  };
  const handleDelete = async (event) => {
    console.log("handleDelete::called");
    let data = await deleteFile(currentImage);
    if (data != null){
      handleNext(event);
      let image_list = data.files.filter(x => x.path.endsWith(".jpg") || x.path.endsWith(".jpeg") || x.path.endsWith(".png")).map(x => x.path);
      setImageList(image_list);
    }
  };
  const handleVideoMaker = async (event) => {
    onComplete();
  }

  return (
    <div>
      <div className={styles.div_image_cmd_container}>
          <button className={styles.action_btn} onClick={handlePrev}>Prev</button>
          <button className={styles.action_btn} onClick={handleNext}>Next</button>
          <button className={styles.action_btn} onClick={handleScaleUp}>+</button>
          <button className={styles.action_btn} onClick={handleScaleDown}>-</button>
          <button className={styles.action_btn} onClick={handleDelete}>Trash</button>
          <button className={styles.action_btn} onClick={handleVideoMaker}>Video</button>
          <button className={styles.action_btn} onClick={handleBack}>Back</button>
      </div>
      <img id="img_container" src={remoteUrl} width="400"></img>

    </div>
  );
}

export default ImageBlock;