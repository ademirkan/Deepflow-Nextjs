const NasaCircularProgress = ({
    animationDuration = "1s",
    animationTimingFunction = "linear",
    clockwise = false,
    thickness = 0.1,
    primaryColor = "var(--main-color)",
}) => {
    return (
        <>
            <img className="relative left-[10px]" src="nasa.png"></img>
        </>
    );
};

export default NasaCircularProgress;
