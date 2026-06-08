function ImageBlock({id,isOpen,url}){
  console.log("ImageBlock,handleSelection=");
  if(!isOpen){
    return null;
  }

  return (
      <img id={id} src={url} width="400"></img>
  );
}

export default ImageBlock;