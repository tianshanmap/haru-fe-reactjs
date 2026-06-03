import { useState } from "react"
// import Rotation from "./modules/rotation.jsx"
import RotationSection from "./rotationSection.jsx"
import ContrastSection from "./contrastSection.jsx"
import SketchSection from "./sketchSection.jsx"
import DetailEnhanceSection from "./detailSection.jsx"
import EdgeSection from "./edgeSection.jsx"
import Filter2DSection from "./filter2DSection.jsx"
import Filter2DSectionV1 from "./filter2DSectionV1.jsx"
import PlayVideo from "./playVideo.jsx"

function MainSection(){
    const base_url = "http://localhost:8080/image/"
    const video_base_url = "http://localhost:8080/video/"
    const [frame,setFrame] = useState(10)
    const [source,setSource] = useState("")
    const [flow,setFlow] = useState("main")
    function handleFrameChange(event){
        console.log("event.target.value=" + event.target.value);
        setFrame(event.target.value)
    }
    function handleLoad(){
        console.log("handle load");
        setSource(base_url + frame)
    }
    function handlePlay(){
        console.log("handle Rotation...");
        // setSource(base_url + "transform/" + frame)
        setFlow("play");
    }
    function handleRotation(){
        console.log("handle Rotation...");
        // setSource(base_url + "transform/" + frame)
        setFlow("rotation");
    }
    function handleFilter2D(){
        console.log("handle filter2D");
        setFlow("filter2D");
    }
    function handleFilter2DV1(){
        console.log("handle filter2D");
        setFlow("filter2DV1");
    }
    function handleGrey(){
        console.log("handle Grey");
        setSource(base_url + "grey/" + frame)
    }
    function handleBlur(){
        console.log("handle blur");
        setSource(base_url + "blur/" + frame)
    }
    function handleGaussinBlur(){
        console.log("gaussinhandle blur");
        setSource(base_url + "gaussinblur/" + frame)
    }
    function handleMedianBlur(){
        console.log("median blur");
        setSource(base_url + "medianblur/" + frame)
    }
    function handleFlipV(){
        console.log("handle flip");
        setSource(base_url + "flip_v/" + frame)
    }
    function handleFlipH(){
        console.log("handle flip");
        setSource(base_url + "flip_h/" + frame)
    }
    function handleNormalize(){
        console.log("handle norm");
        setSource(base_url + "normalize/" + frame)
    }
    function handleContrast(){
        console.log("handle Contrast...");
        // setSource(base_url + "transform/" + frame)
        setFlow("contrast");
    }
    function handleBilateral(){
        console.log("handle bilateral");
        setSource(base_url + "bilateral/" + frame)
    }
    function handleStyle(){
        console.log("handle style");
        setSource(base_url + "style/" + frame)
    }
    function handleSketch(){
        console.log("handle sketch");
        // setSource(base_url + "sketch/" + frame)
        setFlow("sketch");
    }
    function handleDetailEnhance(){
        console.log("handle sketch");
        // setSource(base_url + "detailEnhance/" + frame)
        setFlow("detailEnhance");
    }
    function handleEdgePreserving(){
        console.log("handle sketch");
        setFlow("edge");
        // setSource(base_url + "edgePreserving/" + frame)
    }
    function handleVideo(){
        console.log("handle video");
        setSource(video_base_url + "save")
    }
    if (flow == "main"){
        return(
            <div className="main">
                <div className="controls">
                    <div className="inputs">
                        <input type="number" value={frame} onChange={handleFrameChange}/>
                    </div>
                    <div className="buttons">
                        <button onClick={handleLoad}>Load</button>
                        <button onClick={handlePlay}>Play Video</button>
                        <button onClick={handleRotation}>Rotation</button>
                        <button onClick={handleGrey}>Grey</button>
                        <button onClick={handleBlur}>Blur</button>
                        <button onClick={handleGaussinBlur}>Gaussin Blur</button>
                        <button onClick={handleMedianBlur}>Median Blur</button>
                        <button onClick={handleBilateral}>Bilateral Filter</button>
                        <button onClick={handleFlipV}>Vertical Flip </button>
                        <button onClick={handleFlipH}>Horizental Flip </button>
                        <button onClick={handleNormalize}>Normalize</button>
                        <button onClick={handleContrast}>Contrast</button>
                        <button onClick={handleFilter2D}>filter2D</button>
                        <button onClick={handleFilter2DV1}>filter2DV1</button>
                        <button onClick={handleStyle}>Style</button>
                        <button onClick={handleSketch}>Sketch</button>
                        <button onClick={handleDetailEnhance}>Detail Enhance</button>
                        <button onClick={handleEdgePreserving}>Edge Preserving</button>
                        <button onClick={handleVideo}>Save Video</button>
                    </div>
                </div>
                <div className="image_container">
                    <img className="image" src={source} />            
                </div>
            </div>
        )
    } else if (flow == "rotation"){
        console.log("rotation>>>>>>>>>>>>>>>>>>>>>>")
        return( 
            <RotationSection base_url={base_url} frame={frame} /> 
        )    
    } else if (flow == "contrast"){
        console.log("contrast>>>>>>>>>>>>>>>>>>>>>>")
        return( 
            <ContrastSection base_url={base_url} frame={frame} /> 
        )    
    } else if (flow == "sketch"){
        console.log("sketch>>>>>>>>>>>>>>>>>>>>>>")
        return( 
            <SketchSection base_url={base_url} frame={frame} /> 
        )    
    } else if (flow == "detailEnhance"){
        console.log("sketch>>>>>>>>>>>>>>>>>>>>>>")
        return( 
            <DetailEnhanceSection base_url={base_url} frame={frame} /> 
        )    
    } else if (flow == "edge"){
        console.log("edge>>>>>>>>>>>>>>>>>>>>>>")
        return( 
            <EdgeSection base_url={base_url} frame={frame} /> 
        )    
    } else if (flow == "filter2D"){
        console.log("filter2D>>>>>>>>>>>>>>>>>>>>>>")
        return( 
            <Filter2DSection base_url={base_url} frame={frame} /> 
        )    
    } else if (flow == "filter2DV1"){
        console.log("filter2D>>>>>>>>>>>>>>>>>>>>>>")
        return( 
            <Filter2DSectionV1 base_url={base_url} frame={frame} /> 
        )    
    } else if (flow == "play"){
        console.log("filter2D>>>>>>>>>>>>>>>>>>>>>>")
        return( 
            <PlayVideo base_url={base_url} /> 
        )    
    } else {
        return (
            <div>
                Not Supported.
            </div>
        )
    }
}
export default MainSection