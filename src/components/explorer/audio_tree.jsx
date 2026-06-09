import styles from "./audio_tree.module.css";

function AudioTree({isOpen,data,base_url,onComplete}){
  console.log("AudioTree,handleSelection=");
  let selected_audio = [];
  if(!isOpen){
    return null;
  }
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