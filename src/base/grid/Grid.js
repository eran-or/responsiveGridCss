import React from 'react'
import GridRow from './GridRow'

const Grid = ({ data, headerData, footerData, rowStyle }) => {

    return data.length ? <div className="grid-container">
        <div className="grid">
            {headerData.map((name, l) => <strong key={l} className="grid-column header-column">{name}</strong>)}
            {data.map((obj, i) => {
                return (
                    <GridRow key={i} row={obj} rowStyle={rowStyle&&rowStyle[i]} />
                )
            })}
        </div>
        <footer className="grid-footer">{footerData}</footer>
    </div> : null
}

export default Grid