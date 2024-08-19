import Image from "next/image";

export const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
        <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
      </div>
    </div>
  );
};

export const InterPageLoader = () => {
  return (
    <div className="flex justify-center items-center h-[50vh]">
      <div className="mx-auto animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
    </div>
  );
};
