import { format } from 'date-fns';
import { Icon } from '@iconify/react';
import './RenderHeader.css';

export default function RenderHeader({ currentMonth, prevMonth, nextMonth }) {
    return (
        <div className='header row'>
            <div className='col col-start'>
                <span className='text'>
                    <span className='text date'>
                        {format(currentMonth, 'yyyy')}년{' '}
                        {format(currentMonth, 'M')}월
                    </span>
                </span>
            </div>
            <div className='col col-end'>
                <Icon
                    icon='fluent:ios-arrow-24-filled'
                    className='icon left'
                    onClick={prevMonth}
                />
                <Icon
                    icon='fluent:ios-arrow-rtl-24-filled'
                    className='icon right'
                    onClick={nextMonth}
                />
            </div>
        </div>
    );
}
