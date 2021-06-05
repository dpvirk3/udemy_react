import React from 'react';
import styles from './Input.module.css';

const Input = (props) => {


    // const onChangeHandler = (event) =>{
    //     props.onChangeHandler(event);
    // }
    // const onBlurHandler = (event) => {
    //     props.onBlurHandler();
    // }
    return (
        <div
        className={`${styles.control} ${
          props.isValid === false ? styles.invalid : ""
        }`}
      >
        <label htmlFor={props.id}>{props.label}</label>
        <input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChangeHandler}
        onBlur={props.onBlurHandler}
      />
      </div>
    );
}

export default Input;
