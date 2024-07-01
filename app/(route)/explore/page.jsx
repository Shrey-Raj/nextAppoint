"use client";
import React, { useState, useEffect } from "react";
import GlobalApi from "@/app/_utils/GlobalApi";
import ExploreAllDoc from "./_components/ExploreAllDoc";

const Explore = () => {
  const [doctorList, setDoctorList] = useState([]);

  const getDoctorList = () => {
    GlobalApi.getDoctorList().then((resp) => {
      // console.log(resp.data.data);
      setDoctorList(resp.data.data);
    });
  };

  useEffect(() => {
    getDoctorList();
  }, []);

  return (
    <>
      <h1>Explore All Doctors</h1>
      <ExploreAllDoc doctorList={doctorList} />
    </>
  );
};

export default Explore;
