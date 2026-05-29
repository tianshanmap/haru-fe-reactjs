import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Filter2DSectionV1(props){

    const navigate = useNavigate();
    const [frame,setFrame] = useState(props.frame)
    const [r11,setR11] = useState(-1)
    const [r12,setR12] = useState(-1)
    const [r13,setR13] = useState(-1)
    const [r21,setR21] = useState(-1)
    const [r22,setR22] = useState(9)
    const [r23,setR23] = useState(-1)
    const [r31,setR31] = useState(-1)
    const [r32,setR32] = useState(-1)
    const [r33,setR33] = useState(-1)
    const [source,setSource] = useState(props.base_url + props.frame)
    const [url,setUrl] = useState(props.base_url + "filter2DV1")
    function handleHome(){
        navigate(0)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData(event.target); // Gather form data
            const data = Object.fromEntries(formData.entries());
            console.log("Form Submitted:data=", data);
            fetch(props.base_url + "filter2DV1", {
                method: "POST",
                body: formData,
                // headers: {
                //     'Content-Type': 'x-www-form-urlencoded',
                // }
            }).then(response => response.blob()) // Convert response to binary Blob
              .then(buffer => {
                    let blob = new Blob([buffer], { type: "image/jpeg" });
                    console.log("handleSubmit...blob=" + blob);
                    // let imgURL = URL.createObjectURL(blob);
                    const objectURL = URL.createObjectURL(blob); // Create local URL
                    setSource(objectURL); 
              })
        } catch (error) {
            console.error("Submission error:", error);
        }
        return true;
    };    
    function handleR11Change(event){
        setR11(event.target.value)
    }
    function handleR12Change(event){
        setR12(event.target.value)
    }
    function handleR13Change(event){
        setR13(event.target.value)
    }
    function handleR21Change(event){
        setR21(event.target.value)
    }
    function handleR22Change(event){
        setR22(event.target.value)
    }
    function handleR23Change(event){
        setR23(event.target.value)
    }
    function handleR31Change(event){
        setR31(event.target.value)
    }
    function handleR32Change(event){
        setR32(event.target.value)
    }
    function handleR33Change(event){
        setR33(event.target.value)
    }
    return(
        <div className="main">
            <div className="filter2D-content">
                <img className="image" src={source} />            
                <div className="filter2D-right">
                    <form action={url} method="POST" onSubmit={handleSubmit}>
                        <div className="form-filter2D">
                            <div className="matrix-row">
                                <input type="number" value={r11} name="r11" onChange={handleR11Change}/>
                                <input type="number" value={r12} name="r12" onChange={handleR12Change}/>
                                <input type="number" value={r13} name="r13" onChange={handleR13Change}/>
                            </div>
                            <div className="matrix-row">
                                <input type="number" value={r21} name="r21" onChange={handleR21Change} />
                                <input type="number" value={r22} name="r22" onChange={handleR22Change}/>
                                <input type="number" value={r23} name="r23" onChange={handleR23Change}/>
                            </div>
                            <div className="matrix-row">
                                <input type="number" value={r31} name="r31" onChange={handleR31Change}/>
                                <input type="number" value={r32} name="r32" onChange={handleR32Change}/>
                                <input type="number" value={r33} name="r33" onChange={handleR33Change}/>
                            </div>
                            <div className="matrix-row">
                                <button type="submit">Apply</button>
                                <button onClick={handleHome}>Home</button>
                            </div>
                        </div>
                        <input type="hidden" name="frame" value={frame}/>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Filter2DSectionV1