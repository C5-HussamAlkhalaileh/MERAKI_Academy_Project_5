import './style.css'
import React, { useState, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import NavBar from '../../NavBar'
import { User } from '../../../../controllers/user'
import { empty } from 'dom/lib/mutation'

const CompleteOrder = () => {
  // const { state } = useLocation()
  // const { Name } = state
  const navigate = useNavigate()

  const [city, setCity] = useState('empty')
  const [Area, setArea] = useState('empty')

  const [Phone, setPhone] = useState('empty')
  const [buildingNumber, setBuilding] = useState('empty')
  const [street, setstreet] = useState('empty')

  const [truevalue, settrue] = useState('false')

  const [pastAdress, setPastAdress] = useState('empty')
  const [messageLocation, setMessage] = useState('empty')

  const [payment, setPayment] = useState('Cash')
  const [testComplete, settestComplete] = useState('false')
  const [models, setmodels] = useState(false)
  const [popadress, setPopadress] = useState('false')
  const [clickValue, setClick] = useState('No')

  const [pymentMethod, setPaymentMethod] = useState('empty')

  //!.....................................
  let testadress = 'false'
  //!.............
  const dispatch = useDispatch()

  const Userinfor = useSelector((state) => {
    return {
      yourCart: state.User.cart,
      yourPrice: state.User.price,
      yourTotal: state.User.total,
      islogin: state.auth.isLoggedIn,
      sumPrice: state.User.sumpriceUser,
      name: state.User.name,
      userId: state.User.Iduser,
      sumItems:state.User.Sumitems
    }
  })

    console.log(Userinfor.yourPrice, 'YourPrice fff  complete')
  //!..............................

  //   console.log(Userinfor.userId, 'Yourid   complete')
    console.log(Userinfor.sumItems, 'Yourid  SumSumSum complete')

  //!..................Functions.............................................

  const saveAdress = async (id) => {
    if (messageLocation == 'good') {
      const adress = await User.UpdateAdress({
        userid: id,
        city: Area,
        buldingNumber: buildingNumber,
        street: street,
        notes: Phone,
      })
    }
  }

  //!........................................................
  const getAdress = async (userid) => {
    // console.log("idiiddid", userid)
    const pastadess = await User.getaddrssByuserTd({ userid })

    if (pastadess.result[0].street != null) {
      //   console.log('nulllll')
      testadress = 'true'
      settrue('true')
    }
    setPastAdress(pastadess.result[0])
  }
  //!........................................................
  const pastmessage = () => {
    if (truevalue == 'false') {
      setMessage('sorry not have past location please enter')
      setPopadress('false')
    } else {
      setMessage('good')
      setPopadress('true')
    }
  }
  //!........................................................

  const newmessage = () => {
    if (
      Area != 'empty' &&
      Phone != 'empty' &&
      street != 'empty' &&
      Phone != 'empty' &&
      city != 'empty'
    ) {
      setMessage('good')
    } else {
      console.log('khkhkh')
      setMessage('enter all information')
    }
  }
  //!........................................................
  // const click = () => {
  //     alert("ggggggggggggggg");

  // }

  const toggleModel = () => {
    console.log('ghghg')
    setmodels(!models)
    console.log(models)
  }
  //!........................................................
  const sentUserOrder = async (id) => {
    console.log(Userinfor.sumPrice,"1144444444444444444444")
    // console.log( Userinfor.yourPrice[0].restaurant,"114")
    if (testComplete == 'true' && messageLocation == 'good') {
      console.log('sentOrder')
      const userOrder = await User.sentOrder({
        userid: id,
        state: 'progess',
        receipt: Userinfor.sumPrice,
        resturantId: Userinfor.yourPrice[0].restaurant,
        mealarray: Userinfor.yourPrice,
        Quntity:Userinfor.sumItems
      })
    }
  }
    //!........................................................
  const move = () => {
    console.log(models, testComplete, popadress)
    if (models && (testComplete == ' true' || popadress == 'true')) {
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }

    //    navigate("/")
  }

  //!...............................................................
  useEffect(() => {
    getAdress(localStorage.getItem('userid'))
  }, [])

  //!...............................................................
  return (
    <div className="completeOrder">
      <NavBar />

      <div className="order">
        <div className="summaryOrder">
          <div className="divSummary">
            <h2 className="h2_order">Order Summary</h2>
          </div>
          <div className="orderinformation">
            <h1 className="restaauranttName">{Userinfor.name}</h1>
            <div className="orderinformationtwo">
              <h2 className="items">items</h2>
              <div className="title_tow">
                <h2 className="h2"> quantity</h2>
                <h2 className="h2"> Price</h2>

                <h2 className="h2">Total</h2>
              </div>
            </div>
            <div className="orderinformationthree">
              {/* {' '} */}
              <div className="mealItems">
                {Userinfor.yourPrice
                  ? Userinfor.yourPrice.map((element, index) => {
                      return (
                        <div className="div_return_map" keys={index}>
                          <h3 className="NameMeal">{element.name}</h3>
                          <div className="insted__div_return_map">
                            <div className="h3_Qun">
                              {element.price / element.priceOne}
                            </div>
                            <div className="h3_Pri">
                              {element.priceOne + ' JD'}
                            </div>
                            <div className="h3_totprice">
                              {(element.price / element.priceOne) *
                                element.priceOne +
                                '  JD'}
                            </div>
                          </div>
                        </div>
                      )
                    })
                  : ''}
              </div>{' '}
            </div>

            {/* <div className="sumprice">total:{Userinfor.sumPrice}</div> */}
          </div>
        </div>
        <div className="location">
          <div className="Enterh2_order">
            {' '}
            <h2 className="h2_order   Enter">Enter a new site</h2>
            <h2 className="h2_order  lastSite ">  last site</h2>
          </div>

          <div className="locationTow">
            <div className="inputLocation">
              <div className="cityandarea">
                <input
                  className="inputtag"
                  placeholder="City"
                  onChange={(e) => {
                    setCity(e.target.value)
                  }}
                />
                <input
                  className="inputtag"
                  placeholder="Area"
                  onChange={(e) => {
                    setArea(e.target.value)
                  }}
                />
              </div>
              <div className="cityandarea">
                <input
                  className="inputtag"
                  placeholder="buldingNumber"
                  onChange={(e) => {
                    setBuilding(e.target.value)
                  }}
                />
                <input
                  className="inputtag"
                  placeholder="stretNumber"
                  onChange={(e) => {
                    setstreet(e.target.value)
                  }}
                />
              </div>
              <div className="Number">
                <input
                  className="Number"
                  placeholder="Number"
                  onChange={(e) => {
                    setPhone(e.target.value)
                  }}
                />
              </div>
            </div>

            <div className="userPastLocation">
              {truevalue == 'true' ? (
                <div className="iftrue">
                  <div className="div45">
                    <div className='h2h2h2PastLocation'> <h2 className='h2h2h2333'>City:</h2></div>
                    <h3 className="h2userLocation">Amman</h3>
                  </div>
                  <div className="div45">
                    <div className='h2h2h2PastLocation'> <h2 className='h2h2h2333'>Area:</h2></div>
                    <h3 className="h2userLocation">{pastAdress.city}</h3>
                  </div>
                  <div className="div45">
                    <div className='h2h2h2PastLocation'><h2 className='h2h2h2333'>street:</h2></div>
                    <h3 className="h2userLocation">{pastAdress.street}</h3>
                  </div>
                  <div className="div45">
                    <div className='h2h2h2PastLocation'><h2 className='h2h2h2333'>buildingNumber:</h2></div>
                    <h3 className="h2userLocation">
                      {pastAdress.buldingNumber}
                    </h3>
                  </div>
                  <div className="div45">
                    <div  className='h2h2h2PastLocation'><h2 className='h2h2h2333'> phone:</h2></div>
                
                    <h3 className="h2userLocation">{pastAdress.notes}</h3>
                  </div>
                </div>
              ) : (
                <div className="divimageee">
                  <h2 className="pastlocationmessage">
                    You dont have a previous site ..
                  </h2>
                  <img
                    className="imgadresss"
                    src="http://cdn.onlinewebfonts.com/svg/img_554287.png"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="selelctadresss">
          <div className="Selecth2_order">
            <h2 className="h2_order">Select Address</h2>
          </div>

          <div className="divnewAdress">
            <input
              className="inputSelect"
              type="radio"
              id="huey"
              name="drone"
              onChange={(e) => {
                newmessage()
              }}
            />
            <label for="huey">new address</label>
          </div>

          <div>
            <input
              className="inputSelect"
              type="radio"
              id="huey"
              name="drone"
              onChange={(e) => {
                pastmessage()
              }}
            />
            <label for="huey">Past address</label>
          </div>

          <div className="divColorMessage">
            {messageLocation != 'empty' ? (
              <div className="messageColor">{messageLocation}</div>
            ) : (
              ''
            )}
          </div>
        </div>

        <div className="Payment">
          <div className="PaymentOne">
            <h2 className="h2_order"> Payment Summary</h2>
          </div>
          <div className="Paymentwo">
            <div className="Paymenttow_tow">
              <div className="HowPayment">
                <div>
                  <input
                    type="radio"
                    id="huey1"
                    name="drone2"
                    value="huey1"
                    onChange={(e) => {
                      setPayment('Visa')
                      console.log(payment, 'lllll', 'Visa')
                      settestComplete('true')
                      //   setPopadress("true")
                    }}
                  />
                  <label for="huey1">Credit Card</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="huey2"
                    name="drone2"
                    value="huey2"
                    onChange={(e) => {
                      setPayment('Cash')
                      console.log(payment, '22222')
                      settestComplete('true')
                      //   setPopadress("false")
                    }}
                  />
                  <label for="huey2">cash</label>
                </div>
              </div>
              <div className="paymentcreditCardOremty">
                {payment == 'Visa' ? (
                  <div className="divcreditCard">
                    <div className="divcreditCard_one">
                      <h3 className="cartVisah3">Card Number</h3>{' '}
                      <input
                        className="inputCardNumber"
                        placeholder="    -   -  -  -  -   - "
                      />{' '}
                    </div>

                    <div className="divcreditCard_two">
                      <h3 className="cartVisah3">Card expiry date</h3>
                      <div className="divCreditCard_two_two">
                        <select
                          className="inputmounth"
                          onChange={(e) => {
                            // setDestin(e.target.value);
                          }}
                        >
                          <option>mm</option>
                          <option>01</option>
                          <option>02</option>
                          <option>03</option>
                          <option>04</option>
                          <option>05</option>
                          <option>06</option>
                          <option>07</option>
                          <option>08</option>
                          <option>09</option>
                          <option>10</option>
                          <option>11</option>
                          <option>12</option>
                        </select>

                        <select
                          className="inputmounth"
                          onChange={(e) => {
                            // setDestin(e.target.value);
                          }}
                        >
                          <option>yy</option>
                          <option>2022</option>
                          <option>2023</option>
                          <option>2024</option>
                          <option>2025</option>
                          <option>2026</option>
                          <option>2027</option>
                        </select>
                      </div>
                    </div>

                    <div className="divcreditCard_three">
                      <h3 className="cartVisah3">Card verification value</h3>
                      <div className="divImageeee">
                        <input className="verification" placeholder="number" />
                        <img
                          className="cartimage"
                          src="https://www.talabat.com/images/talabat/cvv_guide.png"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className="divDivdiv">
              <div className="divTotalOrder">
                <div className="divdivTotal">
                  <h2 className="h2h2Total">Subtotal</h2>
                  <h3 className="h3h3h3total">{Userinfor.sumPrice + ' JD'}</h3>
                </div>
                <div className="divdivTotal">
                  <h2 className="h2h2Total">Delivery fee</h2>
                  <h3 className="h3h3h3total"> 0.99 JD</h3>
                </div>
                <div className="divdivTotal   Tax">
                  <h2 className="h2h2Total">Tax</h2>
                  <h3 className="h3h3h3total"> 16 %</h3>
                </div>
                <div className="divdivTotal">
                  <h2 className="h2h2Total">Total Amount</h2>
                  <h3 className="h3h3h3total">
                    {Userinfor.sumPrice + Userinfor.sumPrice * 0.16 + 1}
                  </h3>
                </div>
                <div>
                  {' '}
                  <button
                    className="PlaceOrder"
                    onClick={() => {
                      saveAdress(Userinfor.userId)
                      sentUserOrder(Userinfor.userId)
                    //   setClick('yes')
                      toggleModel()

                      move()
                    }}
                  >
                    PLACE ORDER
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="divdivModels">
          {models && (testComplete == 'false' || popadress == 'false') ? (
            <div
              className="instedModel"
              onClick={() => {
                toggleModel()
              }}
            >
              <div className="instedModel">
                <h2 className="h2h2PleaseCheck">
                  Please Check Your Information
                </h2>
                <button
                  className="CloseButton"
                  onClick={() => {
                    toggleModel()
                  }}
                >
                  close
                </button>
              </div>
            </div>
          ) : (
            ' '
            // <div>
            //   {models &&(testComplete == 'true' && popadress == 'true') ? (
            //     <div className="instedModel">
            //       <h2 className="h2h2PleaseCheck">Order Completed True </h2>
            //     </div>
            //   ) : (
            //     ''
            //   )}
            // </div>
          )}
        </div>
      </div>
    </div>
  )
}
// ;<div>
//   <div className="instedModel">
//     <h2 className="h2h2PleaseCheck">Order Completed True </h2>
//   </div>
// </div>

export default CompleteOrder
