import { useState } from 'react';
import Calendar from '../../components/Calendar/Calendar';
import TimeTable from '../../components/TimeTable/TimeTable';
import TotalTimeSummary from '../../components/TotalTimeSummary/TotalTimeSummary';
import '../../components/Calendar/Calendar.css';
import './ActivityLog.css';

export default function ActivityLog() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isTodoUpdated] = useState(false);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className='activity-log-container'>
            <div className='calendar-layout'>
                <Calendar
                    selectedDate={selectedDate}
                    onDateChange={handleDateChange}
                    isTodoUpdated={isTodoUpdated}
                />
            </div>
            <div className='activity-log-division-line'></div>
            <div className='timetable-layout'>
                <TimeTable selectedDate={selectedDate} />
                <TotalTimeSummary selectedDate={selectedDate} />
            </div>
        </div>
    );
}
