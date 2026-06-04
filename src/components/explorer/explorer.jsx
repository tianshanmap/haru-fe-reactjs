import { useState,useEffect } from "react"
import ConfirmationDialog from "../ConfirmationDialog";
import MoveCopyDialog from "../MoveCopyDialog";

function ExplorerSection(){
    const base_url = "http://localhost:8080/filesystem/"
    const [current, setCurrent] = useState('/');
    const [parent, setParent] = useState('/');
    const [url, setUrl] = useState(base_url + "folder?name=/");
    const [data, setData] = useState({});
    const [list, setList] = useState([]);
    const [error, setError] = useState("");
    const [flow, setFlow] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isMoveDialogOpen, setIsMoveDialogOpen] = useState(false);
    const [isCopyDialogOpen, setIsCopyDialogOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [targetMoveCopyPath, setTargetMoveCopyPath] = useState("");

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
    
    const handleSelection = async (event) => {
      console.log("handleSelection");
      setFlow("");
      setCurrent(event.target.getAttribute("name"));
      var remote_url = base_url + "folder?name=" + event.target.getAttribute("name");        
      const data = await callRemote(remote_url);
      console.log("handleSelection,data=" + data);
      console.log("handleSelection,data=" + JSON.stringify(data));
      setData(data);
      setList(data.files);
    };    

    const handleView = (event) => {
      event.preventDefault(); // Stops the page from reloading
      var filename = event.target.getAttribute("name");
      var parentname = event.target.getAttribute("parent");
      console.log("filename=" + filename);
      console.log("parentname=" + parentname);
      setCurrent(filename);
      setParent(parentname);
      if (filename.endsWith(".mp4")){
        setFlow("video");
      } else if (filename.endsWith(".mp3") || filename.endsWith(".wav")){
        setFlow("audio");
      } else if (current.endsWith(".jpeg") || current.endsWith(".jpg") || current.endsWith(".png")){
        setFlow("image");
      } else if (filename.endsWith(".pdf")){
        setFlow("pdf");
      }
      const filename_encoded = filename.replace(/\+/g, '%2B').replace(/\&/g, '%26');
      const encodedURL = base_url + "view?name=" + filename_encoded;
      console.log("encodedURL=" + encodedURL);
      setUrl(encodedURL);        
    };
 
    function handleDownload(event){
        setIsDialogOpen(true);
        setMessage("Are you sure to delete " + event.target.getAttribute("name") + "?");
        setCurrent(event.target.getAttribute("name"));
        var parentname = event.target.getAttribute("parent");
        setUrl(base_url + "delete?name=" + event.target.getAttribute("name") + "&parent=" + parentname);        
        // setFlow("delete")
        setParent(parentname);
        // callRemote(base_url + "delete?name=" + event.target.getAttribute("name"))
    }
    function handleCopy(event){
        setIsCopyDialogOpen(true);
        setMessage("Are you sure to copy " + event.target.getAttribute("name") + "?");
        setCurrent(event.target.getAttribute("name"));
        var parentname = event.target.getAttribute("parent");
        setUrl(base_url + "delete?name=" + event.target.getAttribute("name") + "&parent=" + parentname);        
        // setFlow("delete")
        setParent(parentname);
        // callRemote(base_url + "delete?name=" + event.target.getAttribute("name"))
    }
    function handleMove(event){
        setIsMoveDialogOpen(true);
        setMessage("Are you sure to move " + event.target.getAttribute("name") + "?");
        setCurrent(event.target.getAttribute("name"));
        var parentname = event.target.getAttribute("parent");
        setUrl(base_url + "move?name=" + event.target.getAttribute("name") + "&parent=" + parentname);        
        // setFlow("delete")
        setParent(parentname);
        // callRemote(base_url + "move?name=" + event.target.getAttribute("name") + "&target=" + )
    }
    function handleDelete(event){
        setIsDialogOpen(true);
        setMessage("Are you sure to delete " + event.target.getAttribute("name") + "?");
        setCurrent(event.target.getAttribute("name"));
        var parentname = event.target.getAttribute("parent");
        setUrl(base_url + "delete?name=" + event.target.getAttribute("name") + "&parent=" + parentname);        
        // setFlow("delete")
        setParent(parentname);
        // callRemote(base_url + "delete?name=" + event.target.getAttribute("name"))
    }
    const handleDialogConfirm = async () => {
      setIsDialogOpen(false);
      console.log("Action Confirmed! Perform delete logic here.");
      const data = await callRemote(url);
      setData(data);
      setList(data.files);
    };
    const handleMoveDialogConfirm = async () => {
      setIsMoveDialogOpen(false);
      console.log("handleMoveDialogConfirm::Action Confirmed! Perform move logic here.");
      let moveUrl = base_url + "move?name=" + current + "&parent=" + targetMoveCopyPath;
      console.log("handleMoveDialogConfirm::moveUrl=" + moveUrl);
      const data = await callRemote(moveUrl);
      setData(data);
      setList(data.files);
      setFlow("");
    };
    const handleCopyDialogConfirm = async () => {
      setIsCopyDialogOpen(false);
      console.log("Action Confirmed! Perform copy logic here.");
      let copyUrl = base_url + "copy?name=" + current + "&parent=" + targetMoveCopyPath;
      console.log("handleCopyDialogConfirm::copyUrl=" + copyUrl);
      const data = await callRemote(copyUrl);
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
    
    const handlePathSelect = async (path) => {
      console.log("handlePathSelect::" + path);
      setTargetMoveCopyPath(path);
      const data = await callRemote(base_url + "folder?name=" + path);
      // let myOptions = [
      //   { value: '/home', label: '/home' },
      //   { value: '/users', label: '/users' },
      //   { value: '/tmp', label: '/tmp' }
      // ];
      const myOptions = data.files
        .filter(item => item.kind === "folder")
        .map(item => ({value: item.path, label: item.path}));      
      myOptions.unshift({value: "/", label: "/"});  
      myOptions.unshift({value: "none", label: "none"});  
      console.log("handlePathSelect::myOptions=" + JSON.stringify(myOptions));  
      return myOptions;
     };

    useEffect(() => {
      // 1. Declare the inner async function
      const fetchData = async () => {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();
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
            onConfirm={handleDialogConfirm}
            onCancel={handleDialogCancel}/>
        </div>  
      )
    } else if (flow == "image"){
      console.log("processing image...")
      return (
        <div className="main">
          <a href="#" name={parent} onClick={handleSelection}>Back</a>
          <img src={url}></img>
        </div>  
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
            <table border="0" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="table-td-box">Current Directory : {data.parent + "/" + data.name}</div>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <div className="table-td-box">Parent Directory : <a href="#" name={data.parent} onClick={handleSelection}>{data.parent}</a></div>
                  </td>
                  <td></td>
                </tr>
                {/* 2. Use .map() to loop through the array and return table rows */}
                {list.map((item) => (
                  <tr>
                    {item.kind === 'folder' && <td><a href="#" name={item.path} onClick={handleSelection}>{item.name}</a></td>}
                    {item.kind === 'file' && <td>{item.name}</td>}
                    {item.kind === 'folder' && <td>
                                                <button name={item.path} parent={item.parent_path} onClick={handleDownload} className="link-button">Download</button>&nbsp;&nbsp;
                                                <button name={item.path} parent={item.parent_path} onClick={handleMove} className="link-button">Move</button>&nbsp;&nbsp;
                                                <button name={item.path} parent={item.parent_path} onClick={handleCopy} className="link-button">Copy</button>&nbsp;&nbsp;
                                                <button name={item.path} parent={item.parent_path} onClick={handleDelete} className="link-button">Delete</button>
                                                </td>}
                    {item.kind === 'file' && <td>
                                                <button name={item.path} parent={item.parent_path} onClick={handleView} className="link-button">View</button>&nbsp;&nbsp;
                                                <button name={item.path} parent={item.parent_path} onClick={handleDownload} className="link-button">Download</button>&nbsp;&nbsp;
                                                <button name={item.path} parent={item.parent_path} onClick={handleMove} className="link-button">Move</button>&nbsp;&nbsp;
                                                <button name={item.path} parent={item.parent_path} onClick={handleCopy} className="link-button">Copy</button>&nbsp;&nbsp;
                                                <button name={item.path} parent={item.parent_path} onClick={handleDelete} className="link-button">Delete</button>
                                                </td>}
                  </tr>
                ))}
              </tbody>
            </table>
            <ConfirmationDialog 
              isOpen={isDialogOpen} 
              title="Delete a File/Folder" 
              message={message}
              onConfirm={handleDialogConfirm}
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
          </div>
        </div>
      );
  }
}
export default ExplorerSection