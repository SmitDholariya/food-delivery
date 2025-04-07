/* eslint-disable no-unused-vars */
import React from "react";
import "./Orders.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const res = await axios.get(url + "/api/order/list");
    if (res.data.success) {
      setData(res.data.data);
      console.log(res.data.data);
    } else {
      toast.error("Error");
    }
  };

  const statusHandler = async (e,orderId) => {
    // console.log(e,orderId);
    const res = await axios.post(url+"/api/order/status",{
      orderId,
      status:e.target.value
    })
    if(res.data.success){
      await fetchOrders()
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h3 className="order">Order Page</h3>
      <div className="order-list">
        {data.map((order, index) => (
          <div className="order-item" key={index}>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.item.map((item, index) => {
                  if (index === order.item.length - 1) {
                    return item.name + " X " + item.Quantity;
                  } else {
                    return item.name + " X " + item.Quantity + " ,";
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items : {order.item.length}</p>
            <p>${order.amount}</p>
            <select onChange={(e)=>statusHandler(e,order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
