"use client";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import React from "react";

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const contextClass = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
    warning: "bg-orange-400",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-400",
  };

  return (
    <>
      {children}
      <ToastContainer
        toastClassName={(context) => `${contextClass[context?.type || "default"]} relative flex items-center p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer`}
        bodyClassName={() => "flex text-sm font-white font-med block p-2 gap-1"}
        position="top-center"
        autoClose={3000000}
      />
    </>
  );
}