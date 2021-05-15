import React, { useEffect } from 'react'
import {Icon } from '@chakra-ui/react';
import { Box } from '@chakra-ui/layout';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import Loader from '../../component/Loader';
import { isTokenExpired } from '../../utils/auth';
import useCustomTransition from '../../customHook/useCustomTransition';
import HandleError from '../../component/HandleError';
import { getSingleOrdersAsync } from '../../app/slice/orderSlice/order';
import './index.css';
import { Breadcrumb, BreadcrumbItem } from '@chakra-ui/breadcrumb';
import { Link } from 'react-router-dom';
import { BiChevronRight } from 'react-icons/bi';

function OrderDetails() {
    const { orderId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const orderState = useSelector(state => state.orders);
    const [transitionClass] = useCustomTransition();

    useEffect(() => {
        const TokenExpired = isTokenExpired();

        if (!TokenExpired || TokenExpired !== 'empty token') {
            dispatch(getSingleOrdersAsync(history, orderId))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Breadcrumb marginTop="20px" fontSize="13px" spacing="8px" separator={<Icon as={BiChevronRight} color="gray.500" />}>
                <BreadcrumbItem>
                    <Link style={{ color: '#007eff' }} to="/orders">Orders</Link>
                </BreadcrumbItem>

                <BreadcrumbItem color="gray" isCurrentPage>
                    <span>Order details</span>
                </BreadcrumbItem>
                
            </Breadcrumb>

            <Box marginTop="5px" className={transitionClass}>
                {/* <SuccessModal success={productState.singleProduct && productState.singleProduct.title } messageBody="Admin Has been added successfully" /> */}
                <HandleError error={orderState.single_order_error} retryFn={() => getSingleOrdersAsync(history, orderId)} />
                {orderState.loading_single_order ? <Loader /> :
                    (orderState.singleOrder[0] && orderState.singleOrder && !orderState.single_order_error) &&
                
                    <div className="list-group py-2" style={{marginTop: "15px"}}>
                    <div className="list-group-item list-group-item-action order_details_head_title">
                      order : <b>{orderState.singleOrder[0] && orderState.singleOrder[0].order[0].order_number}</b>
                    </div>
                    <h6 className="text-black mt-2">Delivery detail</h6>

                    <div className="list-group-item list-group-item-action">
                      Delivery Address: <b>{orderState.singleOrder[0] && orderState.singleOrder[0].order[0].delivery_address}</b>
                    </div>
                    <div className="list-group-item list-group-item-action">
                      Dispatcher Name:{" "}
                      <b>{orderState.singleOrder[0] && orderState.singleOrder[0].order[0] &&
                        orderState.singleOrder[0].order[0].dispatcher ?
                        orderState.singleOrder[0].order[0].dispatcher.name : 'N/A'}</b>
                    </div>

                    <div className="list-group-item list-group-item-action">
                      Dispatcher Phone Number :{" "}
                      <b>{orderState.singleOrder[0] && orderState.singleOrder[0].order[0] &&
                        orderState.singleOrder[0].order[0].dispatcher ?
                        orderState.singleOrder[0].order[0].phone_number : 'N/A'}</b>
                    </div>
                    <div className="list-group-item list-group-item-action">
                      Dispatcher Email :{" "}
                      <b>{orderState.singleOrder[0] && orderState.singleOrder[0].order[0] &&
                        orderState.singleOrder[0].order[0].dispatcher ?
                        orderState.singleOrder[0].order[0].dispatcher.email : 'N/A'}</b>
                    </div>
                    <h6 className="text-black mt-2">status</h6>
                    <div className="list-group-item list-group-item-action">
                      Delivery Status: <b>{orderState.singleOrder[0] && orderState.singleOrder[0].order[0].delivery_status}</b>
                    </div>
                    <div className="list-group-item list-group-item-action">
                      Payment Status: <b>{orderState.singleOrder[0] && orderState.singleOrder[0].order[0].payment_status}</b>
                    </div>
                    <div className="list-group-item list-group-item-action">
                      Order status: <b>{orderState.singleOrder[0] && orderState.singleOrder[0].order[0].order_status}</b>
                    </div>
                    <h6 className="text-black mt-2">Price detail</h6>
                    <div className="list-group-item list-group-item-action">
                      quantity: <b>{orderState.singleOrder[0] && orderState.singleOrder[0].order[0].quantity}</b>
                    </div>

                    <div className="list-group-item list-group-item-action">
                      Delivery Cost: <b> ₦{orderState.singleOrder[0] && orderState.singleOrder[0].order[0].delivery_cost}</b>
                    </div>
                    <div className="list-group-item list-group-item-action">
                      Tax: <b>₦{orderState.singleOrder[0] && orderState.singleOrder[0].order[0].tax}</b>
                    </div>

                    <div className="list-group-item list-group-item-action">
                      Total Cost: <b>₦{orderState.singleOrder[0] && orderState.singleOrder[0].order[0].total_cost}</b>
                    </div>
                    <h6 className="text-black mt-2">Products Ordered</h6>
                    {orderState.singleOrder[0] && orderState.singleOrder.map((orderProduct) => (
                      <div key={orderProduct.product[0].title} className="list-group-item list-group-item-action">
                        Name: <b>{orderProduct.product[0].title}</b>
                      </div>
                    ))}
                  </div>
                }
            </Box>
        </>
    )
}

export default OrderDetails;
