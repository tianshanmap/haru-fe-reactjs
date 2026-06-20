const API_BASE_URL_8081 = 'http://tianshan.ca:8081';

// Reusable request wrapper
const callRemote = async (remote_url) => {
      try {
        const response = await fetch(remote_url);
        const data = await response.json();
        console.log("data.files=" + JSON.stringify(data));
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
}  

export function getDownload(name) {
    return API_BASE_URL_8081 + '/goweb/filesystem/download?name=' + name;
}
