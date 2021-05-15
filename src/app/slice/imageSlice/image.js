import { createSlice } from '@reduxjs/toolkit'
import { getPromotionImages } from '../../../api/imageApi';
import { getProductImages } from '../../../api/productApi';
import { handleRedirectBeforeLogout } from '../../../utils/handleLogout';

export const ImageSlice = createSlice({
    name: 'Images',
    initialState: {
        productImages: [],
        promoImages: [],
        product_loading: false,
        product_error: '',
        promo_loading: false,
        promo_error: '',
    },
    reducers: {
        add_product_image: (state, action) => {
            state.productImages = action.payload;
        },
        add_promo_image: (state, action) => {
            state.promoImages = action.payload;
        },
        set_promo_loading: (state, action) => {
            state.promo_loading = action.payload
        },
        set_promo_error: (state, action) => {
            state.promo_error = action.payload
        },
        set_product_loading: (state, action) => {
            state.product_loading = action.payload
        },
        set_product_error: (state, action) => {
            state.product_error = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const {set_promo_error, set_promo_loading, add_product_image, add_promo_image, set_product_loading, set_product_error } = ImageSlice.actions

export default ImageSlice.reducer;

export const getProductImagesAsync = (history) => async (dispatch) => {
    dispatch(set_product_loading(true))
    dispatch(set_product_error(''))
    const getProductImagesApi = await getProductImages();
    console.log("🚀 ~ file: image.js ~ line 46 ~ getProductImagesAsync ~ getProductImagesApi", getProductImagesApi)
    if (getProductImagesApi.success) {
        dispatch(set_product_loading(false))
        dispatch(add_product_image(getProductImagesApi.data))
    } else {
        if (getProductImagesApi.product_error && getProductImagesApi.product_error === 'Request failed with status code 401') {
            return handleRedirectBeforeLogout(history)
        }
        dispatch(set_product_loading(false))
        dispatch(set_product_error(getProductImagesApi.product_error))
    }
}


export const getPromoImagesAsync = (history) => async (dispatch) => {
    dispatch(set_promo_loading(true))
    dispatch(set_promo_error(''))
    const getPromoImagesApi = await getPromotionImages();
    if (getPromoImagesApi.success) {
        dispatch(set_promo_loading(false))
        dispatch(add_promo_image(getPromoImagesApi.data))
    } else {
        if (getPromoImagesApi.product_error && getPromoImagesApi.product_error === 'Request failed with status code 401') {
            return handleRedirectBeforeLogout(history)
        }
        dispatch(set_promo_loading(false))
        dispatch(set_promo_error(getPromoImagesApi.product_error))
    }
}
