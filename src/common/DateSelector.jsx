import React from "react"
import classnames from 'classnames'
import PropTypes from 'prop-types'
import Header from './Header'
import './DateSelector.css'
import { h0 } from '../common/fp';


function Day(props) {
    const {
        day,
        onSelect
    } = props

    /**
     * 对日期进行处理
     */
    const classes = []

    const now = h0()
    if (day < now) {
        classes.push('disabled')
    }
    if ([0, 6].includes(new Date(day).getDay())) {
        classes.push('weekend')
    }
    
    const dateString = now === day ? '今天' : (day ? new Date(day).getDate() : '')
    return (
        <td className={classnames(classes)} onClick={() => onSelect(day)}>
            {dateString}
        </td>
    )
}

Day.propTypes = {
    day: PropTypes.number,
    onSelect: PropTypes.func.isRequired,
}

function Week(props) {
    const {
        days,
        onSelect
    } = props
    
    return (
        <tr className="date-table-days">
            {days.map((day, index) => {
                return (
                    <Day
                        day={day}
                        key={index}
                        onSelect={onSelect}
                    >
                    </Day>
                )
            })}
        </tr>
    )
}

Week.propTypes = {
    days: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
};

function Month(props) {
    const {
        startTimeInMonth,
        onSelect
    } = props
    /**
     * 获取日期
     */
    const startDay = new Date(startTimeInMonth)
    const currentDay = new Date(startTimeInMonth)
    let days = [];
    while ( currentDay.getMonth() === startDay.getMonth() ) {
        days.push(currentDay.getTime())
        currentDay.setDate(currentDay.getDate() + 1)
    }
    /**
     * 获取前后补充空位
     */
    days = new Array(startDay.getDay() ? startDay.getDay() - 1 : 6)
        .fill(null)
        .concat(days)
    
    const lastday = new Date(days[days.length - 1])

    days = days.concat(new Array(lastday.getDay() ? 7 - lastday.getDay() : 0)
        .fill(null))
    
    const weeks = []
    for (let row = 0; row < days.length/7; row++){
        const week = days.slice(row * 7, (row + 1) * 7)
        weeks.push(week)
    }
    
    return (
        <table className="date-table">
            <thead>
                <tr>
                    <td colSpan="7">
                        <h5>
                            {startDay.getFullYear()}年{startDay.getMonth() + 1}
                            月
                        </h5>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr className="data-table-weeks">
                    <th>周一</th>
                    <th>周二</th>
                    <th>周三</th>
                    <th>周四</th>
                    <th>周五</th>
                    <th className="weekend">周六</th>
                    <th className="weekend">周日</th>
                </tr>
                {
                weeks.map((week, index) => {
                        return (
                            <Week
                                key={index}
                                days={week}
                                onSelect={onSelect}
                            >
                            </Week>
                        )
                    })
                }
            </tbody>
            
        </table>
    )
}

Month.propTypes = {
    startingTimeInMonth: PropTypes.number,
    onSelect: PropTypes.func.isRequired,
};

function DateSelector(props) {
    const {
        show,
        onSelect,
        onBack
    } = props

    const now = new Date()
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)
    now.setDate(1)

    const monthSequence = [now.getTime()]

    now.setMonth(now.getMonth() + 1)
    monthSequence.push(now.getTime())

    now.setMonth(now.getMonth() + 1)
    monthSequence.push(now.getTime())

    
    return (
        <div className= {classnames('date-selector',{hidden:!show})}>
            <Header title="日期选择" onBack={onBack}></Header>
            {/* <div className="date-selector-tables"></div> */}
            {
                monthSequence.map(month => {
                    return <Month
                            key={month}
                            startTimeInMonth={month}
                            onSelect = {onSelect}
                        ></Month>
                })
            }
        </div>
    )
}

DateSelector.propTypes = {
    show: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired
}

export default DateSelector