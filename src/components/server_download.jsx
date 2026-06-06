const ServerDownload = ({name,remote_url }) => {
  console.log("ServerDownload::name=" + name);
  console.log("ServerDownload::remote_url=" + remote_url);
  const handleDownload = async () => {
    try {
      const response = await fetch(remote_url);
 

      if (!response.ok) throw new Error('Download failed');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary link and trigger the click event
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', name); // Specify the file name
      document.body.appendChild(link);
      link.click();
      // Clean up the DOM and URL
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  return (
    <div>
      <button onClick={handleDownload}>
        Remotely Download {name}...
      </button>
    </div>
  );
};
export default ServerDownload;