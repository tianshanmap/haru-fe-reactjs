import { useState,useEffect } from "react"

function ExplorerSection(){
    const base_url = "http://localhost:8080/filesystem/"
    const [current, setCurrent] = useState('/');
    const [url, setUrl] = useState(base_url + "folder?name=/");
    const [data, setData] = useState({});
    const [list, setList] = useState([]);
    const [error, setError] = useState("");
    const [flow, setFlow] = useState("");
    const handleSelection = async (event) => {
      console.log("handleSelection");
      setCurrent(event.target.getAttribute("name"));
      var remote_url = base_url + "folder?name=" + event.target.getAttribute("name");        

      // Call remote API when selection changes
      try {
        console.log("handleSelection-calling remote_url=" + remote_url);
        const response = await fetch(remote_url);
        const data = await response.json();
        setData(data);
        setCurrent(event.target.getAttribute("name"));
        setList(data.files);
        console.log("data.files=" + JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };    

    const handleView = (event) => {
      event.preventDefault(); // Stops the page from reloading
      var filename = event.target.getAttribute("name");
      console.log(filename);
      setCurrent(filename);
      if (filename.endsWith(".mp4")){
        setFlow("video");
      } else if (current.endsWith(".jpeg") || current.endsWith(".jpg") || current.endsWith(".png")){
        setFlow("image");
      }
      setUrl(base_url + "view?name=" + filename)        
    };
 
    function onDelete(event){
        setCurrent(event.target.getAttribute("name"));
        setUrl(base_url + "/delete?name=" + current)        
    }
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
          <video width="800" height="600" controls>
            <source src={url} type="video/mp4"/>
          </video>
        </div>  
      )
    } else if (flow == "image"){
      console.log("processing image...")
      return (
        <div className="main">
          <img src={url}></img>
        </div>  
      )
    } else {
      return (
        <div className="main">
          <table border="0" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Current Directory : {data.parent + "/" + data.name}</td>
                <td></td>
              </tr>
              <tr>
                <td><a href="#" name={data.parent} onClick={handleSelection}>{data.parent}</a></td>
                <td></td>
              </tr>
              {/* 2. Use .map() to loop through the array and return table rows */}
              {list.map((item) => (
                <tr>
                  {item.kind === 'folder' && <td><a href="#" name={item.path} onClick={handleSelection}>{item.name}</a></td>}
                  {item.kind === 'file' && <td>{item.name}</td>}
                  {item.kind === 'folder' && <td><button className="link-button">Delete</button></td>}
                  {item.kind === 'file' && <td><button name={item.path} onClick={handleView} className="link-button">View</button>&nbsp;&nbsp;<button className="link-button">Download</button>&nbsp;&nbsp;<button className="link-button">Delete</button></td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}
export default ExplorerSection