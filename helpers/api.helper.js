import axios from "axios";

export const getAllData = async (apiUrl) => {
  const respone = await axios.get(apiUrl);
  console.log(apiUrl)
  return respone.data
}