const Skeleton = () => {
  return (
    <div className="animate-pulse bg-gray-800 rounded-lg overflow-hidden">
      <div className="h-48 bg-gray-700"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default Skeleton;
