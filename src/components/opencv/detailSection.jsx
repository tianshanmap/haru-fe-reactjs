import { useState } from "react"
import { useNavigate } from "react-router-dom"

function DetailSection(props){
    const navigate = useNavigate();
    const [sigmaS,setSigmaS] = useState(10)
    const [sigmaR,setSigmaR] = useState(0.15)
    const [source,setSource] = useState(props.base_url + props.frame)
    function handleHome(){
        navigate(0)
    }
    function handleApply(){
        setSource(props.base_url + "detailEnhance/" + props.frame + "/" + sigmaS + "/" + sigmaR)
    }
    function handleSigmaSChange(event){
        setSigmaS(event.target.value)
        setSource(props.base_url + "detailEnhance/" + props.frame + "/" + sigmaS + "/" + sigmaR)
    }
    function handleSigmaRChange(event){
        setSigmaR(event.target.value)
        setSource(props.base_url + "detailEnhance/" + props.frame + "/" + sigmaS + "/" + sigmaR)
    }
    return(
        <div className="main">
            <div className="controls">
                <div className="inputs">
                    <input type="number" value={sigmaS} onChange={handleSigmaSChange}/>
                    <input type="number" value={sigmaR} onChange={handleSigmaRChange}/>
                </div>
                <div className="buttons">
                    <button onClick={handleApply}>Apply</button>
                    <button onClick={handleHome}>Home</button>
                </div>
            </div>
            <div className="image_container">
                <img className="image" src={source} />            
            </div>
        </div>
    )
}
export default DetailSection