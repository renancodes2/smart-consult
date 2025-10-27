"use client";

import { get } from "http";
import { AvailableTime } from "../main";
import { useEffect, useState } from "react";

interface AppointmentTimesProps {
  selectedDate: Date;
  selectedTime: string;
  blockedTimes: string[];
  availableTimes: AvailableTime[];
  getDuration: number;
  clinicTimes: string[];
  handleSelectTime: (time: string) => void;
}

export function AppointmentTimes({ 
  availableTimes,
  blockedTimes,
  getDuration,
  selectedDate,
  clinicTimes,
  handleSelectTime,
  selectedTime
}: AppointmentTimesProps){

  const [isDisabled, setIsDisabled] = useState<Array<string>>([]);

  useEffect(() => {
    const res = isSelected(getDuration, selectedTime);
    setIsDisabled(res);
  }, [selectedTime])


function isSelected(getDuration: number, selectedTime: string) {
    let times = new Set<string>();

    const [hours, minutes] = selectedTime.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) {
        console.error("selectedTime não é uma string de horário (HH:MM) válida.");
        return [];
    }
    
    let currentTotalMinutes = (hours * 60) + minutes;
    const intervalMinutes = 30;
    
    for (let i = 0; i < getDuration; i++) {
        
        const newHours = Math.floor(currentTotalMinutes / 60);
        const newMinutes = currentTotalMinutes % 60;
        
        const formattedHour = String(newHours).padStart(2, '0');
        const formattedMinute = String(newMinutes).padStart(2, '0');
        
        const newTime = `${formattedHour}:${formattedMinute}`;
        
        times.add(newTime);
        
        currentTotalMinutes += intervalMinutes; 
    }

    return Array.from(times);
}
  return (
    <div 
      className="
            grid 
            grid-cols-4
            md:grid-cols-5 
            max-w-2xl 
            mx-auto 
            gap-4
            bg-gray-200
            border-1 
            border-dashed 
            m-2
            rounded-md p-5
          "
      >
      {availableTimes.map((timeObj) => (
        <button 
          key={timeObj.time}
          onClick={() => 
            handleSelectTime(
              blockedTimes.includes(timeObj.time) 
              ? "" 
              : timeObj.time
            )}
          className={`
            bg-gray-50 
            rounded-md 
            shadow-md 
            cursor-pointer 
            py-3
            disabled:cursor-not-allowed 
            disabled:bg-gray-300
            ${selectedTime === timeObj.time ? 'border-1 border-[#000010]' : ''}
            ${blockedTimes.includes(timeObj.time) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}
          `}
          
        >
          {timeObj.time}
        </button>
      ))}
    </div>
  )
}