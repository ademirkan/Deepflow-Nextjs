import styles from "./Settings.module.css";

// /**
//  * options, currentValue, setValue, toValue
//  */
// export function CustomizableButtonOptionList({
//     options,
//     currentValue,
//     setValue,
//     toValue = (e) => e,
// }) {
//     const [activeIndex, setActiveIndex] = useState(
//         options.findIndex((option) => option.value === currentValue)
//     );

//     function handleClick(i) {
//         setActiveIndex(i);

//         // if it is not inputOption, set the value on click
//         if (i !== -1) {
//             setValue(options[i].value);
//         }
//     }

//     return (
//         <>
//             {options.map((option, i) => {
//                 return (
//                     <Button
//                         isActive={i === activeIndex}
//                         onClick={() => handleClick(i)}
//                     >
//                         {option.label}
//                     </Button>
//                 );
//             })}
//             <InputOption
//                 placeholder={"custom"}
//                 setValue={(value) => {
//                     setValue(toValue(parseInt(value)));
//                 }}
//                 isActive={activeIndex === -1}
//                 onFocus={() => handleClick(-1)}
//             ></InputOption>
//         </>
//     );
// }
