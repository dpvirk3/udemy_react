import React, {useRef, useImperativeHandle} from 'react';
import styles from './Input.module.css';

const Input = React.forwardRef((props, ref) => {


    //ref to be referred in html for input
    const inputRef = useRef();

    //activate function to cause focus on the component.
    const activate =() => {
        inputRef.current.focus();
    }

    //useImperative handle to expose activate function or 
    //any other functionality on the Input component
    useImperativeHandle(ref, 
        ()=> {return {
            focus: activate
        }});

    return (
        <div
        className={`${styles.control} ${
          props.isValid === false ? styles.invalid : ""
        }`}
      >
        <label htmlFor={props.id}>{props.label}</label>
        <input
        ref = {inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChangeHandler}
        onBlur={props.onBlurHandler}
      />
      </div>
    );
});

export default Input;
