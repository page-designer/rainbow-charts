import React, { memo, useState } from 'react'
import { Menu } from 'antd-mobile'
import 'antd-mobile/lib/menu/style/css'
import {
  SelectFilterWrapper,
  SelectFilterContent,
  SearchBar,
  ArrowIcon,
  SelectFilterMask
} from './style'
import arrowUp from './images/arrow-up.png'
import arrowDown from './images/arrow-down.png'

function SelectFilter({ item, sourceData, onChange, contentStyle }) {
  const { height = 45, name, defaultValue } = item
  let onlyOneLevel = true
  const transfromData = (sourceData) => {
    const { list } = sourceData
    return list.reduce((acc, item) => {
      if (/\_/.test(item[0])) {
        // 二级筛选，以"_"分割
        const [firstLevel, secondLevel] = item[0].split('_')
        const firstLevelInfo = acc.find((item) => item.label === firstLevel)
        if (firstLevelInfo) {
          onlyOneLevel = false
          firstLevelInfo.children.push({
            label: secondLevel,
            value: item[1]
          })
        } else {
          acc.push({
            label: firstLevel,
            value: firstLevel,
            children: [
              {
                label: secondLevel,
                value: item[1]
              }
            ]
          })
        }
      } else {
        acc.push({
          label: item[0],
          value: item[1]
        })
      }
      return acc
    }, [])
  }

  const toMap = (list) => {
    return list.reduce((acc, item) => {
      if (item.children) {
        Object.assign(acc, toMap(item.children))
      } else {
        acc[item.value] = item.label
      }
      return acc
    }, {})
  }

  const data = transfromData(sourceData)
  const dataMap = toMap(data)
  const defalultFirstLevel = onlyOneLevel
    ? ''
    : sourceData.list.find((item) => item[1] === defaultValue)[0].split('_')[0]
  const [show, setShow] = useState(false)
  const [value, setValue] = useState(
    onlyOneLevel ? [defaultValue] : [defalultFirstLevel, defaultValue]
  )

  const onValueChange = (value) => {
    setValue(value)
    onChange && onChange(onlyOneLevel ? value[0] : value[1])
  }

  return (
    <SelectFilterWrapper height={height}>
      <SelectFilterContent style={contentStyle}>
        <SearchBar
          style={{
            height,
            lineHeight: height + 'px'
          }}
          onClick={() => {
            setShow(!show)
          }}
        >
          {name}：{dataMap[onlyOneLevel ? value[0] : value[1]]}
          <ArrowIcon
            style={{ backgroundImage: `url(${show ? arrowUp : arrowDown})` }}
          />
        </SearchBar>
        <Menu
          style={{ display: show ? 'flex' : 'none' }}
          className='single-foo-menu'
          data={data}
          value={value}
          level={onlyOneLevel ? 1 : 2}
          onChange={onValueChange}
          height={document.documentElement.clientHeight * 0.4}
        />
        {show ? <SelectFilterMask onClick={() => setShow(false)} /> : null}
      </SelectFilterContent>
    </SelectFilterWrapper>
  )
}

export default memo(SelectFilter)
