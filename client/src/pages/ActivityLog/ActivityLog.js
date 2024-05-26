import { useState } from 'react';
import Calendar from '../../components/Calendar/Calendar';
import TimeTable from '../../components/TimeTable/TimeTable';
import TotalTimeSummary from '../../components/TotalTimeSummary/TotalTimeSummary';
import '../../components/Calendar/Calendar.css';
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
