
const GradeCircle = () => {

    return (
        <div className="flex flex-col items-center justify-center bg-custom-radial rounded-full w-64 h-64 relative shadow-md  border border-white border-opacity-30">
            <div className="mt-12 text-center text-8xl">
                {"A"}
            </div>
            <div className="text-center text-3xl">
                {"4.5"}
            </div>
            <div className="text-center">
                {`${"73"} stp.`}
            </div>
            <div className="absolute bottom-0 w-48 h-2.5 bg-black rounded-full opacity-50 blur-md mt-2"></div>
        </div>
    );
};

export default GradeCircle;
