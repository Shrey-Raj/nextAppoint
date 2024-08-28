"use client";
import GlobalApi from '@/app/_utils/GlobalApi';
import React, { useCallback, useEffect, useState } from 'react';
import DoctorDetail from '../_components/DoctorDetail';
import DoctorSuggestionList from '../_components/DoctorSuggestionList';
import {InterPageLoader} from '@/components/ui/Loader';

function Details({ params }) {
  const [doctor, setDoctor] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const getDoctorById = () => {
      GlobalApi.getDoctorById(params.recordId).then(resp => {
        setDoctor(resp.data.data);
        setLoading(false); 
      });
    };

    getDoctorById();
  }, [params.recordId]);

  return (
    <div className='p-5 md:px-10'>
      <h2 className='font-bold text-[22px]'>Details</h2>

      <div className='grid grid-cols-1 lg:grid-cols-4'>
        <div className='col-span-3'>
          {loading ? <InterPageLoader /> : <DoctorDetail doctor={doctor} />} 
        </div>
        
        <div>
          <DoctorSuggestionList />
        </div>
      </div>
    </div>
  );
}

export default Details;
