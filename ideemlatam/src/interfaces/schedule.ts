export interface ScheduleDay {
    day: number;
    type: number;
  }
  
  export interface Schedule {
    id: number; 
    name: string;
    abreviatura: string;
    order: number;
    active: boolean;
    startTime: string; // Format "HH:mm:ss"
    endTime: string;   // Format "HH:mm:ss"
    days: ScheduleDay[];
  }
  