import React from 'react'

const SimpleButton = (props) => {
    const {
        title = 'title',
        onClick,
        isActive= false,
        isCircular
    } = props
    return (
        <button onClick={() => setsaveClass('')}
            className='btn btn-primery' >
            hdbv
        </button>
    )
}

export default SimpleButton