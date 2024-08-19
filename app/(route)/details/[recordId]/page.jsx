"use client";
import GlobalApi from '@/app/_utils/GlobalApi';
import React, { useEffect, useState } from 'react';
import DoctorDetail from '../_components/DoctorDetail';
import DoctorSuggestionList from '../_components/DoctorSuggestionList';
import {InterPageLoader} from '@/components/ui/Loader';
// import Loader from '../_components/Loader'; // Import the Loader component

function Details({ params }) {
  const [doctor, setDoctor] = useState(null); // Initialize doctor state as null
  const [loading, setLoading] = useState(true); // State to track loading status

  const getDoctorById = () => {
    GlobalApi.getDoctorById(params.recordId).then(resp => {
      setDoctor(resp.data.data);
      setLoading(false); // Set loading to false after data is fetched
    });
  };

  useEffect(() => {
    getDoctorById();
  }, [params.recordId]); // Ensure the effect runs when params.recordId changes

  return (
    <div className='p-5 md:px-10'>
      <h2 className='font-bold text-[22px]'>Details</h2>

      <div className='grid grid-cols-1 lg:grid-cols-4'>
        {/* Doctor Detail */}
        <div className='col-span-3'>
          {loading ? <InterPageLoader /> : <DoctorDetail doctor={doctor} />} {/* Show loader or DoctorDetail */}
        </div>
        
        {/* Doctor Suggestion */}
        <div>
          <DoctorSuggestionList />
        </div>
      </div>
    </div>
  );
}

export default Details;
