"use client";
import React, { useState, useEffect } from "react";
import GlobalApi from "@/app/_utils/GlobalApi";
import ExploreAllDoc from "./_components/ExploreAllDoc";
import { InterPageLoader } from "@/components/ui/Loader";

const Explore = () => {
  const [doctorList, setDoctorList] = useState([]);
  const [loading, setLoading] = useState(true);
  const getDoctorList = () => {
    GlobalApi.getDoctorList().then((resp) => {
      // console.log(resp.data.data);
      setLoading(false);
      setDoctorList(resp.data.data);
    });
  };

  useEffect(() => {
    getDoctorList();
  }, []);

  return (
    <>
      {loading ? (
        <InterPageLoader />
      ) : (
        <ExploreAllDoc doctorList={doctorList} />
      )}
    </>
  );
};

export default Explore;
