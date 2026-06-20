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
export function copy(from,to) {
    return callRemote(API_BASE_URL_8080 + '/filesystem/copy?name=' + from + '&parent=' + to);
}
export function move(from,to) {
    return callRemote(API_BASE_URL_8080 + '/filesystem/move?name=' + from + '&parent=' + to);
}
export function deleteFile(name,target) {
    return callRemote(API_BASE_URL_8080 + '/filesystem/delete?name=' + name + '&parent=' + target);
}
export function createDirectory(name,target) {
    return callRemote(API_BASE_URL_8080 + '/filesystem/create?name=' + name + '&parent=' + target);
}
export function getUpload() {
    return API_BASE_URL_8080 + '/filesystem/upload';
}
