import React, { useState, useMemo, useEffect } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import './CitySelector.css'

function CitySelector(props) {
    const {
        show,
        cityData,
        isLoadingCityData,
        onBack,
        fetchCityData
    } = props
    const [searchKey, setSearchKey] = useState('')
    /**
     * 获取异步数据
     */

    useEffect(() => {
        if (!show || isLoadingCityData || cityData) {
            return;
        }
        fetchCityData();
    },[show, isLoadingCityData, cityData])

    //利用useMemo来优化性能
    const key = useMemo(()=>searchKey.trim(),[searchKey])
    return (
        <div className={classnames('city-selector', { hidden: !show })}>
            <div className="city-search">
                <div className="search-back" onClick={()=>{onBack()}}>
                    <svg width="42" height="42">
                        <polyline
                            points="25,13 16,21 25,29"
                            stroke="#fff"
                            strokeWidth="2"
                            fill="none"
                        />
                    </svg>
                </div>
                <div className="search-input-wrapper">
                    <input
                    type="text"
                    value={key}
                    className="search-input"
                    placeholder="城市、车站的中文或拼音"
                    onChange={(e)=>{setSearchKey(e.target.value)}}    
                    />
                </div>
                <i
                    className={classnames('search-clean', {
                        hidden:key.length === 0
                    })}
                    onClick={()=>{setSearchKey('')}}
                >
                    &#xf063;
                </i>
            </div>
        </div>
    )
}

CitySelector.propTypes = {
    show: PropTypes.bool.isRequired,
    cityData: PropTypes.object,
    isLoadingCityData: PropTypes.bool.isRequired,
    onBack: PropTypes.func.isRequired
};

export default CitySelector