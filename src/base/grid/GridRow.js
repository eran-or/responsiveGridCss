import React from 'react'

const isObject = (val) => {
    return val instanceof Object
}
const GridRow = ({row, rowStyle}) => {
    return <>
    {Object.keys(row).map((key, j) => {
        return !isObject(row[key]) ? <span key={j} className={`grid-column ${rowStyle&&rowStyle}`}>{row[key]}</span> : null
    })}

</>
}

export default GridRow