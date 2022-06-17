import './style.css'
import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, setPrice, setsumPriceUser, setTotal } from '../../../../redux/reducers/User';

import { AiTwotoneDelete } from "react-icons/ai";

import { BsDashLg, BsDashCircleFill, BsPlusCircleFill } from "react-icons/bs";



const Counter = ({ element }) => {

    const [cart, setCart] = useState("")
    const [priceNumber, setPriceNumber] = useState(1)

    const [realPrice, setrealPrice] = useState(element.price)

    // console.log(element.id, "item13")
    // console.log(index, "55index")
    const dispatch = useDispatch();

    const Userinfor = useSelector((state) => {

        return {
            yourCart: state.User.cart,
            yourPrice: state.User.price,
            yourTotal: state.User.total,
        }
    })
    // console.log(Userinfor.yourCart, "cart cart")
    console.log(Userinfor.yourPrice, "Price Price ")
    //!..............................


    const nextPrice = async () => {
        const A = await setPriceNumber(priceNumber + 1);
  
    }


    const prevPrice = () => {
        setPriceNumber(priceNumber - 1)
    }


    return (<div className="div_yourCounter">
        <div className='con'>

            <div className='Number_controlee'>
                <BsPlusCircleFill className='iconesCounter'
                    onClick={() => {
                        nextPrice();
                        dispatch(setPrice({ price: (realPrice * priceNumber) + realPrice, indexitem: element.id ,priceOne:realPrice,name:element.name}));
                        dispatch(setTotal({ opr: "+", value: realPrice }));
                    }}
                />

                <h2>{priceNumber}</h2>
                < BsDashCircleFill className='iconesCounter'

                    onClick={() => {
                        prevPrice()
                        dispatch(setPrice({ price: (realPrice * priceNumber) - realPrice, indexitem: element.id,priceOne:realPrice,name:element.name,  restaurantid:element.restaurant_id }));
                        dispatch(setTotal({ opr: "-", value: realPrice }));
                    }}
                />

            </div>


            <div className='Name_andP' >
                <h3>{element.name}</h3 >
                <h3 className='h3_price'>{realPrice * priceNumber + "JD"}</h3></div>


            <div className='div_delete'> <AiTwotoneDelete className='deleteIcons'
                onClick={() => {
                    dispatch(deleteCart({ id: element.id }))
                    dispatch(setTotal({ opr: "-", value: realPrice }));
                    console.log(element.id)
                }}

            /></div>



        </div>



    </div>)

}
export default Counter;