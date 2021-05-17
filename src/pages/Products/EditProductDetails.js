import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Flex, Text } from '@chakra-ui/layout';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import Loader from '../../component/Loader';
import { isTokenExpired } from '../../utils/auth';
import useCustomTransition from '../../customHook/useCustomTransition';
import { editProductAsync, getProductByIdAsync } from '../../app/slice/productSlice/product';
import HandleError from '../../component/HandleError';
import { Image } from '@chakra-ui/image';
import { Checkbox } from '@chakra-ui/checkbox';
import { Textarea } from '@chakra-ui/textarea';
import { Button } from '@chakra-ui/button';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToast } from '@chakra-ui/toast';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { getProductImagesAsync } from '../../app/slice/imageSlice/image';
import { useDisclosure } from '@chakra-ui/hooks';
import { assignProductImages, unAssignProductImages } from '../../api/productApi';
import { Spinner } from '@chakra-ui/spinner';

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
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    })

    const productState = useSelector(state => state.products);
    const imageState = useSelector(state => state.image);

    const [transitionClass] = useCustomTransition();
    const [checkboxValue, setCheckBox] = useState();
    const [assignLoading, setAssignLoading] = useState(false);
    const [assignError, setAssignError] = useState('');

    useEffect(() => {
        const TokenExpired = isTokenExpired();

        if (!TokenExpired || TokenExpired !== 'empty token') {
            dispatch(getProductByIdAsync(history, productId))
        }
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (productState.singleProduct) {
            setValue('title', productState.singleProduct.title)
            setValue('unit', productState.singleProduct.unit)
            setValue('description', productState.singleProduct.description)
            setValue('price', productState.singleProduct.price)
            setCheckBox(productState.singleProduct.published)
        }
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productState.singleProduct])

    const handleEditProduct = (data) => {
        dispatch(editProductAsync(history, productId, { ...data, published: checkboxValue }, toast))
    }

    const fetchProductImages = useCallback(() => {
        setAssignError('')
        dispatch(getProductImagesAsync(history))
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const assignProductImage = async (image_id) => {
        setAssignError('')
        setAssignLoading(true);
        const productImage = await assignProductImages(productId, { imageId: image_id });
        if (productImage.success) {
            setAssignLoading(false)
            dispatch(getProductByIdAsync(history, productId))
        } else {
            setAssignLoading(false)
            setAssignError(productImage.error);
        }

    }

    const unAssignProductImage = async (image_id) => {
        setAssignError('')
        setAssignLoading(true);
        const productImage = await unAssignProductImages(productId, image_id);
        if (productImage.success) {
            setAssignLoading(false);
            dispatch(getProductByIdAsync(history, productId))
        } else {
            setAssignLoading(false)
            setAssignError(productImage.error);
        }

    }

    const findImageId = (id)=>  productState.singleProduct.images && productState.singleProduct.images.findIndex((data)=> data.id === id);

    return (

        <Box marginTop="5px" className={transitionClass}>
            <HandleError error={productState.singleProductError} retryFn={() => getProductByIdAsync(history, productId)} />
            {productState.singleProductLoading ? <Loader /> :
                (productState && productState.singleProduct) &&
                <form onSubmit={handleSubmit(handleEditProduct)} style={{ margin: " 30px 0px 0px 0px" }}>
                    <FormControl id="name">
                        <FormLabel>Title</FormLabel>
                        <Input isInvalid={errors.title && errors.title.message ? true : false} {...register("title")} />
                        <Text fontSize="13px" marginTop="1px" marginBottom="10px"
                            marginLeft="4px"
                            color="#E53E3E"
                        >{errors.title && errors.title.message}</Text>
                    </FormControl>

                    <FormControl marginTop="10px" id="email">
                        <FormLabel>Unit</FormLabel>
                        <Input isInvalid={errors.unit && errors.unit.message ? true : false} {...register("unit")} />
                        <Text fontSize="13px" marginTop="1px" marginBottom="10px"
                            marginLeft="4px"
                            color="#E53E3E"
                        >{errors.unit && errors.unit.message}</Text>
                    </FormControl>

                    <FormControl marginTop="10px" id="employeeId">
                        <FormLabel>Description</FormLabel>
                        <Textarea isInvalid={errors.description && errors.description.message ? true : false} {...register("description")} resize="none" minH="150px" />
                        <Text fontSize="13px" marginTop="1px" marginBottom="10px"
                            marginLeft="4px"
                            color="#E53E3E"
                        >{errors.description && errors.description.message}</Text>
                    </FormControl>
                    <Flex flexWrap="wrap">
                        {(productState.singleProduct && productState.singleProduct.images) && productState.singleProduct.images.map(({ image_url }) => {
                            return (<Image
                               marginRight="5px"
                                boxSize="100px"
                                objectFit="cover"
                                src={image_url}
                                alt={productState.singleProduct.title}
                            />)
                        })}
                    </Flex>
                    <FormControl marginTop="10px" id="phone number">
                        <FormLabel>Price</FormLabel>
                        <Input  {...register("price")} isInvalid={errors.price && errors.price.message ? true : false} />
                        <Text fontSize="13px" marginTop="1px" marginBottom="10px"
                            marginLeft="4px"
                            color="#E53E3E"
                        >{errors.price && errors.price.message}</Text>
                    </FormControl>
                    <Checkbox marginTop="5px" onChange={(e) => setCheckBox(!!e.target.checked)} isChecked={checkboxValue} colorScheme="green" >
                        Publish
                     </Checkbox>

                    <Flex marginTop="10px" w="300px" justifyContent="space-between">
                        <Button _hover={{
                            backgroundColor: 'green',
                            color: 'white'
                        }} loadingText="updating..." isLoading={productState.editProductLoading} color="white" backgroundColor="#21ba45" variant="solid" type="submit">
                            Update
                            </Button>
                        <Button color="white" onClick={() => {
                            fetchProductImages()
                            onOpen()
                        }} backgroundColor="#21ba45" variant="solid">
                            Update Image
                            </Button>
                    </Flex>
                </form>

            }

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Product Image</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <Flex flexWrap="wrap" position="relative" >
                            <HandleError error={assignError} />
                            {assignLoading && <Box position="absolute"
                                zIndex="10"
                                display="flex"
                                justifyContent="center"
                                backgroundColor="white"
                                alignItems="center" height="100%" width="100%" opacity="0.5">
                                <Spinner />
                            </Box>}
                            {imageState.product_loading ? <Loader />
                                : imageState.productImages?.map(({ id, image_url }) =>
                                    <Box key={id} border="2px solid #1d763c" position="relative"
                                        borderRadius="5px" margin="5px 5px 5px 0" width="125px">
                                          
                                        <Image
                                            boxSize="122px"
                                            objectFit="cover"
                                            opacity={findImageId(id)>= 0 && 0.5}
                                            borderTopLeftRadius="5px"
                                            borderTopRightRadius="5px"
                                            src={image_url}
                                            alt="product image"
                                        />

                                        
                                        {
                                            findImageId(id) >=0 ? <Button width="88%"
                                                height="30px"
                                                fontSize="12px"
                                                backgroundColor="#e53e3e"
                                                margin="3px 7px"
                                                color="white"
                                                onClick={()=> unAssignProductImage(id)}
                                                _hover={{
                                                    backgroundColor: "#e53e3e"
                                                }}
                                            >Unassign Image</Button>
                                                : <Button width="88%"
                                                    height="30px"
                                                    fontSize="12px"
                                                    backgroundColor="green"
                                                    margin="3px 7px"
                                                    color="white"
                                                    _hover={{
                                                        backgroundColor: "green"
                                                    }}
                                                    onClick={() => assignProductImage(id)}
                                                >Assign Image</Button>
                                            }
                                    </Box>)}
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        {/* <Button variant="ghost">Secondary Action</Button> */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default EditProductDetails;
