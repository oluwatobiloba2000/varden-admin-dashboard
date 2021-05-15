import axios from "axios";
import { getTokenFromLocalStorage } from "../utils/auth";


export const fetchAllDistributionCenters = async () => {
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

export const fetchDistributionCenterProducts = async (dcsId) => {
    try {
        const { data } = await axios.get(`/dcs/${dcsId}/product`, {
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

export const assignProductApi = async (dcsId, productId, payload) => {
    try {
        const { data } = await axios.post(`/dcs/${dcsId}/product/${productId}`, payload ,{
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

export const updateDistributionCenterProduct = async (dcsId, productId, payload) => {
    try {
        const { data } = await axios.put(`/dcs/${dcsId}/product/${productId}`, 
        payload,
         {
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


export const deleteDistributionCenterProduct = async (dcsId, productId) => {
    try {
        const { data } = await axios.delete(`/dcs/${dcsId}/product/${productId}`, 
         {
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

export const fetchDistributionCenterAttendants = async (dcsId) => {
    try {
        const { data } = await axios.get(`/dcs/${dcsId}/operator`, 
         {
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

export const fetchDistributionCenterDispatchers = async (dcsId) => {
    try {
        const { data } = await axios.get(`/dcs/${dcsId}/dispatcher`, 
         {
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

export const registerDistributionCenterAttendant = async (dcsId, payload) => {
    try {
        const { data } = await axios.post(`/dcs/${dcsId}/operator`, 
         payload,
         {
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

export const assignDispatchRider = async (dcsId, payload) => {
    try {
        const { data } = await axios.post(`/dcs/${dcsId}/assignDispatcher`, 
         payload,
         {
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

export const removeDispatcherApi = async (dcsId, dispatcherId) => {
    try {
        const { data } = await axios.delete(`/dcs/${dcsId}/removeDispatch/${dispatcherId}`, 
         {
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

export const registerDispatcherApi = async (payload) => {
    try {
        const { data } = await axios.post(`/dcs`, 
          payload,
         {
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

export const fetchSingleCenterDetails = async (id) => {
    try {
        const { data } = await axios.get(`/dcs/${id}`, 
         {
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


export const updateDistributionCenter = async (id, payload) => {
    try {
        const { data } = await axios.put(`/dcs/${id}`,payload,
         {
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