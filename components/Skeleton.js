import React from "react";

export default function Skeleton() {
  return (
    <div className="w-full text-center ">
      <div className="bg-gray-200 h-32 w-96  m-auto"></div>
      <div className="bg-gray-200 h-10 w-96 mt-3 m-auto"></div>

      <div className="flex justify-center mt-3 text-left flex-wrap">
        <div className="other-position md:mr-8 bg-gray-200 w-96 h-12"></div>
        <div className="former-position bg-gray-200 w-96 h-12"></div>
      </div>
      <div className="w-4/5 text-left m-auto mt-3 bg-gray-200  h-16"></div>
    </div>
  );
}
