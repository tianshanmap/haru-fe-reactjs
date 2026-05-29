import { useState } from "react"

function Rotation(props){
    base_url = props.base_url
    current_frame = props.frame;
    const [source,setSource] = useState(base_url + current_frame)
    function handleRotation(){
        console.log("handle Rotation");
        setSource(base_url + "transform/" + frame)
    }
    return(
        <div className="main">
            <div className="controls">
                <div className="buttons">
                    <button onClick={handleRotation}>Rotation</button>
                </div>
            </div>
            <div className="image_container">
                <img className="image" src={source} />            
            </div>
        </div>
    )
}
