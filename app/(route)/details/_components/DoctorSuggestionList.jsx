"use client"
import GlobalApi from '@/app/_utils/GlobalApi';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { GraduationCap } from 'lucide-react';

function DoctorSuggestionList() {
    const [doctorList,setDoctorList]=useState([]);

    const getDoctorList=()=>{
      GlobalApi.getDoctorList().then(resp=>{
        // console.log(resp.data.data);
        setDoctorList(resp.data.data);
      })
    }

    useEffect(()=>{
      getDoctorList();
    },[getDoctorList]); 


  return (
    <div className='p-4 border-[1px] mt-5 md:ml-5 rounded-lg w-full max-h-screen'>
    <h2 className='mb-3 font-bold'>Suggestions</h2>
    <div className='flex flex-col gap-3 overflow-y-scroll max-h-[calc(100vh-10rem)]'>
      {doctorList.map((doctor, index) => (
        <Link 
          key={index} 
          href={'/details/' + doctor.id} 
          className='mb-4 p-3 shadow-sm cursor-pointer hover:bg-slate-100 rounded-lg flex items-center gap-3'
        >
          <Image 
            src={doctor.attributes.image.data[0].attributes.url} 
            width={70} 
            height={70} 
            className='w-[70px] h-[70px] rounded-full object-cover' 
            alt={`Image of ${doctor.attributes.name}`}
          />
          <div className='mt-3 lg:flex-col flex gap-1 items-baseline sm:flex-col'>
            <h2 className='text-[11px] bg-blue-100 p-1 font-bold rounded-full px-2 text-primary capitalize'>
              {doctor.attributes.categories.data.attributes.name}
            </h2>
            <h2 className='font-medium text-sm md:ml-3'>{doctor.attributes.name}</h2>
            <h2 className='text-primary text-xs flex gap-2 m-auto md:ml-4 sm:ml-4'>
              <GraduationCap />
              {doctor.attributes.year_of_experience} YOE
            </h2>
          </div>
        </Link>
      ))}
    </div>
  </div>
  )
}

export default DoctorSuggestionList