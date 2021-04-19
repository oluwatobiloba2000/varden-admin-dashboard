// import React from "react";
import axios from "axios";
// // import jwt_decode from "jwt_decode";
// const { publicRuntimeConfig } = getConfig();
// const { API_BASE_URL, EMAIL, PASSWORD } = publicRuntimeConfig;

// const veryToken = async () => {

// }


export const loginApiFn = async (data) => {
  try {
    const res = await axios.post("/login", {
      email: data.email,
      password: data.password,
    });
    return {
     success: true,
      token:  res.data.data.token,
      admin: {
          email: data.email
      }
    };
  } catch (error) {
      let errorMessage = error.response && error.response.data && error.response.data.message === 'Invalid credentials' ? 'Incorrect email or password' : error.message;
      return {success: false, error: errorMessage}
  }
};

// const client_authenticate = async () => {
//   // Router.push('/login')
//   // try {
//   //     const res = await axios.post("https://" + API_BASE_URL + "/api/login", { email: process.env.EMAIL, password: process.env.PASSWORD });
//   //     return (res.data.data.token);
//   // } catch (error) {
//   //     throw new Error("bad request")
//   // }
// };

// const login = async (data) => {
//   try {
//     const res = await axios.post(API_URL + "/api/login", data);
//     return res.data.data.token;
//   } catch (error) {
//     throw new Error("bad request");
//   }
// };