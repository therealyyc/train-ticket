import React,{Fragment} from 'react'
import './Submit.css'

function Submit() {
    return (
        <Fragment>
            <div className="submit">
            <button type="submit" className="submit-button">
                {' '}
                搜索{' '}
            </button>
            </div>
        </Fragment>
    )
}

export default Submit;