const Itemloader = ({ className }) => {
  return (
    <div className={`rounded-md ${className}`}>
      <div className="animate-pulse flex-col space-x-4">
        <div className="rounded-lg bg-gray-100 h-48 w-full mb-4" />
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-100 rounded w-3/4" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-100 rounded" />
            <div className="h-4 bg-gray-100 rounded w-5/6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Itemloader;
