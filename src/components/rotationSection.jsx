import { useState } from "react"
import { useNavigate } from "react-router-dom"

function RotationSection(props){
    const navigate = useNavigate();
    const [angle,setAngle] = useState(45)
    const [source,setSource] = useState(props.base_url + props.frame)
    function handleHome(){
        navigate(0)
    }
    function handleRotation(){
        setSource(props.base_url + "rotation/" + props.frame + "/" + angle)
    }
    function handleAngleChange(event){
        setAngle(event.target.value)
    }
    return(
        <div className="main">
            <div className="controls">
                <div className="inputs">
                    <input type="number" value={angle} onChange={handleAngleChange}/>
                </div>
                <div className="buttons">
                    <button onClick={handleRotation}>Rotation</button>
                    <button onClick={handleHome}>Home</button>
                </div>
            </div>
            <div className="image_container">
                <img className="image" src={source} />            
            </div>
        </div>
    )
}
export default RotationSection