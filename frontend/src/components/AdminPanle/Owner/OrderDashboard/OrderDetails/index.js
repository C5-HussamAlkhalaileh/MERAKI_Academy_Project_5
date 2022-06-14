import React, { useContext, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { Owner } from "../../../../../controllers/owner";
import { Gender } from "../../../../Registration/Register/GenderDiv";
import { ErrorsDiv } from "../../../../Registration/Register/ErrorsDiv";
import { Registration } from "../../../../../controllers/registration";

export const ShowDetails = ({ currentOrder, setShowDetails, currentIndex }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [errors, setErrors] = useState([]);

  const [shift, setShift] = useState("");
  const [salary, setSalary] = useState("");
  const [weeklyHours, setWeeklyHours] = useState("");
  const [restaurant_id, setRestaurant_id] = useState("");

  const [isDialogShown, setIsDialogShown] = useState("");
  const dispatch = useDispatch();

  const { auth, superAdminPanel } = useSelector((state) => {
    return state;
  });
  const buildAlertDialog = ({ bgColor, color, text, text2 }) => {
    setTimeout(() => {
      setIsDialogShown(false);
      setShowDetails(false);
    }, 2500);

    return (
      <div id="Alert">
        <div style={{ backgroundColor: `${bgColor}` }}>
          <p>
            <strong style={{ color: `${color}` }}>{text}</strong>
            <br />
            <small style={{ color: `${color}` }}>{text2}</small>
          </p>
        </div>
      </div>
    );
  };
  const createInput = ({ placeholder, setState, type = "text", key = "" }) => {
    return (
      <div>
        <input
          type={type}
          placeholder={placeholder}
          min={1}
          onChange={(e) => {
            setErrors(
              Registration.removeErrors({
                isLoginForm: false,
                key: key,
                value: e.target.value,
                errors,
              })
            );
            setState(e.target.value);
          }}
          className="input"
        />
      </div>
    );
  };

  const createEmployee = async () => {
    const employee = {
      firstName,
      lastName,
      password,
      gender,
      email,
      shift,
      salary: salary + "$",
      restaurant_id,
      weeklyHours,
      token: auth.token,
    };
    const inputForm = {
      FirstName: `${firstName} `,
      LastName: ` ${lastName}`,
      Email: email,
      Password: password,
      Gender: gender,
    };

    errors = Registration.checkFormErrors({
      isLoginForm: false,
      inputForm: inputForm,
    });
    if (errors.length === 0) {
      const { serverError } = await Owner.createEmployee({ ...employee });
      if (serverError === "Email already taken") {
        setErrors([...errors, "Email already taken"]);
      } else {
        setIsDialogShown(true);
      }
    } else {
      setErrors(errors);
    }
  };
  return (
    <div id="signup-form">
      {isDialogShown ? (
        buildAlertDialog({
          bgColor: "green",
          color: "white",
          text: "Employee Created Successfully",
          text2: `The employee can start his job `,
        })
      ) : (
        <></>
      )}
      <div id="signup-form-inner">
        <div id="signup--exit-button">
          <button
            onClick={() => {
              setShowDetails(false);
            }}
          >
            X
          </button>
        </div>

        <h1>ORDER DETAILS</h1>
        <hr />

        
        

       
      </div>
    </div>
  );
};
