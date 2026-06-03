import { useState } from "react"
import { useNavigate } from "react-router-dom"

function SketchSection(props){
    const navigate = useNavigate();
    const [sigmaS,setSigmaS] = useState(60)
    const [sigmaR,setSigmaR] = useState(0.02)
    const [shade,setShade] = useState(0.02)
    const [greySource,setGreySource] = useState(props.base_url + props.frame)
    const [colorSource,setColorSource] = useState(props.base_url + props.frame)
    function handleHome(){
        navigate(0)
    }
    function handleApply(){
        setGreySource(props.base_url + "sketchGrey/" + props.frame + "/" + sigmaS + "/" + sigmaR + "/" + shade)
        setColorSource(props.base_url + "sketchColor/" + props.frame + "/" + sigmaS + "/" + sigmaR + "/" + shade)
    }
    function handleSigmaSChange(event){
        setSigmaS(event.target.value)
        // setSource(props.base_url + "sketch/" + props.frame + "/" + sigmaS + "/" + sigmaR + "/" + shade)
    }
    function handleSigmaRChange(event){
        setSigmaR(event.target.value)
        // setSource(props.base_url + "sketch/" + props.frame + "/" + sigmaS + "/" + sigmaR + "/" + shade)
    }
    function handleShadeChange(event){
        setShade(event.target.value)
        // setSource(props.base_url + "sketch/" + props.frame + "/" + sigmaS + "/" + sigmaR + "/" + shade)
    }
    return(
        <div className="main">
            <div className="controls">
                <div className="inputs">
                    <input type="number" value={sigmaS} onChange={handleSigmaSChange}/>
                    <input type="number" value={sigmaR} onChange={handleSigmaRChange}/>
                    <input type="number" value={shade} onChange={handleShadeChange}/>
                </div>
                <div className="buttons">
                    <button onClick={handleApply}>Apply</button>
                    <button onClick={handleHome}>Home</button>
                </div>
            </div>
            <div className="image_container">
                <img className="image" src={greySource} />            
                <img className="image" src={colorSource} />            
            </div>
        </div>
    )
}
export default SketchSection