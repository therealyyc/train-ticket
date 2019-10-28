import React, { useState, useMemo, useEffect, memo } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import './CitySelector.css'




const CityItem = memo(function CityItem(props) {
    const {
        name,
        onSelect
    } = props
    return (
        <li className='city-li' onClick={() => { onSelect(name) }}>{name}</li>
    )
})
CityItem.propTypes = {
    name: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
}

const CitySection = memo((props) => {
    const {
        title,
        cities = [],
        onSelect
    } = props
    return (
        <ul className='city-ul'>
            <li className="city-li">{title}</li>
            {
                cities.map(city => {
                    return <CityItem key={city.name} name={city.name} onSelect={onSelect}></CityItem>
                })
            }
        </ul>
    )
})
CitySection.propTypes = {
    title: PropTypes.string.isRequired,
    cities: PropTypes.array,
    onSelect: PropTypes.func.isRequired,
};

const CityList = memo(function CityList(props) {
    const {
        sections,
        onSelect
    } = props
    return (
        <div className="city-list">
            <div className="city-cate">
            {sections.map(section => {
                    return (
                        <CitySection
                            key={section.title}
                            title={section.title}
                            cities={section.citys}
                            onSelect={onSelect}
                        />
                    );
            })}
            </div>
        </div>
    )
})

CityList.propTypes = {
    sections: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired
};


const CitySelector = memo(function CitySelector(props) {
    const {
        show,
        cityData,
        isLoadingCityData,
        onBack,
        fetchCityData,
        onSelect
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
    }, [show, isLoadingCityData, cityData])

    const outputCitySections = () => {
        if (isLoadingCityData) {
            return(<div>Loading</div>)
        }
        if (cityData) {
            return(<CityList sections={cityData.cityList} onSelect={onSelect}></CityList>)
        }
        return(<div>error</div>)
    }
    //利用useMemo来优化性能
    const key = useMemo(() => searchKey.trim(), [searchKey])
    return (
        <div className={classnames('city-selector', { hidden: !show })}>
            <div className="city-search">
                <div className="search-back" onClick={() => { onBack() }}>
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
                        onChange={(e) => { setSearchKey(e.target.value) }}
                    />
                </div>
                <i
                    className={classnames('search-clean', {
                        hidden: key.length === 0
                    })}
                    onClick={() => { setSearchKey('') }}
                >
                    &#xf063;
                </i>
            </div>
            {outputCitySections()}
        </div>
    )
})

CitySelector.propTypes = {
    show: PropTypes.bool.isRequired,
    cityData: PropTypes.object,
    isLoadingCityData: PropTypes.bool.isRequired,
    onBack: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
};

export default CitySelector