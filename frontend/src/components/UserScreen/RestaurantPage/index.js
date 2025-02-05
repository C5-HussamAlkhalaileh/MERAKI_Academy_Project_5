import './style.css'
import React, { useState, useEffect, useContext } from "react";
import { User } from '../../../controllers/user';
import NavBar from '../NavBar';
import YourCart from '../YourCart';
import { setCart, setPrice } from '../../../redux/reducers/User';
import { useDispatch, useSelector } from "react-redux";


import { setTotal } from '../../../redux/reducers/User';


import { AiFillStar } from "react-icons/ai";
import { BsPlusCircleFill } from "react-icons/bs"
const RestaurantPage = () => {

  const dispatch = useDispatch();

  // const [sumreal, setSumreal] = useState(0)
  const [restaurant, setRestaurants] = useState("")
  const [menu, setMenu] = useState("")
  const [categories, setCategories] = useState("")
  const [arraydetials, setArraydetials] = useState("")
  const cart = []

  //!...................................................
  const Userinfor = useSelector((state) => {

    return {
      yourCart: state.User.cart,
      yourPrice: state.User.price,
      sumPrice: state.User.sumPriceUser,
    }
  })


  const getRestarnt = async () => {

    const responseRestarnt = await User.getRestaurantById({ restaurantId: 1 })

    console.log(responseRestarnt.result)
    await setRestaurants(responseRestarnt.result)



    const responseMeal = await User.getMealsByRestaurant({ restaurantId: 1 })
    setMenu(responseMeal.result)

    setCategories(responseMeal.categories)



    let array = []
    let arrayTwo = []
    let arrayLoop = []

    const filter = await responseMeal.categories.map((element, indexOne) => {
      // console.log("5")
      arrayLoop.push({ catoName: element, mallloop: [] })
      responseMeal.result.map((elem, indextow) => {
        if (elem.category.includes(element)) {

          // array.push(element)
          // arrayTwo.push(elem)
          arrayLoop[indexOne].mallloop.push(elem)
        }

      })
      console.log(arrayLoop[indexOne])
    })

    setArraydetials(arrayLoop)


  }




  useEffect(() => {
    getRestarnt()

  }, [])


  console.log(arraydetials)
  console.log(Userinfor.yourPrice)

  console.log(restaurant)

  return (<div className="RestaurantPage">
    <div className='NavBarHere'>{<NavBar />}</div>


    <div className='Allinformation_One' >

      <div className='All_One_map' >{restaurant ? restaurant.map((element, index) => {
        return (<div className='All_One_One_map_returndiv' >
          <div><img className='imgback' src={element.backImg} /></div>

          <div className='div_restur_Name'><h1 className='H1_Name'>{element.name + "hghghg"}</h1>
            {/* <img className='imgLogo' src={element.Logo} /> */}
            <div className='textadd'><AiFillStar className='star' /><h2 className='rating'>4.8</h2>
              <h2 className='location_res'>{"Jordan - " + element.location}</h2><br />
              {/* <h2>{element.rest_category}</h2> */}
            </div>

            <div className='textadd22'>
              <h4 className='h4_rest'>Open until 9:30 PM</h4>

              <h4 className='h4_rest'>Tap for hours, address, and more</h4>
            </div>

          </div>


        </div>)


      }) : ""}

      </div>
      <div className='Allinformation_One_tow'>
        <div className='Allinformation_One_tow_one'>


          <h1 className='h1h1 G1 '>Group Order</h1>


        </div>
        <div className='Allinformation_One_tow_tow'><div className='div1'><h1 className='h1h1'>delivery</h1><h4 className='h4h4'>30-35 min .$0.99</h4></div>
          <div className='div2'><h1 className='h1h1'>pick up</h1><h4 className='h4h4  g4 '>10-15 min .$0.00</h4></div>
        </div>
      </div>

    </div>




    <div className='Allinformation_Two'>

      <div className='All_Two_categore_Cat'>
        <h1>categories</h1>
        <div className='All_Two-categore_map'>{categories ? categories.map((element, index) => {
          return (<div className='All_Two-categore_map_return' key={index}>
            <a href={"#" + index} className="a_atAll">{element}</a>

          </div>)
        }) : <></>}</div>


      </div>



      <div className='All_Two-menue'>  {arraydetials ? arraydetials.map((element, index) => {
        return (<div className='div_Mealloop_One'>

          <h1 className='h1_category_Nameq' id={index}>{element.catoName}</h1>

          <div className='div_Mealloop_1'>{element.mallloop ? element.mallloop.map((elementMall, index) => {
            return (<div className='div_Mallloop_2'>
              <div className='imgbox'> <img className='eachMealimg' src={elementMall.imgUrl} /></div>
              <div className='divNameandPriceeach'>
                <h2 className='h2andh4'>{elementMall.name}</h2>
                <h4 className='h2andh4'>{"$" + elementMall.price}</h4>
              </div>

              <BsPlusCircleFill className='PluseIcone'
                onClick={() => {

                  dispatch(setCart({ items: elementMall }))
                  // dispatch(setPrice({ price: elementMall.price, indexitem: elementMall.id }))

                  dispatch(setTotal({ opr: "+", value: elementMall.price }));
                  console.log("44")

                }}
              />

            </div>)


          }) : ""}</div>
        </div>
        )
      }) : ""}</div>




      <div className='All_Two_cart'>
        <h1 className='Your_cart_h1'>Your Cart</h1>
        {<YourCart className="YourCartinRest" />}</div>

    </div>



  </div>


  );
};

export default RestaurantPage;