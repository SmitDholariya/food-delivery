import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreProvider = (props) => {

    const[cartitems,setcartitem]=useState({});
    const url ="http://localhost:4000";
    const [token,setToken]=useState("");
    const [food_list,setFoodList]=useState([])

    const addtocart = async (itemid)=>{
        if(!cartitems[itemid]){
            setcartitem((prev)=>({...prev, [itemid]: 1}));
        }
        else{
            setcartitem((prev)=>({...prev, [itemid]:prev[itemid]+1}));
        }
        if (token) {
          await axios.post(url + "/api/cart/add",{itemid},{headers: {token}})
        }
    }

    const removefromcart = (itemid)=>{
        setcartitem((prev)=>({...prev,[itemid]:prev[itemid]-1}));
    }

  const getTotalCartAmount=()=>
    {
      let totalAmount = 0;
      for(const item in cartitems)
      {
        if(cartitems[item]>0){
          let iteminfo = food_list.find((product) => product._id === item);
          totalAmount += iteminfo.price*cartitems[item];
        }
      }
      return totalAmount;
    }

    const fetchFoodList = async()=>{
      const response = await axios.get( url+'/api/food/list');
      setFoodList(response.data.data)
    }

    useEffect(()=>{
      async function loadData(){
        await fetchFoodList();
        if (localStorage.getItem("token")) {
          setToken(localStorage.getItem("token"));
        }
      }
      loadData();
    },[]);

  const contextValue = {
    food_list,
    cartitems,
    setcartitem,
    addtocart,
    removefromcart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
