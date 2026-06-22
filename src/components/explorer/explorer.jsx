import { useState,useEffect,useCallback } from "react"
import ConfirmationDialog from "../ConfirmationDialog";
import MoveCopyDialog from "../MoveCopyDialog";
import UploadDialog from "../UploadDialog";
import DownloadDialog from "../DownloadDialog";
import CreateDialog from "../CreateDialog";
import ExplorerTree from "./explorer_tree"
import ImageContainer from "./ImageContainer";
import { 
        getDirectory,
        getRoot,
        copy,move,deleteFile, createDirectory,
        getUploadEndPoint,
        getViewEndPoint,
        getDeleteEndPoint,
        getMoveEndPoint,
        getCreateEndPoint,
      } from "../api/api_service_8080";
import { getDownloadEndPoint } from "../api/api_service_8081";

function ExplorerSection(){

    const [current, setCurrent] = useState('/');
    const [parent, setParent] = useState('/');
    const [url, setUrl] = useState("");
    const [data, setData] = useState({});
    const [list, setList] = useState([]);
    const [imageList, setImageList] = useState([]);
    const [error, setError] = useState("");
    const [flow, setFlow] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isMoveDialogOpen, setIsMoveDialogOpen] = useState(false);
    const [isCopyDialogOpen, setIsCopyDialogOpen] = useState(false);
    const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
    const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [targetMoveCopyPath, setTargetMoveCopyPath] = useState("");

    useEffect(() => {
      // 1. Declare the inner async function
      const fetchData = async () => {
        try {
          const result = await getRoot("/");
          setData(result);
          setList(result.files);
          console.log(result.files);
        } catch (err) {
          setError(err.message);
          console.log(err.message);
        }
      };
      // 2. Invoke the function immediately
      fetchData();
    }, []); 

    const handleNavigate = async (name) => {
      console.log("handleNavigate-name=" + name);
      setFlow("");
      setCurrent(name);
      const data = await getDirectory(name);
      setData(data);
      setList(data.files);
    };    
    const handleSelection = async (event) => {
      let name = event.target.getAttribute("name")
      handleNavigate(name);
    };    

    const handleView = (event) => {
      console.log("handleView::start::flow=" + flow);
      var filename = event.target.getAttribute("name");
      var parentname = event.target.getAttribute("parent");
      console.log("handleView::filename=" + filename);
      console.log("handleView::parentname=" + parentname);
      setCurrent(filename);
      setParent(parentname);
      if (filename.endsWith(".mp4")){
        setFlow("video");
      } else if (filename.endsWith(".mp3") || filename.endsWith(".wav")){
        setFlow("audio");
      } else if (current.endsWith(".jpeg") || current.endsWith(".jpg") || current.endsWith(".png")){
        setImageList(list.filter(x => x.path.endsWith(".jpg") || x.path.endsWith(".jpeg") || x.path.endsWith(".png")).map(x => x.path));
        setFlow("image");
      } else if (filename.endsWith(".pdf")){
        setFlow("pdf");
      }
      const filename_encoded = filename.replace(/\+/g, '%2B').replace(/\&/g, '%26');
      setUrl(getViewEndPoint(filename_encoded));        
      console.log("handleView::end::flow=" + flow);
    };
 
    const handleDownload = async (event) => {
        setIsDownloadDialogOpen(true);
        setCurrent(event.target.getAttribute("name"));
        const parentname = event.target.getAttribute("parent");
        const target_url = getDownloadEndPoint(event.target.getAttribute("name")); 
        setUrl(target_url);        
        setMessage("Are you sure to download " + event.target.getAttribute("name") + "?");
        // setFlow("")
        setParent(parentname);
    }
    function handleCopy(event){
        setIsCopyDialogOpen(true);
        setMessage("Are you sure to copy " + event.target.getAttribute("name") + "?");
        setCurrent(event.target.getAttribute("name"));
        var parentname = event.target.getAttribute("parent");
        setParent(parentname);
    }
    function handleUpload(event){
        console.log("handleUpload is called");
        setIsUploadDialogOpen(true);
        setMessage("Are you sure to upload to folder " + event.target.getAttribute("name") + "?");
        setCurrent(event.target.getAttribute("name"));
        var parentname = event.target.getAttribute("parent");
        setUrl(getUploadEndPoint());        
        // setFlow("delete")
        setParent(parentname);
        console.log("handleUpload is completed.");
    }
    function handleMove(event){
        setIsMoveDialogOpen(true);
        setMessage("Are you sure to move " + event.target.getAttribute("name") + "?");
        setCurrent(event.target.getAttribute("name"));
        var parentname = event.target.getAttribute("parent");
        setUrl(getMoveEndPoint(event.target.getAttribute("name"),parentname));        
        // setFlow("delete")
        setParent(parentname);
    }
    function handleNew(event){
        setIsCreateDialogOpen(true);
        setMessage("Are you sure to create a new folder under " + event.target.getAttribute("name") + "?");
        setCurrent(event.target.getAttribute("name"));
        var parentname = event.target.getAttribute("parent");
        setUrl(getCreateEndPoint(event.target.getAttribute("name"),parentname));        
        // setFlow("delete")
        setParent(parentname);
    }
    function handleDelete(event){
        setIsDialogOpen(true);
        setMessage("Are you sure to delete " + event.target.getAttribute("name") + "?");
        setCurrent(event.target.getAttribute("name"));
        var parentname = event.target.getAttribute("parent");
        setUrl(getDeleteEndPoint(event.target.getAttribute("name"),parentname));        
        // setFlow("delete")
        setParent(parentname);
    }
    const handleDeleteDialogConfirm = async () => {
      setIsDialogOpen(false);
      console.log("Action Confirmed! Perform delete logic here.");
      const data = await deleteFile(current,parent);
      setData(data);
      setList(data.files);
    };
    const handleMoveDialogConfirm = async () => {
      setIsMoveDialogOpen(false);
      console.log("handleMoveDialogConfirm::Action Confirmed! Perform move logic here.");
      const data = await move(current,targetMoveCopyPath);
      setData(data);
      setList(data.files);
      setFlow("");
    };
    const handleCopyDialogConfirm = async () => {
      setIsCopyDialogOpen(false);
      console.log("Action Confirmed! Perform copy logic here.");
      const data = await copy(current,targetMoveCopyPath);
      setData(data);
      setList(data.files);
      setFlow("");
    };
    const handleUploadDialogConfirm = async () => {
      setIsUploadDialogOpen(false);
      const data = await getDirectory(current);
      setData(data);
      setList(data.files);
      setFlow("");
    };
    const handleCreateDialogConfirm = async (name) => {
      setIsCreateDialogOpen(false);
      console.log("Action Confirmed! Perform copy logic here.");
      const data = await createDirectory(name,current);
      setData(data);
      setList(data.files);
      setFlow("");
    };

    const handleDialogCancel = () => {
      setIsDialogOpen(false);
      console.log("Action Cancelled.");
    };
    const handleMoveDialogCancel = () => {
      setIsMoveDialogOpen(false);
      console.log("Action Cancelled.");
    };
    const handleCopyDialogCancel = () => {
      setIsCopyDialogOpen(false);
      console.log("Action Cancelled.");
    };
    const handleUploadDialogCancel = () => {
      setIsUploadDialogOpen(false);
      console.log("Action Cancelled.");
    };
    const handleDownloadDialogCancel = () => {
      setIsDownloadDialogOpen(false);
      console.log("Action Cancelled.");
    };
    const handleCreateDialogCancel = () => {
      setIsCreateDialogOpen(false);
      console.log("Action Cancelled.");
    };
    
    const handlePathSelect = async (path) => {
      console.log("handlePathSelect::" + path);
      setTargetMoveCopyPath(path);
      const data = await getDirectory(path);
      const myOptions = data.files
        .filter(item => item.kind === "folder")
        .map(item => ({value: item.path, label: item.path}));      
      myOptions.unshift({value: "/", label: "/"});  
      myOptions.unshift({value: "none", label: "none"});  
      console.log("handlePathSelect::myOptions=" + JSON.stringify(myOptions));  
      return myOptions;
     };
    
    if (flow == "video"){
      console.log("processing video...")
      return (
        <div className="main">
          <a href="#" name={parent} onClick={handleSelection}>Back</a>
          <video width="800" height="600" controls>
            <source src={url} type="video/mp4"/>
          </video>
        </div>  
      )
    } else if (flow == "audio"){
      console.log("processing audio...url=" + url)
      return (
        <div className="main">
          <a href="#" name={parent} onClick={handleSelection}>Back</a>
          <audio src={url} controls>
             Your browser does not support the audio element.
          </audio>
        </div>  
      )
    } else if (flow == "delete"){
      console.log("processing delete...url=" + url)
      let message = "are you sure you want to delete " + current + "?";
      return (
        <div className="main">
          <a href="#" name={parent} onClick={handleSelection}>Back</a>
          <p>{current}</p>
          <ConfirmationDialog 
            isOpen={isDialogOpen} 
            title="Delete a File/Folder" 
            message={message}
            onConfirm={handleDeleteDialogConfirm}
            onCancel={handleDialogCancel}/>
        </div>  
      )
    } else if (flow == "image"){
      console.log("processing image...");
      return (
        <ImageContainer 
          name={current}
          parentName={parent}
          list={imageList}
          onExitAction={handleNavigate}
          />
      )
    } else if (flow == "pdf"){
      console.log("processing pdf...")
      return (
        <div className="main">
          <a href="#" name={parent} onClick={handleSelection}>Back</a>
          <object data={url} type="application/pdf" width="100%" height="700">
              <p>Your browser does not support PDFs. <a href={url}>Download the PDF</a>.</p>
          </object>
        </div>  
      )
    } else {
      return (
        <div className="main">
          <div className="table-container">
            <ExplorerTree 
              data={data}
              list={list}
              handleSelection={handleSelection}
              handleDownload={handleDownload}
              handleUpload={handleUpload}
              handleCopy={handleCopy}
              handleMove={handleMove}
              handleDelete={handleDelete}
              handleNew={handleNew}
              handleView={handleView}
              />
            <ConfirmationDialog 
              isOpen={isDialogOpen} 
              title="Delete a File/Folder" 
              message={message}
              onConfirm={handleDeleteDialogConfirm}
              onCancel={handleDialogCancel}/>
            <MoveCopyDialog 
              isOpen={isMoveDialogOpen} 
              title="Move a File/Folder" 
              message={message}
              onConfirm={handleMoveDialogConfirm}
              onCancel={handleMoveDialogCancel}
              onPathSelect={handlePathSelect}/>
            <MoveCopyDialog 
              isOpen={isCopyDialogOpen} 
              title="Copy a File/Folder" 
              message={message}
              onConfirm={handleCopyDialogConfirm}
              onCancel={handleCopyDialogCancel}
              onPathSelect={handlePathSelect}/>
            <UploadDialog 
              isOpen={isUploadDialogOpen} 
              title="Upload a File" 
              message={message}
              onCancel={handleUploadDialogCancel}
              onConfirm={handleUploadDialogConfirm}
              name={current}
              remote_url={url}
              />
            <DownloadDialog 
              isOpen={isDownloadDialogOpen} 
              title="Download a File/Folder" 
              message={message}
              onCancel={handleDownloadDialogCancel}
              name={current}
              remote_url={url}
              />
            <CreateDialog 
              isOpen={isCreateDialogOpen} 
              title="Create a Folder" 
              message={message}
              onCancel={handleCreateDialogCancel}
              onConfirm={handleCreateDialogConfirm}
              />
          </div>
        </div>
      );
  }
}
export default ExplorerSection