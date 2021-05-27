import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Flex, Text } from '@chakra-ui/layout';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import useCustomTransition from '../../customHook/useCustomTransition';
import { Checkbox } from '@chakra-ui/checkbox';
import { Textarea } from '@chakra-ui/textarea';
import { Button } from '@chakra-ui/button';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToast } from '@chakra-ui/toast';
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import { getProductAsync } from '../../app/slice/productSlice/product';
import { addProductApi } from '../../api/productApi';
import { Select } from '@chakra-ui/select';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const schema = yup.object().shape({
    title: yup.string().required(),
    unit: yup.string().required(),
    description: yup.string().required(),
    price: yup.string().required()
});


function AddProductDetails() {
    const dispatch = useDispatch();
    const toast = useToast();
    const [files, setFiles] = useState([]);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })

    const [transitionClass] = useCustomTransition();
    const [checkboxValue, setCheckBox] = useState();
    const [categoryValue, setCategory] = useState();
    const [loading, setLoading] = useState(false);

    const handleAddProduct = async (data)=>{
       if(!categoryValue){
           return
       }
       
        setLoading(true);

        const { title, description, price, unit } = data;
    
        const formatedFormData = new FormData();
        formatedFormData.append("title", title);
        formatedFormData.append("price", price);
        formatedFormData.append("unit", unit);
        formatedFormData.append("description", description);
        formatedFormData.append("category", categoryValue);

        if (checkboxValue) {
            formatedFormData.append("published", 1);
          } else {
            formatedFormData.append("published", 0);
          }
      
          if (files?.length > 0) {
            for (let x = 0; x < files.length; x += 1) {
              formatedFormData.append(`images[]`, files[x]);
            }
          }

          try {
            await addProductApi(formatedFormData);
            setLoading(false);
            toast({
                title: "Product created",
                description: "Product has been created successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
              })
              reset()
              setFiles([])
              dispatch(getProductAsync());
          } catch (error) {
            setLoading(false);
            toast({
                title: "An Error Occured",
                description: Object.values(error.response.data)[0][0],
                status: "error",
                duration: 3000,
                isClosable: true,
              })
          }

    }

    return (

        <Box marginTop="5px" className={transitionClass}>
                <form onSubmit={handleSubmit(handleAddProduct)} style={{ margin: " 30px 0px 0px 0px" }}>
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

                    <Box width="100%">
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
                    </Box>

                    <FormControl marginTop="10px" >
                    <Select onChange={(e)=> setCategory(e.target.value)} isInvalid={categoryValue ? false : true} placeholder="Select category">
                        <option value="raw">Raw</option>
                        <option value="processed">Processed</option>
                        </Select>
                    </FormControl>


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
                        }} loadingText="submitting..." isLoading={loading} color="white" backgroundColor="#21ba45" variant="solid" type="submit">
                            Submit
                        </Button>
                     
                    </Flex>
                </form>
        </Box>
    )
}

export default AddProductDetails;
