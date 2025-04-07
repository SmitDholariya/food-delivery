/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import "./Myorder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const Myorder = () => {
  const [data, setData] = useState([]);
  const { url, token } = useContext(StoreContext);

  const fetchOrder = async () => {
    const res = await axios.post(
      url + "/api/order/userorder",
      {},
      { headers: { token } }
    );
    console.log(res.data.data);
    setData(res.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrder();
    }
  }, [token]);

  return (
    <div className="myorders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={index} className="myorders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.item.map((item, index) => {
                  if (index === order.item.length - 1) {
                    return item.name + "X" + item.Quantity;
                  }
                  else{
                    return item.name + "X" + item.Quantity + ","
                  }
                })}
              </p>
              <p>${order.amount}.00</p>
              <p>Items: {order.item.length}</p>
              <p><span>&#x25cf;</span><b>{order.status}</b></p>
              <button onClick={fetchOrder}>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Myorder;
