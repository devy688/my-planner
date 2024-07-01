import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    isSameMonth,
    isSameDay,
    addDays,
    format,
} from 'date-fns';
import './RenderCells.css';

export default function RenderCells({
    currentMonth,
    selectedDate,
    onDateClick,
    monthData,
}) {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const makeColoredIcon = (formattedDate) => {
        let set = new Set();

        monthData.forEach((item) => {
            if (formattedDate === item.day?.toString() && item.isCompleted) {
                set.add([item.goalId, item.color]);
            }
        });

        const sortedByGoalId = Array.from(set).sort((a, b) =>
            a[0].localeCompare(b[0])
        );

        const getQuarterColors = (colors) => {
            const transparent = 'transparent';
            const quarterColors = Array(4).fill(transparent);
            const length = Math.min(colors.length, 4);

            if (length === 1) {
                quarterColors[0] = colors[0][1];
                quarterColors[1] = colors[0][1];
                quarterColors[2] = colors[0][1];
                quarterColors[3] = colors[0][1];
            } else if (length === 2) {
                quarterColors[0] = colors[0][1];
                quarterColors[1] = colors[0][1];
                quarterColors[2] = colors[1][1];
                quarterColors[3] = colors[1][1];
            } else if (length === 3) {
                quarterColors[0] = colors[0][1];
                quarterColors[1] = colors[1][1];
                quarterColors[2] = colors[2][1];
                quarterColors[3] = colors[2][1];
            } else if (length === 4) {
                quarterColors[0] = colors[0][1];
                quarterColors[1] = colors[1][1];
                quarterColors[2] = colors[2][1];
                quarterColors[3] = colors[3][1];
            }

            return quarterColors;
        };

        const [
            oneQuarterColor,
            twoQuarterColor,
            threeQuarterColor,
            fourQuarterColor,
        ] = getQuarterColors(sortedByGoalId);

        return (
            <div className='day-icon'>
                <div className='top'>
                    <div
                        className='one-quarter'
                        style={{
                            backgroundColor: oneQuarterColor,
                        }}
                    ></div>
                    <div
                        className='two-quarter'
                        style={{
                            backgroundColor: twoQuarterColor,
                        }}
                    ></div>
                </div>
                <div className='bottom'>
                    <div
                        className='three-quarter'
                        style={{
                            backgroundColor: threeQuarterColor,
                        }}
                    ></div>
                    <div
                        className='four-quarter'
                        style={{
                            backgroundColor: fourQuarterColor,
                        }}
                    ></div>
                </div>
            </div>
        );
    };

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'd');
            const cloneDay = day;
            const iconBox = makeColoredIcon(formattedDate);

            days.push(
                <div
                    className={`col cell ${
                        !isSameMonth(day, monthStart)
                            ? 'disabled'
                            : isSameDay(day, selectedDate)
                            ? 'selected'
                            : format(currentMonth, 'M') !== format(day, 'M')
                            ? 'not-valid'
                            : 'valid'
                    }`}
                    onClick={() => {
                        onDateClick(cloneDay);
                    }}
                    key={day}
                >
                    {iconBox}
                    <span
                        className={`day-text ${
                            format(currentMonth, 'M') !== format(day, 'M')
                                ? 'not-valid'
                                : ''
                        }`}
                    >
                        {formattedDate}
                    </span>
                </div>
            );
            day = addDays(day, 1);
        }

        rows.push(
            <div className='row' key={day}>
                {days}
            </div>
        );
        days = [];
    }

    return <div className='body'>{rows}</div>;
}
