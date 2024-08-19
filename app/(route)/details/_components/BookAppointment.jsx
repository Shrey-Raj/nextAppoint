import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Calendar } from "@/components/ui/calendar"
import { CalendarDays, Clock } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import GlobalApi , {getCurrentUser} from '@/app/_utils/GlobalApi'
import { toast , Toaster} from 'sonner'
import emailjs from '@emailjs/browser';
import { useSession } from '@/app/sessionValidator'

function BookAppointment({doctor}) {
    const [date, setDate]=useState(new Date());
    const [timeSlot,setTimeSlot]=useState();
    const [selectedTimeSlot,setSelectedTimeSlot]=useState();
    const [note,setNote]=useState();
    const session = useSession();
    const user = session?.user?.data;

    // console.log('Doctor details as on BookAppointment component : ' , doctor); 

    useEffect(()=>{
      getTime();
    },[])

    const getTime = () => {
      const timeList = [];
      for (let i = 10; i <= 12; i++) {
          timeList.push({
              time: i + ':00 AM'
          })
          timeList.push({
              time: i + ':30 AM'
          })
      }
      for (let i = 1; i <= 6; i++) {
          timeList.push({
              time: i + ':00 PM'
          })
          timeList.push({
              time: i + ':30 PM'
          })
      }

      setTimeSlot(timeList)
    }

    const saveBooking=()=>{
      const data={
        data:{
          UserName:user.username,
          Email:user.email,
          Time:selectedTimeSlot,
          Date:date,
          doctor:doctor.id,
          Note : note
        }
      }

      const service_id = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ; 
      const template_id = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ;  
      const user_id = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ;
       
      const docDetails = `Your Appointment with doctor ${doctor.attributes.name} has been confirmed! On Date : ${date} At ${selectedTimeSlot} with Your Note : ` ; 

      const templateParams = {
        to_name: user.username,
        from_email: user.email,
        from_name: 'Doctor Appointment App',
        message: docDetails + note,
      }; 
      

      GlobalApi.bookAppointment(data).then(resp=>{
        // console.log('appointment booked response = ' , resp);
        if(resp){
          emailjs.send(service_id, template_id, templateParams, user_id)
          .then((response) => {
            console.log('Email sent successfully!', response);
          })
          .catch((error) => {
            console.error('Error sending email:', error);
          });

          toast("Booking Confirmation sent on Email");
        }
      })
      .catch(err=> console.log('error is sending mail : ' , err)); 
    }

  const isPastDay=(day)=>{
    return day<=new Date();
  }
  return (
    <Dialog>
    <DialogTrigger>
      <Button className="mt-3 rounded-full">Book Appointment</Button>
    </DialogTrigger>
  
    <DialogContent className="min-w-fit p-0 sm:max-w-lg w-full overflow-y-auto max-h-[80vh]">
      <DialogHeader>
        <DialogTitle className='mt-3 font-bold p-2 text-center'>Book Appointment</DialogTitle>
        <DialogDescription>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-4">
              {/* Calendar */}
              <div className="flex flex-col gap-3 items-baseline w-full p-2">
                <h2 className="flex gap-2 items-center">
                  <CalendarDays className="text-primary h-3 w-3" />
                  Select Date
                </h2>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={isPastDay}
                  className="rounded-md border-2 w-full"
                />
              </div>
              {/* Time Slot */}
              <div className="p-2">
                <h2 className="flex gap-2 items-center mb-3">
                  <Clock className="text-primary h-5 w-5" />
                  Select Time Slot
                </h2>
                <div className="grid grid-cols-3 gap-2 border rounded-lg p-2">
                  {timeSlot?.map((item, index) => (
                    <h2
                      key={index}
                      onClick={() => setSelectedTimeSlot(item.time)}
                      className={`p-2 border cursor-pointer text-center hover:bg-primary hover:text-white rounded-full ${
                        item.time === selectedTimeSlot && 'bg-primary text-white'
                      }`}
                    >
                      {item.time}
                    </h2>
                  ))}
                </div>
              </div>
            </div>
            <Textarea
              className="mt-3 w-full"
              placeholder="Note"
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </DialogDescription>
      </DialogHeader>
  
      <DialogFooter className="sm:justify-end flex flex-col sm:flex-row gap-2 p-4">
        <DialogClose asChild>
          <>
            <Button
              className="text-red-500 border-red-500"
              variant="outline"
            >Close</Button>

            <Button
              disabled={!(date && selectedTimeSlot)}
              onClick={() => saveBooking()}
            >Submit</Button>
             <Toaster />
          </>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  

  )
}

export default BookAppointment; 

