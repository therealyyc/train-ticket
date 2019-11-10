import React,{useState, useCallback, memo, useMemo ,useReducer} from 'react'
import './Bottom.css'
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { ORDER_DEPART } from './constant';
import './Bottom.css';
import Slider from './Slider'


function checkedReducer(state,action) {
    const { type, payload } = action
    switch (type) {
        case 'toggle':
            const newState = { ...state }
            console.log(newState)
            if (payload in newState) {
                delete newState[payload]
            } else {
                newState[payload] = true
            }
            return newState
        case 'reset':
            return {}
        default:
    }
}

const Filter = memo(function Filter(props) {
    const {
        name,
        checked,
        dispatch,
        value
    } = props

    return (
        <li className={classnames({ checked })} onClick={() => {
            dispatch({
                type: 'toggle',
                payload:value
            })}}>
            {name}
        </li>
    )
})

const Option = memo(function Memo(props) {
    const {
        title,
        options,
        checkedMap,
        dispatch
    } = props

    /**
     * update是针对Map进行变化的，所以只能传到这一层，后续的组件也不需要接受mAP
     *
     */
    // const toggle = useCallback((value) => {
    //     let newCheckedMap = { ...checkedMap }
        // if (value in checkedMap) {
        //     delete newCheckedMap[value]
        // } else {
        //     newCheckedMap[value] = true
        // }
    //     update(newCheckedMap)
    // },[checkedMap,update])

    return (
        <div className="option">
            <h3>{title}</h3>
            <ul>
                {options.map(
                    option => <Filter key={option.value} {...option} checked={option.value in checkedMap} dispatch={dispatch}/>
                )}
            </ul>
        </div>
    )
})

const BottomModal = memo(function BottomModal(props) {
    const {
        isFiltersVisible,
        ticketTypes,
        trainTypes,
        departStations,
        arriveStations,
        checkedTicketTypes,
        checkedTrainTypes,
        checkedDepartStations,
        checkedArriveStations,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd,
        setCheckedTicketTypes,
        setCheckedTrainTypes,
        setCheckedDepartStations,
        setCheckedArriveStations,
        setDepartTimeStart,
        setDepartTimeEnd,
        setArriveTimeStart,
        setArriveTimeEnd,
        toggleIsFiltersVisible
    } = props

    const [localCheckedTicketTypes, localCheckedTicketTypesDispatch] = useReducer(checkedReducer, checkedTicketTypes, () => {
        return {...checkedTicketTypes}
    })

    const [localCheckedTrainTypes,localCheckedTrainTypesDispatch] = useReducer(checkedReducer,checkedTrainTypes,()=>{
        return {...checkedTrainTypes}
    })
    const [localCheckedDepartStations,localCheckedDepartStationsDispatch] = useReducer(checkedReducer,checkedDepartStations,()=>{
        return {...checkedDepartStations}
    })
    const [localCheckedArriveStations,localCheckedArriveStationsDispatch] = useReducer(checkedReducer,checkedArriveStations,()=>{
        return {...checkedArriveStations}
    })

    // const [localCheckedTicketTypess,setLocalticketTypes] = useState(()=>{
    //     return {...checkedTicketTypes}
    // })

    // const [localCheckedTrainTypess,setLocaltrainTypes] = useState(()=>{
    //     return {...checkedTrainTypes}
    // })

    // const [localCheckedDepartStationss,setLocaldepartStations] = useState(()=>{
    //     return {...checkedDepartStations}
    // })

    // const [localCheckedArriveStationss,setLocalarriveStations] = useState(()=>{
    //     return {...checkedArriveStations}
    // })

    const [localDepartTimeStart, setLocalDepartTimeStart] = useState(
        departTimeStart
    );
    const [localDepartTimeEnd, setLocalDepartTimeEnd] = useState(departTimeEnd);
    const [localArriveTimeStart, setLocalArriveTimeStart] = useState(
        arriveTimeStart
    );
    const [localArriveTimeEnd, setLocalArriveTimeEnd] = useState(arriveTimeEnd);




    const optionGroup = [
        {
            title: '坐席类型',
            options: ticketTypes,
            checkedMap: localCheckedTicketTypes,
            dispatch:localCheckedTicketTypesDispatch
            
        },
        {
            title: '车次类型',
            options: trainTypes,
            checkedMap: localCheckedTrainTypes,
            dispatch:localCheckedTrainTypesDispatch
            
        },
        {
            title: '出发车站',
            options: departStations,
            checkedMap: localCheckedDepartStations,
            dispatch:localCheckedDepartStationsDispatch
        },
        {
            title: '到达车站',
            options: arriveStations,
            checkedMap: localCheckedArriveStations,
            dispatch:localCheckedArriveStationsDispatch
        },
    ]

    function sure() {
        setCheckedTicketTypes(localCheckedTicketTypes)
        setCheckedTrainTypes(localCheckedTrainTypes)
        setCheckedDepartStations(localCheckedDepartStations)
        setCheckedArriveStations(localCheckedArriveStations)
        // setDepartTimeStart()
        // setDepartTimeEnd()
        // setArriveTimeStart()
        // setArriveTimeEnd()
        toggleIsFiltersVisible()
    }



     

    const isResetDisabled = useMemo(() => {
        return Object.keys(localCheckedTicketTypes).length === 0
        && Object.keys(localCheckedTrainTypes).length === 0
        && Object.keys(localCheckedDepartStations).length === 0
        && Object.keys(localCheckedArriveStations).length === 0
    }, [localCheckedTicketTypes,
        localCheckedTrainTypes,
        localCheckedDepartStations,
        localCheckedArriveStations])
        
        
        
    
    function reset() {

        if (isResetDisabled) {
            return;
        }
        localCheckedTicketTypesDispatch({
            type:'reset',
            payload:{}
        })
        localCheckedTrainTypesDispatch({
            type:'reset',
            payload:{}
        })
        localCheckedDepartStationsDispatch({
            type:'reset',
            payload:{}
        })
        localCheckedArriveStationsDispatch({
            type:'reset',
            payload:{}
        })
        // setLocalticketTypes({})
        // setLocaltrainTypes({})
        // setLocaldepartStations({})
        // setLocalarriveStations({})
    }

    return (
        <div className='bottom-modal'>
            <div className="bottom-dialog">
                <div className="bottom-dialog-content">
                    <div className='title'>
                        <span className={classnames('reset', {
                            disabled:isResetDisabled,
                        })} onClick={reset}>
                            重置
                        </span>
                        <span className="ok" onClick={sure}>
                            确定
                        </span>
                    </div>
                    <div className="options">
                        {
                            optionGroup.map(options => <Option {...options} />)
                        }
                        <Slider
                            title="出发时间"
                            currentStartHours={localDepartTimeStart}
                            currentEndHours={localDepartTimeEnd}
                            onStartChanged={setLocalDepartTimeStart}
                            onEndChanged={setLocalDepartTimeEnd}
                        />
                        <Slider
                            title="到达时间"
                            currentStartHours={localArriveTimeStart}
                            currentEndHours={localArriveTimeEnd}
                            onStartChanged={setLocalArriveTimeStart}
                            onEndChanged={setLocalArriveTimeEnd}
                        />
                    </div>
                    
                </div>
            </div>
        </div>
    )
})

function Bottom(props) {
    const {
        toggleOrderType,
        toggleHighSpeed,
        toggleOnlyTickets,
        toggleIsFiltersVisible,
        highSpeed,
        orderType,
        onlyTickets,
        isFiltersVisible,

        ticketTypes,
        trainTypes,
        departStations,
        arriveStations,
        checkedTicketTypes,
        checkedTrainTypes,
        checkedDepartStations,
        checkedArriveStations,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd,
        setCheckedTicketTypes,
        setCheckedTrainTypes,
        setCheckedDepartStations,
        setCheckedArriveStations,
        setDepartTimeStart,
        setDepartTimeEnd,
        setArriveTimeStart,
        setArriveTimeEnd,
    } = props
    return (
        
        <div className="bottom">
            <div className="bottom-filters">
                <span className="item" onClick={toggleOrderType}>
                    <i className="icon">&#xf065;</i>
                    {orderType === ORDER_DEPART ? '出发 早→晚' : '耗时 短→长'}
                </span>
                <span
                    className={classnames('item', { 'item-on': highSpeed })}
                    onClick={toggleHighSpeed}
                >
                    <i className="icon">{highSpeed ? '\uf43f' : '\uf43e'}</i>
                    只看高铁动车
                </span>
                <span
                    className={classnames('item', { 'item-on': onlyTickets })}
                    onClick={toggleOnlyTickets}
                >
                    <i className="icon">{onlyTickets ? '\uf43d' : '\uf43c'}</i>
                    只看有票
                </span>
                <span
                    className={classnames('item', {
                        'item-on': isFiltersVisible,
                    })}
                    onClick={toggleIsFiltersVisible}
                >
                    <i className="icon">{'\uf0f7'}</i>
                    综合筛选
                </span>
            </div>
            {isFiltersVisible &&
                <BottomModal
                    isFiltersVisible = {isFiltersVisible}
                    ticketTypes = {ticketTypes}
                    trainTypes = {trainTypes}
                    departStations = {departStations}
                    arriveStations = {arriveStations}
                    checkedTicketTypes = {checkedTicketTypes}
                    checkedTrainTypes = {checkedTrainTypes}
                    checkedDepartStations = {checkedDepartStations}
                    checkedArriveStations = {checkedArriveStations}
                    departTimeStart = {departTimeStart}
                    departTimeEnd = {departTimeEnd}
                    arriveTimeStart = {arriveTimeStart}
                    arriveTimeEnd = {arriveTimeEnd}
                    setCheckedTicketTypes = {setCheckedTicketTypes}
                    setCheckedTrainTypes = {setCheckedTrainTypes}
                    setCheckedDepartStations = {setCheckedDepartStations}
                    setCheckedArriveStations = {setCheckedArriveStations}
                    setDepartTimeStart = {setDepartTimeStart}
                    setDepartTimeEnd = {setDepartTimeEnd}
                    setArriveTimeStart = {setArriveTimeStart}
                setArriveTimeEnd={setArriveTimeEnd}
                toggleIsFiltersVisible = {toggleIsFiltersVisible}
            />}
            </div>
        
    )
}

export default Bottom