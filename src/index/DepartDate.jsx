import React,{Fragment, useMemo} from 'react'
import './DepartDate.css'
import PropTypes from 'prop-types'
import { h0 } from '../common/fp'
import dayjs from 'dayjs'


function DepartDate(props) {
    const { 
        time,
        onClick
    } = props
    
    const h0OfDepart = h0(time)
    const departDate = new Date(h0OfDepart);

    const departDateString = useMemo(() => {
        return dayjs(h0OfDepart).format('YYYY-MM-DD');
    }, [h0OfDepart])
    
    const isToday = h0OfDepart === h0()

    const weekString =
        '周' +
        ['日', '一', '二', '三', '四', '五', '六'][departDate.getDay()] +
        (isToday ? '(今天)' : '');


    return (
        <Fragment>
            <div className="depart-date" onClick={onClick}>
                <input type="hidden" name="date" value={ departDateString }></input>
                {departDateString} <span className="depart-week">{weekString}</span>
            </div>
        </Fragment>
    )
}

DepartDate.propTypes = {
    time: PropTypes.number.isRequired,
    onClick:PropTypes.func.isRequired
}

export default DepartDate;