import Image from "next/image";
import Link from "next/link";
import React from "react";

function DoctorList({ doctorList, heading = "Popular Doctors" }) {
  // console.log("doctorList = ", doctorList);

  const imageUrl = "/logo.svg";

  return (
    <div className="mb-10 px-8">
      <h2 className="font-bold text-xl capitalize">{heading}</h2>

      <div
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3
        gap-7 mt-4 lg:grid-cols-3"
      >
        {doctorList.length > 0
          ? doctorList.map(
              (doctor, index) =>
                index < 6 && (
                  <div
                    key={doctor.id} // Use doctor's id as key
                    className="border-[1px] rounded-lg p-3 cursor-pointer hover:border-primary hover:shadow-sm transition-all ease-in-out flex flex-col justify-between"
                  >
                    <Image
                      src={
                        doctor?.attributes?.image?.data[0]?.attributes?.url ||
                        imageUrl
                      }
                      alt="doctor"
                      width={500}
                      height={200}
                      className="lg:h-[300px] md:h-[300px] sm:h-[200px] w-full object-cover rounded-lg"
                    />
                    <div className="mt-3 flex flex-col flex-grow">
                      <h2 className="text-[12px] bg-blue-100 p-1 rounded-full px-2 text-primary font-bold my-2 mb-3">
                        {doctor.attributes.name}
                      </h2>
                      <h2 className="font-bold">{doctor.attributes.name}</h2>
                      <h2 className="text-primary text-sm mb-2">
                        {doctor.attributes.year_of_experience} YOE
                      </h2>
                      <h2 className="text-gray-500 text-sm flex-grow">
                        {doctor.attributes.about}
                      </h2>
                    </div>
                    <Link
                      href={"/details/" + doctor?.id}
                      className="w-full mt-auto "
                    >
                      <h2 className="p-2 px-3 border-[1px] border-primary text-primary rounded-full w-full text-center text-[11px] mt-2 cursor-pointer hover:bg-primary hover:text-white hover:text-[12px] transition-all ease-in-out">
                        Book Now
                      </h2>
                    </Link>
                  </div>
                )
            )
          : // Skelton Effect
            [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div key={index} className="h-[220px] bg-slate-200 w-full rounded-lg animate-pulse"></div>
            ))}
      </div>
    </div>
  );
}

export default DoctorList;


