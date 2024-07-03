import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignJustify } from 'lucide-react';
import Link from "next/link";


const MyDropdownMenu = () => {
  return (
    <DropdownMenu>
    <DropdownMenuTrigger><AlignJustify/></DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuSeparator />
      <Link href='/'>
        <DropdownMenuItem>Home</DropdownMenuItem>
      </Link>
      <Link href='/explore'>
        <DropdownMenuItem>Explore</DropdownMenuItem>
      </Link>
      <Link href='#contactus'>
        <DropdownMenuItem>Contact Us</DropdownMenuItem>
      </Link>
    </DropdownMenuContent>
  </DropdownMenu>
);
}

export default MyDropdownMenu