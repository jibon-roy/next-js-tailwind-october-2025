import React from "react";

const Loading = () => {
  return (
    <div className="h-[calc(100vh-170px)] w-full flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default Loading;
