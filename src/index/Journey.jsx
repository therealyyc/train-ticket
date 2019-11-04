import React,{Fragment} from 'react'
import './Journey.css'
import switchImg from './imgs/switch.svg'

function Journey(props) {
    const {
        to,
        from,
        exchangeFromTo,
        showCitySelector
     }= props
    return (
        <Fragment>
            <div className='journey'>
                {/* 传递一个Boolean值表示修改的是左边的还是右边的 */}
                <div className="journey_station" onClick={() => showCitySelector(true)}>
                    <input
                        type="input"
                        name="from"
                        value={from}
                        readOnly
                        className="journey-input journey-from"
                    ></input>
                </div>
                <div className="journey-switch" onClick={() => exchangeFromTo()}>
                <img src={switchImg} width="70" height="40" alt="switch" />
                </div>
                <div className="journey_station" onClick={() => showCitySelector(false)}>
                    <input
                        type="input"
                        name="to"
                        value={to}
                        readOnly
                        className="journey-input journey-to"
                    ></input>
                </div>
            </div>
        </Fragment>
    )
}

export default Journey;