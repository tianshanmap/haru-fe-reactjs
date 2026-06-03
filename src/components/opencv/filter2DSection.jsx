import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Filter2DSection(props){

    const navigate = useNavigate();
    const [frame,setFrame] = useState(props.frame)
    const [row1,setRow1] = useState("-1,-1,-1")
    const [row2,setRow2] = useState("-1,9,-1")
    const [row3,setRow3] = useState("-1,-1,-1")
    const [source,setSource] = useState(props.base_url + props.frame)
    const [url,setUrl] = useState(props.base_url + "filter2D")
    function handleHome(){
        navigate(0)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log("handleSubmit...");
            const formData = new FormData(event.target); // Gather form data
            console.log("handleSubmit...formData-row1=" + formData.get("row1"));
            console.log("handleSubmit...formData-row2=" + formData.get("row2"));
            const data = Object.fromEntries(formData.entries());
            console.log("Form Submitted:data=", data);
            fetch(props.base_url + "filter2D", {
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
            
            // const response = await fetch(props.base_url + "filter2D", {
            //     method: "POST",
            //     body: formData,
            // });

            // Option B: Response returns the image file itself (Blob)
            // const blob = await response.blob();
            // console.log("blob=" + blob)
            // const objectURL = URL.createObjectURL(blob);
            // setSource(objectURL); 
        /* 
        */
        } catch (error) {
            console.error("Submission error:", error);
        }
        return true;
    };    
    function handleRow1Change(event){
        setRow1(event.target.value)
    }
    function handleRow2Change(event){
        setRow2(event.target.value)
    }
    function handleRow3Change(event){
        setRow3(event.target.value)
    }
    return(
        <div className="main">
            <form action={url} method="POST" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="row1">Row1</label>
                    <input id="row1" type="text" value={row1} name="row1" onChange={handleRow1Change}/>
                </div>
                <div>
                    <label htmlFor="row2">Row2</label>
                    <input id="row2" type="text" value={row2} name="row2" onChange={handleRow2Change}/>
                </div>
                <div>
                    <label htmlFor="row3">Row3</label>
                    <input id="row3" type="text" value={row3} name="row3" onChange={handleRow3Change}/>
                </div>
                <input type="hidden" name="frame" value={frame}/>
                <button type="submit">Apply</button>
                <button onClick={handleHome}>Home</button>
            </form>
            <div className="image_container">
                <img className="image" src={source} />            
            </div>
        </div>
    )
}
export default Filter2DSection