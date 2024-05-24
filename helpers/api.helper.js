import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL + '/' + import.meta.env.VITE_API_VERSION

const responeFormat = async (respone) => {
  return {
    data: respone.data.data,
    status_text: respone.statusText,
    status: respone.status
  }
}

export const getAllApi = async (path) => {
  const req_url = API_URL + path;
  const respone = await axios.get(req_url);
  // console.log(respone)
  return responeFormat(respone)
}
export const getByIdApi = async (path, id) => {
  const req_url = API_URL + path + "/" + id;
  console.log(req_url)

  const respone = await axios.get(req_url);
  console.log(respone)
  return responeFormat(respone)
}

export const deleteAPI = async (path, id) => {
  const req_url = API_URL + path + "/" + id;
  const respone = await axios.delete(req_url);
  return responeFormat(respone)
}
export const addAPI = async (path, data) => {
  const req_url = API_URL + path;
  const respone = await axios.post(req_url, data);
  console.log(respone)
  return responeFormat(respone)
}

export const updateAPI = async (path, id, data) => {
  const req_url = API_URL + path + "/" + id;
  console.log(req_url)
  const respone = await axios.put(req_url, data,);
  console.log(respone)
  return responeFormat(respone)
}