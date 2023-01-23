import react from "react";
import Popup from "reactjs-popup";
import styles from "./Setting.module.css";
import { useState } from "react";

/**
 * Setting
 *    CustomizableButtonOptionList
 *    ButtonOptionList
 *    InputOption
 */
export default function Setting({ title, description, actionArea }) {
  return (
    <div className={styles.settingGrid}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
      <div className={styles.optionListContainer}>{actionArea}</div>
    </div>
  );
}

export function ButtonOptionList({ options, currentValue, setValue }) {
  return (
    <>
      {options.map((option) => {
        return (
          <ButtonOption
            isActive={option.value === currentValue}
            onClick={() => {
              setValue(option.value);
            }}
          >
            {option.label}
          </ButtonOption>
        );
      })}
    </>
  );
}

/**
 * options, currentValue, setValue, toValue
 */
export function CustomizableButtonOptionList({
  options,
  currentValue,
  setValue,
  toValue = (e) => e,
}) {
  const [activeIndex, setActiveIndex] = useState(
    options.findIndex((option) => option.value === currentValue)
  );

  function handleClick(i) {
    setActiveIndex(i);

    // if it is not inputOption, set the value on click
    if (i !== -1) {
      setValue(options[i].value);
    }
  }

  return (
    <>
      {options.map((option, i) => {
        return (
          <ButtonOption
            isActive={i === activeIndex}
            onClick={() => handleClick(i)}
          >
            {option.label}
          </ButtonOption>
        );
      })}
      <InputOption
        placeholder={"custom"}
        setValue={(value) => {
          setValue(toValue(parseInt(value)));
        }}
        isActive={activeIndex === -1}
        onFocus={() => handleClick(-1)}
      ></InputOption>
    </>
  );
}

export function ButtonOption({ isActive, onClick = () => {}, children }) {
  return (
    <div
      className={"button " + (isActive && styles.buttonActive)}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function InputOption({
  currentValue,
  setValue,
  onFocus,
  isActive,
  placeholder,
}) {
  function handleKeyUp(event) {
    //key code for enter
    if (event.code === "Enter") {
      event.preventDefault();
      event.target.blur();
    }
  }

  return (
    <input
      type="number"
      className={
        "button " + styles.inputButton + " " + (isActive && styles.buttonActive)
      }
      placeholder={placeholder}
      onFocus={(e) => {
        // make current text into currentValue
        e.target.value = currentValue;
        onFocus();
      }}
      onChange={(e) => {
        if (e.target.value && e.target.value > 0) setValue(e.target.value);
      }}
      onKeyUp={handleKeyUp}
      onBlur={(e) => (e.target.value = placeholder)}
      onWheel={(event) => event.currentTarget.blur()}
      autoFocus={false}
    ></input>
  );
}
