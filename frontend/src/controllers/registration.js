import axios from "axios";
import { hostUrl } from "..";

export class Registration {
  static async login({ email, password }) {
    const body = {
      email,
      password,
    };
    try {
      const response = await axios.post(`${hostUrl}/login`, body);

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
  static async register({ firstName, lastName, email, password, gender,role=1 }) {
   
    try {
      const user = {
        firstName,
        lastName,
        email,
        password,
        gender,
      };

      const response = await axios.post(`${hostUrl}/register/${role}`, user);
      return response.data.message;
    } catch (error) {
      return error.response.data.message;
    }
  }

  static checkFormErrors({ inputForm, isLoginForm = false }) {
    let errors = [];

    for (let key in inputForm) {
      if (!isLoginForm) {
        if (key === "LastName") {
          const value = inputForm[key];

          if (value === "" || value.length < 2) {
            if (!errors.includes("Invalid last name")) {
              errors.push("Invalid last name");
            }
          }
        }
        if (key === "FirstName") {
          const value = inputForm[key];

          if (value === "" || value.length < 2) {
            if (!errors.includes("Invalid first name")) {
              errors.push("Invalid first name");
            }
          }
        }

        if (key === "Email") {
          const value = inputForm[key];
          if (!value.includes("@") || !value.includes(".com")) {
            if (!errors.includes("Invalid email")) {
              errors.push("Invalid email");
            }
          }
        }
        if (key === "Password") {
          const value = inputForm[key];

          if (value === "") {
            if (!errors.includes("Invalid password")) {
              errors.push("Invalid password");
            }
          } else if (value.length > 30) {
            if (!errors.includes("Password must be less than 30 Characters")) {
              errors.push("Password must be less than 30 Characters");
            }
          } else if (value.length < 10) {
            if (!errors.includes("Password must be more than 9 Characters")) {
              errors.push("Password must be more than 9 Characters");
            }
          }
        }
        if (key === "Gender" && inputForm[key] === null) {
          if (!errors.includes("Choose your gender")) {
            errors.push("Choose your gender");
          }
        }
      } else {
        if (key === "Email") {
          const value = inputForm[key];
          if (!value.includes("@") || !value.includes(".com")) {
            if (!errors.includes("Invalid email")) {
              errors.push("Invalid email");
            }
          }
        }
      }
    }

    return errors;
  }

  static removeErrors({ isLoginForm, errors = [], key, value }) {
    const removeError = (error) => {
      if (errors.includes(error)) {
        errors.splice(errors.indexOf(error), 1);
      }
    };

    if (!isLoginForm) {
      if (key === "LastName") {
        if (value !== "" || value.length > 2) {
          removeError("Invalid last name");
        }
      }
      if (key === "FirstName" || value.length > 2) {
        if (value !== "") {
          removeError("Invalid first name");
        }
      }

      if (key === "Gender") {
        if (value !== null) removeError("Choose your gender");
      }

      if (key === "Email") {
        if (value.includes("@") && value.includes(".com")) {
          removeError("Invalid email");
        }
      }

      if (key === "Password") {
        if (value !== "") {
          removeError("Invalid password");
        }
        if (value.length <= 30) {
          removeError("Password must be less than 30 Characters");
        }
        if (value.length >= 10) {
          removeError("Password must be more than 9 Characters");
        }
      }
    } else {
      //ToDO : login request
    }
    return errors;
  }
}
