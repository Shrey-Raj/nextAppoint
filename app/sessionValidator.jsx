import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getSession } from "./_utils/lib";
import {Loader} from "@/components/ui/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastMessage from "@/components/ui/ToastMessage";

 const SessionContext = createContext(null);

export const useSession = () => useContext(SessionContext);

export default function SessionValidator({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const sessionData = await getSession();
        
        console.log(sessionData); 

        setSession(sessionData);
        const currentPath = pathname.split("/")[1];

        if (sessionData) {
          // If session is present, redirect from /login or /signup to /dashboard
          if (currentPath === "login" || currentPath === "signup") {
            ToastMessage("Logout to Login/Signup again!");
            router.push("/");
          }
        } else {
          // If session is not present, allow access only to /login or /signup
          if (currentPath !== "login" && currentPath !== "signup" && currentPath !== "/") {
            ToastMessage("Session Expired! You need to Login/Signup first. ");
            router.push("/");
          }
        }
      } catch (error) {
        console.error("Session check error:", error);
        ToastMessage("Failed to verify session. Please try again.");
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, [pathname, router]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <SessionContext.Provider value={session}>
      <ToastContainer />
      {children}
    </SessionContext.Provider>
  );
}
