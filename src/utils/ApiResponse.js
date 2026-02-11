// src/api/
import axios from 'axios';

const server = process.env.NEXT_PUBLIC_SERVER || 'http://localhost:5000/api/v1';

export const getApiResponse = async (endPoint) => {
  try {
    // console.log("API Server:", server,endPoint);
    const response = await axios.get(`${server}${endPoint}`);
    return response.data.data;
  } catch (error) {
    console.error("❌ Error in getApiResponse:", error);
    throw new Error("Unable to fetch API response data..!");
  }
};

export const getApiResponseS = async (endPoint, token) => {
  console.log("token from S : ", token)
  try {
    console.log("API Server:", server,endPoint);
    const response = await axios.get(`${server}${endPoint}`, {
    headers: {
      Authorization: `Bearer ${token}`, // <-- Access token
      "Content-Type": "application/json"
    }});
    return response.data.data;
  } catch (error) {
    console.error("Error in getApiResponseS:", error);
    throw new Error("Unable to fetch API response data..!");
  }
};

// src/api/

// ... existing imports and getApiResponse ...

export const postApiResponse = async (endPoint, payload) => {
  try {
    // console.log("Posting to:", server, endPoint, payload);
    
    // axios.post takes the URL first, then the data (payload)
    console.log("Posting payload:",server, endPoint, payload);
    const response = await axios.post(`${server}${endPoint}`, payload);
    console.log("Post response:", response.data);
    
    return response.data.data;
  } catch (error) {
    console.error("Error in postApiResponse:", error);
    
    // It is often better to throw the error.response so your UI knows WHY it failed (e.g., "Email already exists")
    throw error.response ? error.response.data : new Error("Unable to post API data..!");
  }
};
export const postApiResponseS = async (endPoint, payload, token) => {
  try {
    // console.log("Posting to:", server, endPoint, payload);
    
    // axios.post takes the URL first, then the data (payload)
    console.log("Posting payload:",server, endPoint, payload);
    const response = await axios.post(
      `${server}${endPoint}`, 
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );
    console.log("Post response:", response.data);
    
    return response.data.data;
  } catch (error) {
    console.error("Error in postApiResponse:", error);
    
    // It is often better to throw the error.response so your UI knows WHY it failed (e.g., "Email already exists")
    throw error.response ? error.response.data : new Error("Unable to post API data..!");
  }
};


export const patchApiResponseS = async (endPoint, payload, token) => {
    console.log("inside the patch: ", endPoint, payload, token )
  try {
    const response = await axios.patch(
      `${server}${endPoint}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response;
  } catch (error) {
    console.error("❌ Error in updateApiResponseS:", error?.response || error);
    throw new Error("Unable to update API data.");
  }
};