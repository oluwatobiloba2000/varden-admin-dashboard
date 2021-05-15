import React, { useMemo, useState } from 'react'
import { Box, FormControl, FormLabel, Input, ScaleFade, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import './index.css';
import { useParams } from 'react-router';
import useCustomTransition from '../../customHook/useCustomTransition';

import './index.css';
import { useSelector } from 'react-redux';
import DistributionCenterProductDetails from './DistributionCenter__products';
import HandleError from '../../component/HandleError';
import DistributionCenterAttendants from './DistributionCenter__attendants';
import DistributionCenterDispatchRiders from './DistributionCenter_dispatchRiders';

function DistributionCenterDetails({setCurrentSelectedDscCenter}) {
    const { id } = useParams();
    const DistributionState = useSelector(state => state.distributionCenters);
    const [transitionClass] = useCustomTransition();
    const [currentIndex, setCurrentTabIndex] = useState(0);

    const displayCenterDetails = useMemo(() => {
        const index = DistributionState.data.findIndex((dsc) => parseInt(dsc.id) === parseInt(id))

        if (index >= 0) {
            const dsc = DistributionState.data[index];

            // a use state that displays the distribution center name
            setCurrentSelectedDscCenter(dsc.dc_name)

            return <form className="distribution_center_details_form">
                <FormControl marginTop="15px" id="name">
                    <FormLabel>Name</FormLabel>
                    <Input type="text" readOnly value={dsc.dc_name} />
                </FormControl>

                <FormControl marginTop="15px" id="email">
                    <FormLabel>Email</FormLabel>
                    <Input type="email" readOnly value={dsc.dc_email} />
                </FormControl>

                <FormControl marginTop="15px" id="address">
                    <FormLabel>Address</FormLabel>
                    <Input type="text" readOnly value={dsc.dc_address} />
                </FormControl>

                <FormControl marginTop="15px" id="phonenumber">
                    <FormLabel>Phone Number</FormLabel>
                    <Input type="text" readOnly value={dsc.dc_phone_number} />
                </FormControl>
            </form>
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [DistributionState.data])

    return (
        <div className={transitionClass}>
           <Tabs isLazy onChange={(index) => setCurrentTabIndex(index)} variant="soft-rounded" colorScheme="green">
                <TabList display="flex" justifyContent="space-between">
                    <Tab className="tab_rounded">Details</Tab>
                    <Tab className="tab_rounded">Products</Tab>
                    <Tab className="tab_rounded">Attendants</Tab>
                    <Tab className="tab_rounded">Dispatch Riders</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel padding="2px">
                        <ScaleFade initialScale={0.9} in={(currentIndex === 0)}>
                              
                              <Box marginTop="30px">
                                    <HandleError error={DistributionState.error}/>
                              </Box>
        
                            {displayCenterDetails}
                        </ScaleFade>
                    </TabPanel>
                    <TabPanel>
                        {/* <ScaleFade initialScale={0.9} in={(currentIndex === 1)}> */}
                            <DistributionCenterProductDetails />
                        {/* </ScaleFade> */}
                    </TabPanel>
                    <TabPanel>
                        <DistributionCenterAttendants/>
                    </TabPanel>
                    <TabPanel>
                        <DistributionCenterDispatchRiders/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    )
}

export default DistributionCenterDetails;
