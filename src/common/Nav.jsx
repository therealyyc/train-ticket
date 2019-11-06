import React,{useMemo} from 'react'
import './Nav.css'

import classnames from 'classnames';
import PropTypes from 'prop-types';
import dayjs from 'dayjs'

function Nav(props) {
    const {
        date,
        prev,
        next,
        isPrevDisabled,
        isNextDisabled
    } = props
    console.log(date)

    const currentString = useMemo(() => {
        const d = dayjs(date);
        return d.format('M月D日 ')
    }, [date]);

    return (
        <div className='nav-wrapper'>
        <div className="nav">
            <span
                onClick={prev}
                className={
                    classnames('nav-prev', {
                        'nav-disabled':isPrevDisabled
                    })
                }
            >
                前一天
            </span>
            <span className="nav-current">{currentString}</span>
            <span
                onClick={next}
                className={
                    classnames('nav-next', {
                        'next-disabled':isNextDisabled
                    })
                }
            >
                后一天
            </span>
            </div>
        </div>
    )
}

export default Nav


Nav.propTypes = {
    prev: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
    isPrevDisabled: PropTypes.bool.isRequired,
    isNextDisabled: PropTypes.bool.isRequired,
};


