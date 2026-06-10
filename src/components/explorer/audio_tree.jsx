import { useState,useEffect } from "react";
import styles from "./audio_tree.module.css";

function AudioTree({isOpen,base_url,onComplete}){
  // console.log("AudioTree-started,isOpen=" + isOpen + ",base_url=" + base_url);
  const [data,setData] = useState({});
  console.log("Executing useEffect...");
  useEffect(() => {
    console.log("AudioTree-started,useEffect is called");
    // 1. Declare the inner async function
    const fetchData = async () => {
      try {
        const response = await fetch(base_url + "video/audio_list");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
        console.log(result.files);
      } catch (err) {
        setError(err.message);
        console.log(err.message);
      }
    };
    // 2. Invoke the function immediately
    fetchData();
  }, []); 
  console.log("Executing useEffect...1");
  let selected_audio = [];

  const handleCheckboxChange = (event) => {
    console.log("handleCheckboxChange event=" + event.target.id);
    if (event.target.checked){
      selected_audio.push(event.target.id)
      console.log("handleCheckboxChange total-audio=" + selected_audio);
    } else {
      let _audio = selected_audio.filter(x => x != event.target.id);
      selected_audio.length = 0;
      selected_audio.push(..._audio);      
      console.log("handleCheckboxChange total-audio=" + selected_audio);
    }    
  };
  const handleConfirm = async (event) => {
      console.log("handleConfirm total-audio=" + selected_audio);
      await onComplete(event,selected_audio);
  }
  console.log("start rendering...1");
  return (
      <div className={styles.auto_table_container}>
        <table className={styles.audio_table}>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* 2. Use .map() to loop through the array and return table rows */}
            {data.files.map((item) => (
              <tr>
                <td>{item.name}</td>
                <td>
                  <audio src={base_url + "view?name=" + item.path} controls>
                    Your browser does not support the audio element.
                  </audio>
                </td>
                <td>
                  <input
                    id={item.path}
                    type="checkbox"
                    onChange={handleCheckboxChange}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
  );
}

export default AudioTree;