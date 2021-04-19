import axios from "axios";
import { getTokenFromLocalStorage } from "../utils/auth";


export const fetchAllDistributionCenters = async (limit, offset) => {
    try {
        const { data } = await axios.get("/dcs", {
            headers: {
                Authorization: `Bearer ${getTokenFromLocalStorage()}`,
            },
        });

        return {
            success: true,
            data: data.data
        };

    } catch (error) {
        let errorMessage = error.message;
        return { success: false, error: errorMessage }
    }
};

// export const fetchDistributionCenter = async (dcsId, limit, offset) => {
//   try {
//     const response = await axios.get(`${BASE_API_URL}/${dcsId}`);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return Promise.reject(error);
//   }
// };

// export const fetchDistributionCenterProducts = async (dcsId, limit, offset) => {
//   try {
//     const response = await axios.get(`${BASE_API_URL}/${dcsId}/product`);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return Promise.reject(error);
//   }
// };

// export const fetchDistributionCenterAttendants = async (
//   dcsId,
//   limit,
//   offset
// ) => {
//   try {
//     const response = await axios.get(`${BASE_API_URL}/${dcsId}/operator`);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return Promise.reject(error);
//   }
// };

// export const fetchDistributionCenterDispatchers = async (
//   dcsId,
//   limit,
//   offset
// ) => {
//   try {
//     const response = await axios.get(`${BASE_API_URL}/${dcsId}/dispatcher`);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return Promise.reject(error);
//   }
// };

// export const registerDistributionCenter = async (payload, token) => {
//   try {
//     const response = await axios.post(BASE_API_URL, payload, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       crossDomain: true,
//     });

//     if (response && response.data) {
//       return response.data;
//     }
//   } catch (error) {
//     console.log(error);
//     return Promise.reject(error);
//   }
// };

// export const registerDistributionCenterAttendant = async (
//   dcsId,
//   payload
//   // token
// ) => {
//   try {
//     const response = await axios.post(
//       `${BASE_API_URL}/${dcsId}/operator`,
//       payload,
//       {
//         // headers: {
//         //   Authorization: `Bearer ${token}`,
//         // },
//         crossDomain: true,
//       }
//     );

//     if (response && response.data) {
//       return response.data;
//     }
//   } catch (error) {
//     console.log(error);
//     return Promise.reject(error);
//   }
// };

// export const assignProduct = async (dcsId, productId, payload, token) => {
//   try {
//     const response = await axios.post(
//       `${BASE_API_URL}/${dcsId}/product/${productId}`,
//       payload,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         crossDomain: true,
//       }
//     );

//     if (response && response.data) {
//       return response.data;
//     }
//   } catch (error) {
//     console.log(error);
//     return Promise.reject(error);
//   }
// };

// export const assignDispatcher = async (dcsId, payload, token) => {
//   try {
//     const response = await axios.post(
//       `${BASE_API_URL}/${dcsId}/assignDispatcher`,
//       payload,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         crossDomain: true,
//       }
//     );

//     if (response && response.data) {
//       return response.data;
//     }
//   } catch (error) {
//     console.log(error);
//     return Promise.reject(error);
//   }
// };

// export const updateDistributionCenterDetails = async (
//   dcsId,
//   payload,
//   token
// ) => {
//   try {
//     const response = await axios.put(`${BASE_API_URL}/${dcsId}`, payload, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       crossDomain: true,
//     });

//     if (response && response.data) {
//       return response.data;
//     }
//   } catch (error) {
//     console.log(error);
//     return Promise.reject(error);
//   }
// };

// export const updateDistributionCenterProduct = async (
//   dcsId,
//   productId,
//   payload,
//   token
// ) => {
//   try {
//     const response = await axios.put(
//       `${BASE_API_URL}/${dcsId}/product/${productId}`,
//       payload,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         crossDomain: true,
//       }
//     );

//     if (response && response.data) {
//       return response.data;
//     }
//   } catch (error) {
//     console.log(error);
//     return Promise.reject(error);
//   }
// };

// export const deleteDistributionCenter = async (dcsId, token) => {
//   try {
//     const response = await axios.delete(`${BASE_API_URL}/${dcsId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       crossDomain: true,
//     });

//     if (response && response.data) {
//       return response.data;
//     }
//   } catch (error) {
//     console.log(error);
//     return Promise.reject(error);
//   }
// };

// export const deleteDistributionCenterProductRecord = async (
//   dcsId,
//   recordId,
//   token
// ) => {
//   try {
//     const response = await axios.delete(
//       `${BASE_API_URL}/${dcsId}/product/${recordId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         crossDomain: true,
//       }
//     );

//     if (response && response.data) {
//       return response.data;
//     }
//   } catch (error) {
//     console.log(error);
//     return Promise.reject(error);
//   }
// };

// export const deleteDistributionCenterDispatcher = async (
//   dcsId,
//   dispatchId,
//   token
// ) => {
//   try {
//     const response = await axios.delete(
//       `${BASE_API_URL}/${dcsId}/removeDispatch/${dispatchId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         crossDomain: true,
//       }
//     );

//     if (response && response.data) {
//       return response.data;
//     }
//   } catch (error) {
//     console.log(error);
//     return Promise.reject(error);
//   }
// };