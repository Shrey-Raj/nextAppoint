"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import GlobalApi from '@/app/_utils/GlobalApi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

export function DropdownMenuRadioGroupDemo() {
  const [categoryList,setCategoryList]=useState([]);
  const params=usePathname();
  const category=params.split('/')[2];
  const [position, setPosition] =  useState(category);
    
    useEffect(()=>{
      const getCategoryList=()=>{
        GlobalApi.getCategory().then(resp=>{
          setCategoryList(resp.data.data);
        })
      }
    getCategoryList();
  },[])

  

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Select Category<ChevronDown className='my-auto'/></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>

          {categoryList.map((item,index)=>(
            <DropdownMenuRadioItem value={index} key={index}>
                <Link href={'/search/'+item?.attributes?.name}
                className={`p-2 flex gap-2
                text-[14px]
                text-blue-600
                items-center
                rounded-md cursor-pointer w-full
                ${category==item.attributes.name&&'bg-blue-100'}
                `}>
                <Image src={item.attributes?.Icon?.data.attributes?.url}
                alt='icon'
                width={15}
                height={15}/>
                <label className='capitalize text-black'>{item.attributes.name}</label>
                </Link>
            </DropdownMenuRadioItem>
          ))
          }
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
