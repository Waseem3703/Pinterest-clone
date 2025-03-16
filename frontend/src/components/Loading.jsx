export const Loading = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="relative flex items-center justify-center">
          {/* Outer Ring */}
          <div className="absolute h-24 w-24 border-4 border-gray-300 rounded-full"></div>
          {/* Animated Spinner */}
          <div className="h-24 w-24 border-t-4 border-red-500 border-solid rounded-full animate-spin"></div>
          {/* Pulsating Effect */}
          <div className="absolute h-24 w-24 bg-red-500 opacity-20 rounded-full animate-ping"></div>
        </div>
        {/* Loading Text */}
        <p className="mt-4 text-gray-600 text-lg font-medium animate-pulse">Loading, please wait...</p>
      </div>
    );
  };
  