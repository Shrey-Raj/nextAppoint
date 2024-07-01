'use client'
import React, { useState , useEffect } from 'react';
import ExploreAllDoc from '../_components/ExploreAllDoc';
import GlobalApi from '@/app/_utils/GlobalApi';

const ExplorePage = ({ params }) => {
  const { searchTerm } = params;
  
  // console.log('Params  : ' , params) ; 

  const [doctorList, setDoctorList] = useState([]);
  useEffect(() => {
    getDoctorList();
  }, []);

  const getDoctorList = () => {
    GlobalApi.getDoctorList().then((resp) => {
      // console.log(resp.data.data);
      setDoctorList(resp.data.data);
    });
  };

  return <ExploreAllDoc doctorList={doctorList} initialSearchTerm={searchTerm || ''} />;
};

export default ExplorePage;
