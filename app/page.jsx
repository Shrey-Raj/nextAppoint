'use client'
import Hero from './_components/Hero';
import CategorySearch from './_components/CategorySearch';
import DoctorList from './_components/DoctorList';
import GlobalApi from './_utils/GlobalApi';
import { useEffect, useState } from 'react';

export default function Home() {
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    const getDoctorList = () => {
      GlobalApi.getDoctorList().then((resp) => {
        // console.log(resp.data.data);
        setDoctorList(resp.data.data);
      });
    };
  
    getDoctorList();
  }, []);



  return (
    <div>
      <Hero />
      <CategorySearch />
      {doctorList.length > 0 && <DoctorList doctorList={doctorList} />}
    </div>
  );
}
