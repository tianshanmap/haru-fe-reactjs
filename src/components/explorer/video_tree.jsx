import styles from "./audio_tree.module.css";

function VideoTree({data,base_url}){
  console.log("VideoTree-data=" + JSON.stringify(data));
  return (
      <div className={styles.auto_table_container}>
          <video width="80%" height="50%" controls>
              <source src={base_url + "view?name=" + data} type="video/mp4"></source>
          </video>             
      </div>
  );
}

export default VideoTree;