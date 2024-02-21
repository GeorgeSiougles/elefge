"use client";
import { useReducer } from "react";

type InputState = {
  isTouched: boolean;
  value: string;
};

type InputAction =
  | { type: "INPUT"; value: string }
  | { type: "BLUR"; value: string }
  | { type: "RESET" };

const initialInputState = {
  isTouched: false,
  value: "",
};

const inputStateReducer = (
  state: InputState,
  action: InputAction
): InputState => {
  if (action.type === "INPUT") {
    return { isTouched: state.isTouched, value: action.value };
  }
  if (action.type === "BLUR") {
    return { isTouched: true, value: state.value };
  }
  if (action.type === "RESET") {
    return { isTouched: false, value: "" };
  }
  return initialInputState;
};

const useInput = (validateValue: (value: string) => boolean) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  //infered values
  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (value: string) => {
    dispatch({
      type: "INPUT",
      value: value,
    });
  };

  const inputBlurHandler = (value: string) => {
    dispatch({ type: "BLUR", value: value });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value, // extract with alias
    isValid: valueIsValid,
    hasError, //extract without alias because its the same name
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
