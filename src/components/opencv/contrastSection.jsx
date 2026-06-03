import { useState } from "react"
import { useNavigate } from "react-router-dom"

function ContrastSection(props){
    const navigate = useNavigate();
    const [alpha,setAlpha] = useState(2.2)
    const [beta,setBeta] = useState(50)
    const [source,setSource] = useState(props.base_url + props.frame)
    function handleHome(){
        navigate(0)
    }
    function handleContrast(){
        setSource(props.base_url + "contrast/" + props.frame + "/" + alpha + "/" + beta)
    }
    function handleAlphaChange(event){
        setAlpha(event.target.value)
        setSource(props.base_url + "contrast/" + props.frame + "/" + alpha + "/" + beta)
    }
    function handleBetaChange(event){
        setBeta(event.target.value)
        setSource(props.base_url + "contrast/" + props.frame + "/" + alpha + "/" + beta)
    }
    return(
        <div className="main">
            <div className="controls">
                <div className="inputs">
                    <input type="number" value={alpha} onChange={handleAlphaChange}/>
                    <input type="number" value={beta} onChange={handleBetaChange}/>
                </div>
                <div className="buttons">
                    <button onClick={handleContrast}>Change</button>
                    <button onClick={handleHome}>Home</button>
                </div>
            </div>
            <div className="image_container">
                <img className="image" src={source} />            
            </div>
        </div>
    )
}
export default ContrastSection