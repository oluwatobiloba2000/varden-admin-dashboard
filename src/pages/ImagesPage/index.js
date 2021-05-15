/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { AddIcon, CheckIcon } from '@chakra-ui/icons'
import { Box, Button, Container, Flex, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, Tag, TagLabel, TagLeftIcon, Text, Tooltip, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { FilePond, registerPlugin } from "react-filepond";
import dayjs from 'dayjs';
import './index.css';
import Header from '../../component/Header/Header';
import Sidebar from '../../component/SideBar/Sidebar';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { useHistory, useLocation } from 'react-router';
import useCustomTransition from '../../customHook/useCustomTransition';
import { Helmet } from 'react-helmet';

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import { useDispatch, useSelector } from 'react-redux';
import { getProductImagesAsync, getPromoImagesAsync } from '../../app/slice/imageSlice/image';
import Loader from '../../component/Loader';
import {addPromotionImages} from '../../api/imageApi';
import HandleError from '../../component/HandleError';
import { addProductImages } from '../../api/productApi';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function Images() {
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    const text = useColorModeValue('light', 'dark');
    const [transitionClass] = useCustomTransition();
    const [files, setFiles] = useState([]);
    const [category, setCategory] = useState(null);
    const [currentTab, setCurrentTab] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const imageState = useSelector(state => state.image)
    const { isOpen: isOpenUploadModal, onOpen: onOpenUploadModal, onClose: onCloseUploadModal } = useDisclosure()
    // let pond = React.createRef();

    const uploadImage = async () => {
        const formData = new FormData();
        for (let x = 0; x < files.length; x += 1) {
            formData.append(`images[]`, files[x]);
        }
        setError('')

            if (category === 'product') {
                setLoading(true);
                try {
                    const promotionImageResult = await addProductImages(formData);
                    if(promotionImageResult.success){
                        setLoading(false);
                        onCloseUploadModal();
                        setFiles('');
                        setCategory(null)
                        dispatch(getProductImagesAsync(history))
                    }    
                } catch (error) {
                    setLoading(false)
                    setError(error);
                }

            } else if (category === 'promo') {
                setLoading(true);
                
                try {
                    const promotionImageResult = await addPromotionImages(formData);
                    if(promotionImageResult.success){
                        setLoading(false);
                        onCloseUploadModal();
                        setFiles('');
                        setCategory(null)
                        dispatch(getProductImagesAsync(history))
                    }    
                } catch (error) {
                    setLoading(false)
                    setError(error);
                }
            }
            setError('Image category is required')
        
    }


    const fetchProductImages = useCallback(() =>{
        // if(ImageSlice.productImages.length <= 0){
            dispatch(getProductImagesAsync(history))
        // }
    }, [])

    const fetchPromoImages = useCallback(() =>{
        // if(ImageSlice.promoImages){
            dispatch(getPromoImagesAsync(history))
        // }
    }, [])

    const downloadImage = (image_link) =>{
        const element = document.createElement('a');
        const file = new Blob([image_link], {type: 'image/*'})
        element.href = URL.createObjectURL(file);
        element.download = `Image.png`
        element.click();
    } 

    useEffect(() => {
        if(currentTab === 0){
            setError('')
            fetchProductImages();
            setCategory('product')
        }else if(currentTab === 1){
            setError('')
            fetchPromoImages()
            setCategory('promo')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTab])

    return (
        <Container h="100vh" overflow="hidden" maxW="100%" padding="0" width="100%">
            <Helmet>
                <title>Images || varden Admin Dashboard</title>
            </Helmet>
            <Header />
            <Box display="flex" height="93%"
                width="100%" marginTop="50px" h="93%">
                <Sidebar active={location.pathname} />
                <Box w="100%" overflow="auto" p="20px" className={text === 'dark' ? 'dark' : 'light'} backgroundColor={text === 'dark' ? "#222127" : "#e5e5e5"}>

                    <div className={transitionClass}>
                        <h1 className="title_head">
                            Image Gallery
                            </h1>
                        <Box w="100%" className="admin_table_container">
                            <div className="create_button_container">
                                <button className="create_button_style" onClick={onOpenUploadModal}>Upload Image</button>
                            </div>

                            <Tabs onChange={(index)=> setCurrentTab(index)} variant="soft-rounded" colorScheme="green">
                                <TabList>
                                    <Tab className="image_gallery_tab">Products</Tab>
                                    <Tab className="image_gallery_tab">Promos</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel >
                                        <Flex flexWrap="wrap" >
                                            { imageState.product_loading ?  <Loader/>
                                            : imageState.productImages?.map(({image_url, img_public_id, created_at})=>
                                            <Box border="2px solid #1d763c" position="relative"
                                            borderRadius="5px" margin="5px 5px 5px 0" width="100px">
                                                <Image
                                                boxSize="100px"
                                                objectFit="cover"
                                                borderTopLeftRadius="5px"
                                                borderTopRightRadius="5px"
                                                src={image_url}
                                                alt="product image"
                                                />
                                                 <Tooltip label="Download" placement="top" hasArrow>
                                                    <IconButton
                                                        onClick={()=> downloadImage(image_url)}
                                                        position="absolute"
                                                        top="71px"
                                                        right="0"
                                                        height="27px"
                                                        minWidth="27px"
                                                        backgroundColor="green"
                                                        transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                                                        _hover={{ bg: "green", transform: "scale(0.80)" }}
                                                        borderRadius="29px"
                                                        marginRight="4px"
                                                        color="white" aria-label="download" icon={<svg width="20px" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>}/>
                                                </Tooltip>
                                                <Text textAlign="center" fontSize="9px" fontWeight="bold">{dayjs(created_at).format('D MMM YYYY [at] h[:]mm a')}</Text>
                                            </Box>)}
                                        </Flex>
                                    </TabPanel>
                                    <TabPanel>
                                        <Flex flexWrap="wrap">
                                            { imageState.promo_loading ?  <Loader/>
                                                    : imageState.promoImages.length > 0 ? imageState.promoImages.map(({image_url, img_public_id, created_at})=>
                                                    <Box border="2px solid #1d763c"
                                                    borderRadius="5px" margin="5px 5px 5px 0" width="100px">
                                                        <Image
                                                        boxSize="100px"
                                                        objectFit="cover"
                                                        borderTopLeftRadius="5px"
                                                        borderTopRightRadius="5px"
                                                        src={image_url}
                                                        alt="product image"
                                                        />
                                                        <Text textAlign="center" fontSize="9px" fontWeight="bold">{dayjs(created_at).format('D MMM YYYY [at] h[:]mm a')}</Text>
                                                    </Box>): <h2 style={{textAlign: 'center'}}>No Image</h2>}
                                        </Flex>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </Box>
                    </div>
                </Box>
            </Box>


            <Modal isOpen={isOpenUploadModal} onClose={onCloseUploadModal} scrollBehavior="inside">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Upload Image</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                      <HandleError error={error} isAsyncFn={true} retryFn={() => uploadImage()} />
                        <FilePond
                            // ref={(ref) => pond = ref}
                            instantUpload={false}
                            allowImagePreview={true}
                            files={files}
                            allowMultiple={true}
                            // maxFiles={3}
                            
                            accepted-file-types="image/jpeg, image/png"
                            imagePreviewHeight="200"
                            label-idle="Add Images To Your Products"
                            imagePreviewWidth="200"
                            oninit={() => { }}
                            onupdatefiles={(fileItems) => {
                                setFiles(fileItems.map((fileItem) => fileItem.file));
                            }}
                        />
                        <Text marginBottom="5px">Choose Category</Text>

                        <Flex>
                            <Tag cursor="pointer" backgroundColor="#cf3917" color="white" onClick={()=>{
                            category === 'product' ?   setCategory('') : setCategory('product')
                            }} id={category === 'product' && 'selected_tag'} size="lg" colorScheme="red" borderRadius="full">
                                {category === 'product' ? <TagLeftIcon boxSize="12px" as={CheckIcon} />  : <TagLeftIcon boxSize="12px" as={AddIcon} />}
                                <TagLabel>Products</TagLabel>
                            </Tag>

                            <Tag marginLeft="10px" cursor="pointer" backgroundColor="#cf3917" color="white" onClick={()=>{
                            category === 'promo' ?   setCategory('') : setCategory('promo')
                            }} id={category === 'promo' && 'selected_tag'} size="lg" colorScheme="red" borderRadius="full">
                                {category === 'promo' ? <TagLeftIcon boxSize="12px" as={CheckIcon} />  : <TagLeftIcon boxSize="12px" as={AddIcon} />}
                                <TagLabel>Promo</TagLabel>
                            </Tag>
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onCloseUploadModal}>
                            Close
                        </Button>
                        <Button variant="solid" loadingText="Uploading.." isLoading={loading} onClick={() => files.length >= 1 && uploadImage()}>Upload</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Container>
    )
}

export default Images;
