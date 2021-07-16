const IconCounter = ({ icon, count, className }) => {
  return (
    <div className="inline-block relative">
      {icon}
      {count > -1 &&(
        <span className={`bgk text-white rounded-full absolute -top-2.5 -right-3.5 w-4 h-4 text-center text-xs ${className}`}>
          {count}
        </span>
      )}
    </div>
  );
};

export default IconCounter;
