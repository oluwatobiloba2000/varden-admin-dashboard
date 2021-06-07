import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box } from '@chakra-ui/layout';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import Loader from '../../component/Loader';
import { isTokenExpired } from '../../utils/auth';
import useCustomTransition from '../../customHook/useCustomTransition';
import { getProductByIdAsync } from '../../app/slice/productSlice/product';
import HandleError from '../../component/HandleError';
import { Image } from '@chakra-ui/image';
import { Checkbox } from '@chakra-ui/checkbox';
import { Textarea } from '@chakra-ui/textarea';

function ProductDetails() {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const productState = useSelector(state => state.products);
    const [transitionClass] = useCustomTransition();

    useEffect(() => {
        const TokenExpired = isTokenExpired();

        if (!TokenExpired || TokenExpired !== 'empty token') {
                dispatch(getProductByIdAsync(history, productId))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (

        <Box marginTop="5px" className={transitionClass}>
            <HandleError error={productState.singleProductError} retryFn={() => getProductByIdAsync(history, productId)} />
            {productState.singleProductLoading ? <Loader /> :
                (productState && productState.singleProduct && !productState.singleProductError) &&
                <form style={{ margin: " 30px 0px 0px 0px" }}>
                    <FormControl id="name">
                        <FormLabel>Title</FormLabel>
                        <Input readOnly value={productState.singleProduct.title} />
                    </FormControl>

                    <FormControl marginTop="10px" id="email">
                        <FormLabel>Unit</FormLabel>
                        <Input readOnly value={productState.singleProduct.unit} />
                    </FormControl>

                    <FormControl marginTop="10px" id="employeeId">
                        <FormLabel>Description</FormLabel>
                        <Textarea readOnly value={productState.singleProduct.description} />
                    </FormControl>
                    {productState.singleProduct && productState.singleProduct.images && productState.singleProduct.images.length > 0 && <Image
                        boxSize="100px"
                        objectFit="cover"
                        src={productState.singleProduct.images[0].image_url}
                        alt={productState.singleProduct.title}
                    />}
                    <FormControl marginTop="10px" id="phone number">
                        <FormLabel>Price</FormLabel>
                        <Input readOnly value={productState.singleProduct.price} />
                    </FormControl>
                    <Checkbox marginTop="5px" colorScheme="green" disabled isChecked={productState.singleProduct.published}>
                        Publish
                     </Checkbox>
                </form>

            }
        </Box>
    )
}

export default ProductDetails;
