import { useState } from 'react';
import Calendar from '../Calendar/Calendar';
import TimeTable from '../TimeTable/TimeTable';
import TotalTimeSummary from '../TotalTimeSummary/TotalTimeSummary';
import '../Calendar/Calendar.css';
import './ActivityLog.css';

export default function ActivityLog(props) {
    return (
        <div className='activity-log-container'>
            <div className='calendar-layout'>
                <Calendar />
            </div>
            <div className='activity-log-division-line'></div>
            <div className='timetable-layout'>
                <TimeTable />
                <TotalTimeSummary todoData={props.todoData} />
            </div>
        </div>
    );
}
