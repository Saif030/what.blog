const DotSpinner = ({ size = "2.8rem", speed = "0.9s", color = "#183153" }) => {
  const dots = Array.from({ length: 8 }, (_, i) => i);
  
  const getDelay = (index) => {
    const delays = [-0.875, -0.75, -0.625, -0.5, -0.375, -0.25, -0.125, 0];
    return `calc(${speed} * ${delays[index]})`;
  };

  const getRotation = (index) => index * 45;

  return (
    <div
      className="relative flex items-center justify-start"
      style={{ height: size, width: size }}
    >
      {dots.map((_, index) => (
        <div
          key={index}
          className="absolute top-0 left-0 flex items-center justify-start h-full w-full"
          style={{ transform: `rotate(${getRotation(index)}deg)` }}
        >
          <div
            className="rounded-full animate-pulse-dot"
            style={{
              height: "20%",
              width: "20%",
              backgroundColor: color,
              boxShadow: "0 0 20px rgba(18, 31, 53, 0.3)",
              animationDelay: getDelay(index),
              animationDuration: `calc(${speed} * 1.111)`,
            }}
          />
        </div>
      ))}
      
      <style>{`
        @keyframes pulse-dot {
          0%, 100% {
            transform: scale(0);
            opacity: 0.5;
          }
          50% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-pulse-dot {
          animation: pulse-dot ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default DotSpinner;