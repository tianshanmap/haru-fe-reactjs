import { useNavigate } from "react-router-dom"

function PlayVideo(props){

    const navigate = useNavigate();
    function handleHome(){
        navigate(0)
    }

    return(
        <div className="main">
            <div className="video-container">
                <button onClick={handleHome}>Home</button>
                <video width="80%" height="50%" controls>
                    <source src={props.base_url + "video/play" } type="video/mp4"></source>
                </video>             
            </div>
        </div>
    )
}
export default PlayVideo