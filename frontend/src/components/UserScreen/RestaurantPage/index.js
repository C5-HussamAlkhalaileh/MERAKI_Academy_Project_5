import './style.css'
import React, { useState, useEffect, useContext } from 'react'
import { User } from '../../../controllers/user'
import NavBar from '../NavBar'
import YourCart from '../YourCart'
import { setCart, setPrice } from '../../../redux/reducers/User'
import { useDispatch, useSelector } from 'react-redux'

import { setTotal, setNameRest } from '../../../redux/reducers/User'

import { AiFillStar } from 'react-icons/ai'
import { BsPlusCircleFill } from 'react-icons/bs'
import { useLocation } from 'react-router-dom'

const RestaurantPage = () => {
  const dispatch = useDispatch()
// console.log("start")
  // const { state } = useLocation()
  // const {id} = state
    // console.log(localStorage.getItem("restaurantId"),"idaaaa")

  const [sumreal, setSumreal] = useState(0)
  const [restaurant, setRestaurants] = useState('')
  const [name, setName] = useState('')
  const [menu, setMenu] = useState('')
  const [categories, setCategories] = useState('')
  const [arrayDetails, setArrayDetails] = useState('')
  const cart = []

  //!...................................................
  const Userinfor = useSelector((state) => {
    return {
      yourCart: state.User.cart,
      yourPrice: state.User.price,
      sumPrice: state.User.sumPriceUser,
      name: state.User.name,
      Idrestaurant:state.User.restaurantIdId,
    }
  })

  const getRestaurant = async () => {
// console.log( Userinfor.Idrestaurant,"4242")
    const responseRestaurant = await User.getRestaurantById({
      restaurantId:localStorage.getItem("restaurantId"),
    })

    await setRestaurants(responseRestaurant.result)

    const responseMeal = await User.getMealsByRestaurant({ restaurantId:localStorage.getItem("restaurantId")})
    setMenu(responseMeal.result)

    setCategories(responseMeal.categories)

    let arrayLoop = []

    const filter = await responseMeal.categories.map((element, indexOne) => {
      arrayLoop.push({ catoName: element, mallloop: [] })
      responseMeal.result.map((elem, indextow) => {
        if (elem.category.includes(element)) {
          arrayLoop[indexOne].mallloop.push(elem)
        }
      })
    })

    setArrayDetails(arrayLoop)


  }

  useEffect(() => {
    getRestaurant()
  }, [])

  return (
    <div className="RestaurantPage">
      <div className="NavBarHere">{<NavBar />}</div>

      <div className="Allinformation_One">
        <div className="All_One_map">
          {restaurant
            ? restaurant.map((element, index) => {
                return (
                  <div className="All_One_One_map_returndiv">
                    <div>
                      <img className="imgback" src={element.backImg} />
                    </div>

                    <div className="div_restur_Name">
                      <h1 className="H1_Name">{element.name}</h1>
                      {/* <img className='imgLogo' src={element.Logo} /> */}
                      <div className="textadd">
                        <AiFillStar className="star" />
                        <h2 className="rating">4.8</h2>
                        <h2 className="location_res">
                          {'Jordan - ' + element.location}
                        </h2>
                        <br />
                        {/* <h2>{element.rest_category}</h2> */}
                      </div>

                      <div className="textadd22">
                        <h4 className="h4_rest">Open until 9:30 PM</h4>

                        <h4 className="h4_rest">
                          Tap for hours, address, and more
                        </h4>
                      </div>
                    </div>
                  </div>
                )
              })
            : ''}
        </div>
        <div className="Allinformation_One_tow">
          <div className="Allinformation_One_tow_one">
            <h1 className="h1h1 G1 ">Group Order</h1>
          </div>
          <div className="Allinformation_One_tow_tow">
            <div className="div1">
              <h1 className="h1h1">delivery</h1>
              <h4 className="h4h4">30-35 min .$0.99</h4>
            </div>
            <div className="div2">
              <h1 className="h1h1">pick up</h1>
              <h4 className="h4h4  g4 ">10-15 min .$0.00</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="Allinformation_Two">
        <div className="All_Two_categore_Cat">
          <h1>categories</h1>
          <div className="All_Two-categore_map">
            {categories ? (
              categories.map((element, index) => {
                return (
                  <div className="All_Two-categore_map_return" key={index}>
                    <a href={'#' + index} className="a_atAll">
                      <div className="divButton">
                        <button className="button">{element + 'hjhdd'}</button>
                      </div>
                      <i className="i"></i>
                    </a>

                    {/* <a href={"#" + index}   ><span>{element}</span><i></i></a> */}
                  </div>
                )
              })
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="All_Two-menue">
          {' '}
          {arrayDetails
            ? arrayDetails.map((element, index) => {
                return (
                  <div className="div_Mealloop_One">
                    <h1 className="h1_category_Nameq" id={index}>
                      {element.catoName}
                    </h1>

                    <div className="div_Mealloop_1">
                      {element.mallloop
                        ? element.mallloop.map((elementMall, index) => {
                            return (
                              <div className="div_Mallloop_2">
                                <div className="imgbox">
                                  {' '}
                                  <img
                                    className="eachMealimg"
                                    src={elementMall.imgUrl}
                                  />
                                </div>
                                <div className="divNameandPriceeach">
                                  <h2 className="h2andh4">
                                    {elementMall.name}
                                  </h2>
                                  <h4 className="h2andh4">
                                    {'$' + elementMall.price}
                                  </h4>
                                </div>

                                <BsPlusCircleFill
                                  className="PluseIcone"
                                  onClick={() => {
                                    dispatch(
                                      setNameRest({ name: restaurant[0].name }),
                                    )
                                    dispatch(setCart({ items: elementMall }))
                                    // console.log(elementMall)
                                    dispatch(
                                      setPrice({
                                        price: elementMall.price,
                                        indexitem: elementMall.id,
                                        priceOne: elementMall.price,
                                        name: elementMall.name,
                                        restaurantid:elementMall.restaurant_id
                                      }),
                                    )

                                    dispatch(
                                      setTotal({
                                        opr: '+',
                                        value: elementMall.price,
                                      }),
                                    )
                                    console.log('44')
                                  }}
                                />
                              </div>
                            )
                          })
                        : ''}
                    </div>
                  </div>
                )
              })
            : ''}
        </div>

        <div className="All_Two_cart">
          <h1 className="Your_cart_h1">Your Cart</h1>
          {<YourCart className="YourCartinRest" />}
        </div>
      </div>
    </div>
  )
}

export default RestaurantPage
