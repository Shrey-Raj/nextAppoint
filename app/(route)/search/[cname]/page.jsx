"use client";
import DoctorList from "@/app/_components/DoctorList";
import GlobalApi from "@/app/_utils/GlobalApi";
import React, { useEffect, useState } from "react";

function Search({ params }) {
  const [doctorList, setDoctorList] = useState([]);

  const getDoctors = () => {
    GlobalApi.getDoctorByCategory(params.cname).then((resp) => {
      // console.log("All ", params.cname, " = ", resp.data.data);
      setDoctorList(resp.data.data);
    });
  };

  useEffect(() => {
    // console.log(params.cname);
    getDoctors();
  }, [getDoctors]);
  
  return (
    <div className="mt-5">
      <DoctorList heading={params.cname} doctorList={doctorList} />
    </div>
  );
}

export default Search;
