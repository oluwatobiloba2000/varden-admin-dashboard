import React, { useEffect, useState } from 'react'
import './index.css';
import { useHistory, useParams } from 'react-router';
import TableComponent from '../../component/Table/Table';
import { fetchDistributionCenterProducts, updateDistributionCenterProduct, assignProductApi, deleteDistributionCenterProduct } from '../../api/distributionCenterApi';
import { Tooltip } from '@chakra-ui/tooltip';
import { Button, IconButton } from '@chakra-ui/button';
import { MdCancel } from "react-icons/md";
import { Select } from '@chakra-ui/select';
import { Spinner } from '@chakra-ui/spinner';
import { Box, Image } from "@chakra-ui/react";
import { handleRedirectBeforeLogout } from '../../utils/handleLogout';
import HandleError from '../../component/HandleError';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { useDisclosure } from '@chakra-ui/hooks';
import { useToast } from '@chakra-ui/toast';
import { getProducts } from '../../api/productApi';
import useCustomTransition from '../../customHook/useCustomTransition';

function DistributionCenterProductDetails() {
    // const DistributionState = useSelector(state => state.distributionCenters);
    const { id } = useParams();
    const history = useHistory();
    const [loading, setLoading] = useState();
    const [products, setProducts] = useState();
    const [productError, setProductError] = useState();
    const [productQuantityValue, setProductQuantityValue] = useState();
    const [currentSelectedProducttitle, setCurrentSelectedProduct] = useState();
    const [currentProductId, setCurrentProductId]  = useState();
    const [updateProductLoading, setUpdateProductLoading] = useState(false);
    const [updateProductError, setUpdateProductError] = useState();
    const { isOpen: isOpenQuantityModal, onOpen: onOpenQuantityModal, onClose: onCloseQuantityModal } = useDisclosure()
    
    const { isOpen: isOpenAssignModal, onOpen: onOpenAssignModal, onClose: onCloseAssignModal } = useDisclosure()
    const [assignProductError, setAssignProductError] = useState();
    const [assignProductLoading, setAssignProductLoading] = useState(false);

    const [productsToAssign, setProductsToAssign] = useState();
    const [loadingProductsToAssign, setLoadingProductsToAssign] = useState(false);
    const [ProductsToAssignError, setProductsToAssignError] = useState();
    const [currentProductToAssign, setCurrentProductToAssign] = useState();

    const initialRef = React.useRef()
    const finalRef = React.useRef()
    const toast = useToast();

    const [isOpenDeleteProductModal, setIsOpenDeleteProductModal] = React.useState(false)
    const onCloseDeleteProductModal = () => setIsOpenDeleteProductModal(false)
    const [deleteProductLoading,setDeleteProductLoading] = useState(false);
    const [deleteProductError,setDeleteProductError] = useState(false);
    const [currentProductDeleteId, setCurrentProductDeleteId]= useState(false);
    const cancelRef = React.useRef()

    const transitionClass = useCustomTransition();

    useEffect(() => {
        fetchProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchProducts = async () => {
        setLoading(true);
        setProductError('')
        const data = await fetchDistributionCenterProducts(id);
        if (data.success) {
            setLoading(false);
            setProducts(data.data);
        } else {
            if (data.error && data.error === 'Request failed with status code 401') {
                return handleRedirectBeforeLogout(history)
            }
            setLoading(false);
            setProductError(data.error)
        }
    }

    const updateProductQuantity = async () =>{
        setUpdateProductLoading(true);
        setUpdateProductError('')
        const data = await updateDistributionCenterProduct(id, currentProductId, {count: productQuantityValue});
        if (data.success) {
            const index = products.findIndex((product)=> product.product.id === currentProductId)
            const newProducts = [...products]
            newProducts[index]['count'] = productQuantityValue;
            setProducts(newProducts);
            toast({
                title: 'success',
                description: "Quantity updated successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
            })
            setProductQuantityValue('');
            setUpdateProductLoading(false);
            onCloseQuantityModal();
        } else {
            if (data.error && data.error === 'Request failed with status code 401') {
                return handleRedirectBeforeLogout(history)
            }
            setUpdateProductLoading(false);
            setUpdateProductError(data.error)
        }
    }

    const fetchProductsToAssign = async () =>{
        setLoadingProductsToAssign(true);
        setProductsToAssign([]);
        setProductsToAssignError('');
        setCurrentProductToAssign('');

        const data = await getProducts();
        if(data.success){
            setLoadingProductsToAssign(false);
           setProductsToAssign(data.data);
        }else{
            if(data.error && data.error === 'Request failed with status code 401'){
                return  handleRedirectBeforeLogout(history)
              }
              setLoadingProductsToAssign(false);
              setProductsToAssignError(data.error)
        }
    }

    const assignProduct = async () =>{
        
        if(currentProductToAssign && parseInt(productQuantityValue) >= 0){
            setAssignProductLoading(true);
            setAssignProductError('')
            const data = await assignProductApi(id, currentProductToAssign.id, {count: parseInt(productQuantityValue)});
            if(data.success){
                
                const data = await fetchDistributionCenterProducts(id);
                if (data.success) {
                    setProducts(data.data);
                    setAssignProductLoading(false);
                    onCloseDeleteProductModal();
                    } else {
                        if (data.error && data.error === 'Request failed with status code 401') {
                            return handleRedirectBeforeLogout(history)
                        }

                        setAssignProductLoading(false);
                        onCloseDeleteProductModal();
                        fetchProducts();
                    }

                onCloseAssignModal();

            }else{
                if(data.error && data.error === 'Request failed with status code 401'){
                    return  handleRedirectBeforeLogout(history)
                  }
                  setAssignProductLoading(false);
                  setAssignProductError(data.error)
            }
        }

    }

    const deleteProduct = async () =>{
        if(currentProductDeleteId){
            setDeleteProductLoading(true);
            setDeleteProductError('')
            const data = await deleteDistributionCenterProduct(id, currentProductDeleteId);
            if(data.success){
                const data = await fetchDistributionCenterProducts(id);
                if (data.success) {
                    setProducts(data.data);
                    setDeleteProductLoading(false);
                    onCloseDeleteProductModal();
                    } else {
                        if (data.error && data.error === 'Request failed with status code 401') {
                            return handleRedirectBeforeLogout(history)
                        }
                        onCloseDeleteProductModal();
                        fetchProducts();
                        setDeleteProductLoading(false);
                    }

            }else{
                if(data.error && data.error === 'Request failed with status code 401'){
                    return  handleRedirectBeforeLogout(history)
                  }
                  setDeleteProductLoading(false);
                  setDeleteProductError(data.error)
            }
        }
    }

    const columns = React.useMemo(
        () => [
            {
                Header: "Image",
                accessor: "product.images[0].image_url",
                style: {width: 130},
                Cell: ({value}) =>(
                    <Image
                    borderRadius="full"
                    boxSize="80px"
                    src={value}
                    alt="product image"
                  />
                )
            },
            {
                Header: "Title",
                accessor: "product.title",
            },
            {
                Header: "Count",
                accessor: "count"
            },
            {
                Header: 'Actions',
                accessor: 'id',
                style: { width: '100px' },
                Cell: (props) => (
                    <div style={{
                        // width: '35px',
                        display: 'flex',
                    }}>


                        <Button
                            variant="solid"
                            fontSize="12px"
                            backgroundColor="#2185d0"
                            color="white"
                            height="25px"
                            marginBottom="6px"
                            width="110px"
                            _hover={{
                                backgroundColor: '#2185d0',
                                color: 'white'
                            }}
                            onClick={() => {
                                onOpenQuantityModal()
                                setProductQuantityValue(props.row.original.count)
                                setCurrentSelectedProduct(props.row.original.product.title)
                                setCurrentProductId(props.row.original.product.id)
                            }}
                        >Update Quantity</Button>

                        <Tooltip placement="top" label="Delete" aria-label="delete tooltip" >

                            <IconButton
                                variant="solid"
                                backgroundColor="red"
                                height="25px"
                                fontSize="13px"
                                width="10px"
                                marginLeft="8px"
                                color="white"
                                borderRadius="23px"
                                minWidth="25px"
                                icon={MdCancel()}
                                _hover={{
                                    backgroundColor: 'red',
                                    color: 'white'
                                }}
                                onClick={() => {
                                    setIsOpenDeleteProductModal(true)
                                    setCurrentSelectedProduct(props.row.original.product.title)
                                    setCurrentProductDeleteId(props.row.original.id)
                                }}
                            />
                        </Tooltip>

                    </div>
                )
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    )

    return (
        <div className={transitionClass}>
            <HandleError error={productError} isAsyncFn={true} retryFn={() => fetchProducts(history)} />
            <div className="create_button_container">
                    <button onClick={()=> {onOpenAssignModal()
                                fetchProductsToAssign()
                         }} style={{ width: '190px' }}  className="create_button_style">Assign Product</button>
            </div>

            <TableComponent
               
                isLoading={loading}
                columns={columns}
                data={products || []}
            />

         
            {/* Assign Product modal */}
            <Modal closeOnOverlayClick={false} onClose={onCloseAssignModal} isOpen={isOpenAssignModal}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Assign Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  {assignProductError &&  <HandleError error={assignProductError} isAsyncFn={true} retryFn={assignProduct} />}
                  {productsToAssign && <HandleError error={ProductsToAssignError} isAsyncFn={true} retryFn={() => fetchProductsToAssign(history)} />}
                    {loadingProductsToAssign
                    ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Spinner size="xs" marginRight="5px"  /> Loading products ..</div> 
                    : (productsToAssign 
                        && productsToAssign.length > 0
                      )
                    ? 
                    <>
               
                     <Select placeholder="Select option" value={productsToAssign.id} onChange={(event) => {setCurrentProductToAssign({id: event.target.value,  product_name: event.target.options[event.target.selectedIndex].text, product_img: event.target.options[event.target.selectedIndex].getAttribute('data-img')})}}>
                      {productsToAssign 
                       && productsToAssign.length > 0 
                       && productsToAssign.map((product)=>  <option key={product.id} id={product.id} data-img={product.images[0].image_url} value={product.id}>{product.title}</option>)}
                      </Select> 
                         <FormControl marginTop="5px">
                            <FormLabel>Quantity</FormLabel>
                            <Input type="number" value={productQuantityValue} onChange={(e) => setProductQuantityValue(e.target.value)} placeholder="Quantity" />
                       </FormControl>
                    </>
                    : <div style={{display: 'flex', justifyContent: 'center'}}>
                        <HandleError error={productsToAssign || "No products at the moment"}/>
                        <Button variant="solid" onClick={()=> fetchProductsToAssign()}
                          height="36px"
                           backgroundColor="#dd6b20" color="white">Retry</Button>
                    </div> 
                }
                </ModalBody>

                <ModalFooter>
                   {loadingProductsToAssign 
                   ? <Spinner size="xs" marginRight="21px" /> 
                   : ProductsToAssignError 
                   ? "" 
                   : <Button 
                   onClick={()=> assignProduct()} 
                   isLoading={assignProductLoading} colorScheme="blue" mr={3}>Update</Button>}
                    <Button onClick={onCloseAssignModal}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>


            {/* Update Quantity Modal*/}
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpenQuantityModal}
                onClose={onCloseQuantityModal}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Quantity</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <HandleError error={updateProductError} isAsyncFn={true} retryFn={()=> updateProductQuantity()}/>
                        <FormControl>
                            <FormLabel>Update <b>{currentSelectedProducttitle}</b> Quantity</FormLabel>
                            <Input ref={initialRef} value={productQuantityValue} onChange={(e) => setProductQuantityValue(e.target.value)} placeholder="Quantity" />
                        </FormControl>

                    </ModalBody>

                    <ModalFooter>
                        <Button isLoading={updateProductLoading} loadingText="updating..." onClick={()=> updateProductQuantity()} colorScheme="blue" mr={3}>
                            Update
                         </Button>
                        <Button onClick={onCloseQuantityModal}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* delete product modal */}
            <AlertDialog
                isOpen={isOpenDeleteProductModal}
                leastDestructiveRef={cancelRef}
                onClose={onCloseDeleteProductModal}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Product
                        </AlertDialogHeader>

                        <Box padding="5px">
                            <HandleError error={deleteProductError} isAsyncFn={true} retryFn={()=> deleteProduct()}/>    
                        </Box>

                        <AlertDialogBody>
                            Are you sure you want to delete <b>{currentSelectedProducttitle}</b> product? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onCloseDeleteProductModal}>
                                Cancel
                            </Button>
                            <Button isLoading={deleteProductLoading} colorScheme="red" onClick={()=> deleteProduct()} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </div>
    )
}

export default DistributionCenterProductDetails;
