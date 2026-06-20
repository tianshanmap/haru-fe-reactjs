import styles from "./explorer_tree.module.css"

function ExplorerTree({data,list,handleSelection,handleDownload,handleUpload,handleCopy,handleMove,handleDelete,handleView,handleNew}){

  const handleClickView = (event) => {
    handleView(event);  
  }  

  return (
    <table className="explorer_table">
      <thead>
        <tr>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div className={styles.table_td_box}>Current Directory : {data.parent + "/" + data.name}</div>
          </td>
          <td></td>
        </tr>
        <tr>
          <td>
            <div className={styles.table_td_box}>Parent Directory : <a href="#" name={data.parent} onClick={handleSelection}>{data.parent}</a></div>
          </td>
          <td></td>
        </tr>
        {/* 2. Use .map() to loop through the array and return table rows */}
        {list.map((item) => (
          <tr>
            {item.kind === 'folder' && <td><a href="#" name={item.path} onClick={handleSelection}>{item.name}</a></td>}
            {item.kind === 'file' && <td>{item.name}</td>}
            {item.kind === 'folder' && <td>
                                        <button name={item.path} parent={item.parent_path} onClick={handleDownload} className="link-button">Download</button>&nbsp;&nbsp;
                                        <button name={item.path} parent={item.parent_path} onClick={handleUpload} className="link-button">Upload</button>&nbsp;&nbsp;
                                        <button name={item.path} parent={item.parent_path} onClick={handleMove} className="link-button">Move</button>&nbsp;&nbsp;
                                        <button name={item.path} parent={item.parent_path} onClick={handleCopy} className="link-button">Copy</button>&nbsp;&nbsp;
                                        <button name={item.path} parent={item.parent_path} onClick={handleDelete} className="link-button">Delete</button>&nbsp;&nbsp;
                                        <button name={item.path} parent={item.parent_path} onClick={handleNew} className="link-button">New</button>
                                        </td>}
            {item.kind === 'file' && <td>
                                        <button name={item.path} parent={item.parent_path} onClick={handleClickView} className="link-button">View</button>&nbsp;&nbsp;
                                        <button name={item.path} parent={item.parent_path} onClick={handleDownload} className="link-button">Download</button>&nbsp;&nbsp;
                                        <button name={item.path} parent={item.parent_path} onClick={handleMove} className="link-button">Move</button>&nbsp;&nbsp;
                                        <button name={item.path} parent={item.parent_path} onClick={handleCopy} className="link-button">Copy</button>&nbsp;&nbsp;
                                        <button name={item.path} parent={item.parent_path} onClick={handleDelete} className="link-button">Delete</button>
                                        </td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default ExplorerTree;