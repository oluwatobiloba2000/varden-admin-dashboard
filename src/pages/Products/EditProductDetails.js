import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Flex, Text } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react'
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
import { Button } from '@chakra-ui/button';
// import { useToast } from '@chakra-ui/toast';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
    title: yup.string().required(),
    unit: yup.string().required(),
    description: yup.string().required(),
    price: yup.string().required()
});


function EditProductDetails() {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    // const toast = useToast();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    })
    const productState = useSelector(state => state.products);
    const [transitionClass] = useCustomTransition();

    useEffect(() => {
        const TokenExpired = isTokenExpired();

        if (!TokenExpired || TokenExpired !== 'empty token') {
                dispatch(getProductByIdAsync(history, productId))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(()=>{
        if(productState.singleProduct){
            setValue('title', productState.singleProduct.title)
            setValue('unit', productState.singleProduct.unit)
            setValue('description', productState.singleProduct.description)
            setValue('price', productState.singleProduct.price)
            setValue('published', productState.singleProduct.published)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productState.singleProduct])

    const handleEditProduct = (data) => {
        console.log({data})
        // dispatch(addNewAdminAsync(history, data, toast, reset))
    }

    return (

        <Box marginTop="5px" className={transitionClass}>
            <HandleError error={productState.singleProductError} retryFn={() => getProductByIdAsync(history, productId)} />
            {productState.singleProductLoading ? <Loader /> :
                (productState && productState.singleProduct) &&
                <form onSubmit={handleSubmit(handleEditProduct)} style={{ margin: " 30px 0px 0px 0px" }}>
                    <FormControl id="name">
                        <FormLabel>Title</FormLabel>
                        <Input isInvalid={errors.title && errors.title.message ? true : false} {...register("title")}   />
                        <Text fontSize="13px" marginTop="1px" marginBottom="10px"
                            marginLeft="4px"
                            color="#E53E3E"
                        >{errors.title && errors.title.message}</Text>
                    </FormControl>

                    <FormControl marginTop="10px" id="email">
                        <FormLabel>Unit</FormLabel>
                        <Input isInvalid={errors.unit && errors.unit.message ? true : false} {...register("unit")}  />
                        <Text fontSize="13px" marginTop="1px" marginBottom="10px"
                            marginLeft="4px"
                            color="#E53E3E"
                        >{errors.unit && errors.unit.message}</Text>
                    </FormControl>

                    <FormControl marginTop="10px" id="employeeId">
                        <FormLabel>Description</FormLabel>
                        <Textarea isInvalid={errors.description && errors.description.message ? true : false} {...register("description")} resize="none" minH="150px"  />
                        <Text fontSize="13px" marginTop="1px" marginBottom="10px"
                            marginLeft="4px"
                            color="#E53E3E"
                        >{errors.description && errors.description.message}</Text>
                    </FormControl>
                   {(productState.singleProduct && productState.singleProduct.images) && <Image
                        boxSize="100px"
                        objectFit="cover"
                        src={productState.singleProduct.images[0].image_url}
                        alt={productState.singleProduct.title}
                    />}
                    <FormControl marginTop="10px" id="phone number">
                        <FormLabel>Price</FormLabel>
                        <Input  {...register("price")} isInvalid={errors.price && errors.price.message ? true : false}  />
                        <Text fontSize="13px" marginTop="1px" marginBottom="10px"
                            marginLeft="4px"
                            color="#E53E3E"
                        >{errors.price && errors.price.message}</Text>
                    </FormControl>
                    <Checkbox marginTop="5px" {...register("published")} colorScheme="green" >
                        Publish
                     </Checkbox>

                        <Flex marginTop="10px" w="250px" justifyContent="space-between">
                            <Button color="white" backgroundColor="#21ba45" variant="solid" type="submit">
                                Update
                            </Button>
                            <Button color="white" backgroundColor="#21ba45" variant="solid">
                                Update Image
                            </Button>
                        </Flex>
                </form>

            }
        </Box>
    )
}

export default EditProductDetails;
