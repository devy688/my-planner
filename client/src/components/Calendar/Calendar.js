import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMonths, subMonths } from 'date-fns';
import axios from 'axios';
import { setSelectedDateForPomodoro } from '../../redux/selectedDateSlice.js';
import RenderHeader from './RenderHeader';
import RenderDays from './RenderDays';
import RenderCells from './RenderCells';
import './Calendar.css';

export default function Calendar(props) {
    const user = useSelector((state) => state.user.userInfo);
    const goals = useSelector((state) => state.goals.goals);
    const dispatch = useDispatch();

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [monthData, setMonthData] = useState([]);

    const readMonthLists = async (selectedMonth) => {
        try {
            const date = new Date(selectedMonth);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            const response = await axios.post('/api/lists/read-month', {
                userId: user._id,
                goals,
                year,
                month,
            });
            console.log(
                'axios /api/lists/read-month >>> ',
                response.data.message
            );

            setMonthData(response.data.lists);
            return response.data.lists;
        } catch (error) {
            console.error('error >>> ', error);
            alert('/api/lists/read-month 호출 중 에러가 발생하였습니다.');
        }
    };

    useEffect(() => {
        async function fetchData() {
            await readMonthLists(currentMonth);
        }
        fetchData();
    }, [currentMonth, props.isTodoUpdated, goals]);

    const prevMonth = async () => {
        const selectedMonth = subMonths(currentMonth, 1);
        setCurrentMonth(selectedMonth);

        // 이전 달의 마지막날
        const lastDayOfMonth = new Date(
            selectedMonth.getFullYear(),
            selectedMonth.getMonth() + 1,
            0
        );
        props.onDateChange(lastDayOfMonth);
        setSelectedDate(lastDayOfMonth);

        if (props.handlePomodoroLayer) {
            props.handlePomodoroLayer(false);
        }

        dispatch(setSelectedDateForPomodoro(lastDayOfMonth));

        await readMonthLists(selectedMonth);
    };
    const nextMonth = async () => {
        const selectedMonth = addMonths(currentMonth, 1);
        setCurrentMonth(selectedMonth);

        // 다음 달의 첫날
        const firstDayOfMonth = new Date(
            selectedMonth.getFullYear(),
            selectedMonth.getMonth(),
            1
        );
        props.onDateChange(firstDayOfMonth);
        setSelectedDate(firstDayOfMonth);

        if (props.handlePomodoroLayer) {
            props.handlePomodoroLayer(false);
        }

        dispatch(setSelectedDateForPomodoro(firstDayOfMonth));

        await readMonthLists(selectedMonth);
    };

    const onDateClick = (day) => {
        setSelectedDate(day);
        props.onDateChange(day);

        if (props.handlePomodoroLayer) {
            props.handlePomodoroLayer(false);
        }

        dispatch(setSelectedDateForPomodoro(day));
    };

    return (
        <div className='calendar'>
            <RenderHeader
                currentMonth={currentMonth}
                prevMonth={prevMonth}
                nextMonth={nextMonth}
            />
            <RenderDays />
            <RenderCells
                currentMonth={currentMonth}
                selectedDate={selectedDate}
                onDateClick={onDateClick}
                monthData={monthData}
            />
        </div>
    );
}
