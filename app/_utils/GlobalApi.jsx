const { default: axios } = require("axios");

import { encrypt, setCookies, logout, getSession } from "./lib";

const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;
// const baseURL = `http://localhost:1337/api`;
const baseURL =  "https://next-appoint-strapi-backend.onrender.com/api"; 

const axiosClient = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

const login = async (data) => {
  try {
    const response = await axiosClient.post("/auth/local", data);
    // console.log(response);

    const { jwt } = response.data;

    const user = await getCurrentUser(jwt);
    const { username, email } = user;

    const { identifier } = data;
    const expires = new Date(Date.now() + 10 * 60 * 1000); //10 minutes
    const session = await encrypt({ jwt, user, expires });

    // console.log("SESSION VALUE FROM GLOBAL-API : ", session);

    await setCookies(session, expires);

    return { success: true, data: response.data };
  } catch (errorRes) {
    console.log(
      "An error occurred during login:",
      errorRes.response.data.error.message
    );
    return { success: false, error: errorRes.response.data.error.message || "Oops! Some error occured in logging in." };
  }
};

const logoutAPI = async () => {
  try {
    // Clear session cookies or tokens
    await logout();
    return { success: true };
  } catch (error) {
    console.log("An error occurred during logout:", error);
    return { success: false, error: "Failed to logout. Please try again." };
  }
};

const signup = async (data) => {
  try {
    const res = await axiosClient.post("/auth/local/register", data);
    const { jwt, user } = res.data;
    const expires = new Date(Date.now() + 10 * 60 * 1000); //10 minutes
    const session = await encrypt({ jwt, user, expires });

    await setCookies(session, expires);

    return { success: true, data: res.data };
  } catch (errorRes) {
    console.log("An error occurred during login:", errorRes.response.data.error.message);
    return { success: false, error: errorRes.response.data.error.message || "Oops! Some error occured." };
  }
};

const getCurrentUser = async (jwt) => {
  try {
    const res = await axios.get(`${baseURL}/users/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return { success: true, data: res.data };
  } catch (error) {
    console.error("Error fetching the current user", error);
    return {
      success: false,
      error: `Error fetching the current user ${error.error.message}`,
    };
  }
};

const getCategory = () => axiosClient.get("/categories?populate=*");

const getDoctorList = () => axiosClient.get("/doctors?populate=*");

const getDoctorByCategory = (category) =>
  axiosClient.get(
    "/doctors?filters[categories][name][$in]=" + category + "&populate=*"
  );

const getDoctorById = (id) => axiosClient.get("/doctors/" + id + "?populate=*");

const bookAppointment = (data) => axiosClient.post("appointments", data);

const getUserBookingList = (userEmail) =>
  axiosClient.get(
    "/appointments?[filters][Email][$eq]=" +
      userEmail +
      "&populate[doctor][populate][image][populate][0]=url&populate=*"
  );

const deleteBooking = (id) => axiosClient.delete("/appointments/" + id);

const api = {
  login,
  logoutAPI,
  signup,
  getCategory,
  getDoctorList,
  getDoctorByCategory,
  getDoctorById,
  bookAppointment,
  getUserBookingList,
  deleteBooking,
};

export default api;
