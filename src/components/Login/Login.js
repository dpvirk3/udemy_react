import React, { useState, useEffect, useRef, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  } else if (action.type === "USER_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }

  return { value: "", isValid: false };
};

const pwdReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  } else if (action.type === "USER_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }

  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: false,
  });

  const [pwdState, dispatchPwd] = useReducer(pwdReducer, {
    value: "",
    isValid: false,
  });

  // useEffect(() => {
  //   console.log("EFFECT RUNNING");

  //   return () => {
  //     console.log("EFFECT CLEANUP");
  //   };
  // }, []);

  //object destructuring with specific property
  const { isvalid: emailIsValid } = emailState;
  const { isValid: pwdIsValid } = pwdState;

  //useEffect based on email and pwd valid state makes it more efficient.
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(emailIsValid && pwdIsValid);
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailIsValid, pwdIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    setFormIsValid(
      emailState.value.includes("@") && pwdState.value.trim().length > 6
    );

    // setEnteredEmail(event.target.value);

    // setFormIsValid(
    //   event.target.value.includes("@") && enteredPassword.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPwd({ type: "USER_INPUT", val: event.target.value });
    setFormIsValid(
      emailState.value.includes("@") && pwdState.value.trim().length > 6
    );

    // setEnteredPassword(event.target.value);

    // setFormIsValid(
    //   enteredEmail.includes("@") && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    dispatchPwd({ type: "USER_BLUR" });
    // setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    // not sending val as it is already in the state and available to reducer
    dispatchPwd({ type: "USER_BLUR" });
    // setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const emailRef = useRef();
  const pwdRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      // props.onLogin(enteredEmail, enteredPassword);
      props.onLogin(emailState.value, pwdState.value);
    } else if (!formIsValid) {
      if (!emailState.isValid) {
        emailRef.current.focus();
      } else {
        pwdRef.current.focus();
      }
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailRef}
          type="email"
          id="email"
          label="email"
          isValid={emailState.isValid}
          value={emailState.val}
          onChangeHandler={emailChangeHandler}
          onBlurHandler={validateEmailHandler}
        />

        <Input
          ref={pwdRef}
          type="password"
          id="password"
          label="Password"
          isValid={pwdState.isValid}
          value={pwdState.val}
          onChangeHandler={passwordChangeHandler}
          onBlurHandler={validatePasswordHandler}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
