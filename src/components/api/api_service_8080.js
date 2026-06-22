const API_BASE_URL_8080 = 'http://tianshan.ca:8080';

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

export function getDirectory(name) {
    return callRemote(API_BASE_URL_8080 + '/filesystem/folder?name=' + name)
}
export function getRoot() {
    return getDirectory("/")
}
export function getAudioList() {
    return callRemote(API_BASE_URL_8080 + '/filesystem/video/audio_list')
}
export function getVideoUploadPath() {
    return callRemote(API_BASE_URL_8080 + '/filesystem/upload_target_path')
}

export function copy(from,to) {
    return callRemote(API_BASE_URL_8080 + '/filesystem/copy?name=' + from + '&parent=' + to);
}
export function move(from,to) {
    return callRemote(API_BASE_URL_8080 + '/filesystem/move?name=' + from + '&parent=' + to);
}
export function deleteFile(name,target="") {
    if (target == "")
        return callRemote(API_BASE_URL_8080 + '/filesystem/delete?name=' + name);
    else 
        return callRemote(API_BASE_URL_8080 + '/filesystem/delete?name=' + name + '&parent=' + target);
}
export function createDirectory(name,target) {
    return callRemote(API_BASE_URL_8080 + '/filesystem/create?name=' + name + '&parent=' + target);
}
export function getUploadEndPoint() {
    return API_BASE_URL_8080 + '/filesystem/upload';
}
export function getViewEndPoint(name) {
    return API_BASE_URL_8080 + '/filesystem/view?name=' + name;
}
export function getDeleteEndPoint(name,parent) {
    return API_BASE_URL_8080 + '/filesystem/delete?name=' + name + "&parent=" + parent;
}
export function getMoveEndPoint(name,parent) {
    return API_BASE_URL_8080 + '/filesystem/move?name=' + name + "&parent=" + parent;
}
export function getCreateEndPoint(name,parent) {
    return API_BASE_URL_8080 + '/filesystem/create?name=' + name + "&parent=" + parent;
}

export function generateVideo(request) {
    const remote_url = API_BASE_URL_8080 + "/filesystem/video/generate/v1";
    const invokeRemote = async () => {
        try {
            const response = await fetch(remote_url, {
                method: 'POST', // Explicitly declare POST method
                headers: {
                    'Content-Type': 'application/json', // Instruct the server you are sending JSON data
                },
                body: JSON.stringify(request), // Serialize JavaScript object to JSON string
            });
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }

            const data = await response.json(); // Parse the server response
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return null;
        }
    }  
    return invokeRemote();
}
