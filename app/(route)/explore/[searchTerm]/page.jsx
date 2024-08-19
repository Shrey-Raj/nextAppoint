"use client";
import React, { useState, useEffect } from "react";
import ExploreAllDoc from "../_components/ExploreAllDoc";
import GlobalApi from "@/app/_utils/GlobalApi";
import { InterPageLoader } from "@/components/ui/Loader";

const ExplorePage = ({ params }) => {
  const { searchTerm } = params;
  const [loading, setLoading] = useState(true);
  // console.log('Params  : ' , params) ;

  const [doctorList, setDoctorList] = useState([]);
  useEffect(() => {

    const getDoctorList = () => {
      GlobalApi.getDoctorList().then((resp) => {
        // console.log(resp.data.data);
        setLoading(false);
        setDoctorList(resp.data.data);
      });
    };

    getDoctorList();
  }, []);

  

  return (
    <>
      {loading ? (
        <InterPageLoader />
      ) : (
        <ExploreAllDoc
          doctorList={doctorList}
          initialSearchTerm={searchTerm || ""}
        />
      )}
    </>
  );
};

export default ExplorePage;
