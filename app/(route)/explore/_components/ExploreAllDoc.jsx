"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { SearchCheck } from 'lucide-react';

const ExploreAllDoc = ({doctorList, initialSearchTerm = ''}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  // console.log('Doctor list from Explore all docs = ' , doctorList , initialSearchTerm );

  const filteredDoctors = doctorList.filter(doctor => 
    (doctor.attributes.name.toLowerCase().includes(searchTerm.toLowerCase())
   || doctor.attributes.about.toLowerCase().includes(searchTerm.toLowerCase())) 
  );

  // console.log('Filtered list from Explore all docs = ' , filteredDoctors); 

  return (
    <div className="p-4">
    <h1 className="text-lg font-bold mb-8">Explore All Doctors</h1>
      <div className="mb-6 flex w-full p-2 border border-gray-300 rounded-lg justify-between" >
        <input
          type="text"
          placeholder="Search for doctors by name or category..."
          value={searchTerm}
          onChange={(e) => {setSearchTerm(e.target.value) ; }}
        /><SearchCheck/>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {filteredDoctors.length > 0 ? filteredDoctors.map((doctor, index) => index<9&&(
          <Link
            key={index}
            href={"/details/" + doctor.id}
            className="group relative block bg-black "
          >
            <Image
              src={doctor?.attributes?.image?.data[0]?.attributes?.url}
              alt={`Image of ${doctor.attributes.name}`}
              width={500}
              height={100}
              className="absolute h-full w-full inset-0 object-cover opacity-75 transition-opacity group-hover:opacity-50"
            />
            <div className="relative p-4 sm:p-6 lg:p-8">
              <p className="text-sm font-medium uppercase tracking-widest text-primary mt-40">
                {doctor.attributes.categories.data.attributes.name}
              </p>
              <p className="text-xl font-bold text-white sm:text-2xl">
                {doctor.attributes.name}
              </p>
              <div className="mt-32 sm:mt-48 lg:mt-64">
                <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm text-white">
                    {doctor.attributes.about}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))
        : // Skelton Effect
            [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div key={index} className="h-[360px] bg-slate-200 w-full rounded-lg animate-pulse"></div>
            ))
        }
      </div>
    </div>
  );
};

export default ExploreAllDoc;
