import styles from "./video_tree.module.css";

function VideoTree({data,base_url}){
  console.log("VideoTree-data=" + JSON.stringify(data));
  return (
      <div className={styles.video_profile_container}>
          <video width="1000" controls>
              <source src={base_url + "view?name=" + data} type="video/mp4"></source>
          </video>             
      </div>
  );
}

export default VideoTree;