import { useState, useEffect } from 'react';
import styles from "./audio_selector.module.css";

const AudioSelector = ({base_url,onComplete,onExit}) => {
  const [data, setData] = useState({files:[]});
  const [errorMessage, setErrorMessage] = useState("");
  console.log("AudioSelector::about to run useEffect," + base_url);

  useEffect(() => {
    // 1. Declare the async function inside the effect
    const fetchData = async () => {
      try {
        const response = await fetch(base_url + 'video/audio_list');
        const result = await response.json();
        setData(result); // 2. Update state to trigger re-render
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    // 3. Call the function immediately
    console.log("AudioSelector::useEffect is called");
    fetchData();
  }, []); // Empty dependency array ensures this runs only once on mount

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
  }

  const handleContinue = async (event) => {
    if (selected_audio.length === 0) {
        console.log("The list is empty!");
        setErrorMessage("Please choose audio for the video and then click confirm");
        return;
    }
    let request = {
      "audio_files": selected_audio
    };
    console.log("handleContinue::request=" + JSON.stringify(request));
    try {
         let remote_url = "http://localhost:8080/filesystem/audio/generate";
         const response = await fetch(remote_url, {
           method: 'POST', // Explicitly declare POST method
           headers: {
             'Content-Type': 'application/json', // Instruct the server you are sending JSON data
           },
           body: JSON.stringify(request), // Serialize JavaScript object to JSON string
         });

         if (!response.ok) {
           throw new Error('Network response was not ok');
         }

         const data = await response.json(); // Parse the server response
         onComplete(data); 
    } catch (error) {
         console.error('Error:', error);
    }
  }  

  return (
        <div className={styles.audio_profile_container}>
          <div className={styles.div_audio_command}>
            <button onClick={handleContinue}>Continue</button>
            <button onClick={onExit}>Cancel</button> 
          </div>  
          <div className={styles.div_audio_container}>
            <p>{errorMessage}</p>
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
          </div>
          {/* <div className={styles.div_command_container}>
            <label>Video Name:</label>
            <input type="text" name="video_name" value={videoName} onChange={onVideoNameChange}/>
            <button onClick={handleConfirm}>Confirm</button>
          </div> */}
        </div>
    );
};
export default AudioSelector; 