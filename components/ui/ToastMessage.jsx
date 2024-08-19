import { Activity, ChevronDown } from "lucide-react";
import React from "react";
// import toast, { Toaster } from "react-hot-toast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastMessage = (message) => {
  return toast.success(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
      backgroundColor: "white",
      color: "#2ecc71", // Light green color
      border: "1px solid #2ecc71",
      fontSize: "small",
    },
    icon: <div style={{ color: "#2ecc71" , marginRight:"1rem" }}><Activity/></div>, // Light green icon
    progressClassName: {
      backgroundColor: '#2ecc71', // Light green color for the progress bar
    },
  });

};

export default ToastMessage;
