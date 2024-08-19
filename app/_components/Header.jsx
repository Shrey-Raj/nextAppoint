"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import MyDropdownMenu from "./MyDropdownMenu";
// import { logoutAPI } from "../_utils/GlobalApi";
import api from "../_utils/GlobalApi";

import { useSession } from "../sessionValidator";
import ToastMessage from "@/components/ui/ToastMessage";
import { useRouter } from "next/navigation";

const Header = () => {
  const Menu = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "Explore",
      path: "/explore",
    },
    {
      id: 3,
      name: "Contact Us",
      path: "#contactus",
    },
  ];

  const session = useSession();
  const user = session?.user?.data;

  const router = useRouter();

  // console.log("USER FROM HEADER = ", user);

  const logoutHandler = async () => {
    const res = await api.logoutAPI();
    if (res.error) {
      ToastMessage("Couldn't Logout. Try Again");
    } else {
      router.push("/");
      ToastMessage("Logged Out Successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <div className="flex justify-between items-center p-2 shadow-sm">
      <div className="flex items-center gap-10 ">
        <Link href="/">
          <Image src="/logo.svg" width={200} height={100} alt="logo" />
        </Link>

        <ul className="hidden md:flex gap-8 ">
          {Menu.map((item) => (
            <Link key={item.id} href={item.path}>
              <li className="hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out">
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="flex justify-center content-center my-auto">
        {user ? (
          <div className="flex items-center justify-between gap-2">
              <h3 className="">
                <span className="text-black font-semibold">Hello, </span>
                <span className="text-primary font-normal uppercase drop-shadow-lg shadow-black">
                  {user.username}
                </span>
              </h3>
            <Popover>
              <PopoverTrigger>
                <Image
                  src={
                    user?.picture ||
                    "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                  }
                  alt="profile-image"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent className="w-44">
                <ul className="flex flex-col gap-2">
                  <Link
                    href="/my-booking"
                    className="cursor-pointer hover:bg-slate-100 p-2 rounded-md"
                  >
                    My Booking
                  </Link>
                  <li className="cursor-pointer hover:bg-slate-100 p-2 rounded-md">
                    <button className="border-none" onClick={logoutHandler}>
                      Logout
                    </button>
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <>
            <Button>
              <Link href="/login">Login</Link>
            </Button>
          </>
        )}
        <ul className="block md:hidden ml-5 my-auto">
          <MyDropdownMenu />
        </ul>
      </div>
    </div>
  );
};

export default Header;
