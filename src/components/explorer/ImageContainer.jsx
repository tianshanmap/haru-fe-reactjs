import { useState } from "react";

const ImageContainer = ({ name,parentName,list,base_url,onExitAction }) => {

  const [currentImage, setCurrentImage] = useState(name);
  const [remoteUrl,setRemoteUrl] = useState(base_url + "view?name=" + name);
  console.log("ImageContainer::name=" + name);  
  console.log("ImageContainer::parent=" + parentName);  
  console.log("ImageContainer::list=" + JSON.stringify(list));  
  console.log("ImageContainer::onExitAction=" + onExitAction);  
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
    let item = nextItem(list,currentImage,-1);
    setCurrentImage(item);
    setRemoteUrl(base_url + "view?name=" + item);    
  };
  const handleNext = async (event) => {
    let item = nextItem(list,currentImage,1);
    setCurrentImage(item);
    setRemoteUrl(base_url + "view?name=" + item);    
  };
  const handleBack = async (event) => {
    onExitAction(parentName);
  };

  return (
    <div className="main">
        <a href="#" onClick={handlePrev}>Prev</a>
        <a href="#" onClick={handleNext}>Next</a>
        <a href="#" onClick={handleBack}>Back</a>
        <img src={remoteUrl} width="50%" height="50%"></img>
    </div>  
  );
}
export default ImageContainer;