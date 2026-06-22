import { useState } from "react";
import styles from "./ImageContainer.module.css"

function ImageBlock({name,list,base_url,onComplete,onExit}){
  const [currentImage, setCurrentImage] = useState(name);
  const [remoteUrl,setRemoteUrl] = useState(base_url + "view?name=" + name);
  const [imageList,setImageList] = useState(list);

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
    let data = await callRemote(base_url + "delete?name=" + currentImage);
    console.log("handleDelete::data=" + data);
    if (data != null){
      handleNext(event);
      console.log("handleDelete::data.files=" + JSON.stringify(data.files));
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