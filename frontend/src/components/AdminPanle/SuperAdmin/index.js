import { useSelector, useDispatch } from "react-redux";
import react, { useEffect, useState } from "react";
import { NavigationMenu } from "./NavigationMenu";
import "./style.css";
import { Users } from "./UsersDashboard";
import { Requests } from "./RequestsDashboard";
import { NavigationBarPanel } from "./NavigationBar";
import { Restaurants } from "./RestaurantDashboard";
import { User } from "../../../controllers/user";
import { ErrorPage } from "../../ErrorPage";
export const SuperAdminPanel = () => {
  const dispatch = useDispatch();
  const [hideMenu,setHideMenu] = useState(false);
  const [isUsersShown, setIsUsersShown] = useState(0);
  const { superAdminPanel } = useSelector((state) => {
    return state;
  });
  
  return User.roleId === 1 ?(
    <div style={{ height:"100%", width: "100vw", display: "flex" }}>
      {hideMenu?<NavigationMenu setIsUsersShown={setIsUsersShown} />:<></>}
      <div style={{ color: "red", width: "100%" }}>
        <NavigationBarPanel setHideMenu={setHideMenu} hideMenu={hideMenu}/>
        {isUsersShown === 0
          ? <Users/>
          :(isUsersShown === 1?<Requests/>:<Restaurants/>)} 
      </div>
    </div>
  ):<ErrorPage />;
};
