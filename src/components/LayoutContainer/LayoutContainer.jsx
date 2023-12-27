import React from 'react';


const LayoutContainer = ({ children }) => {
    return (
        <>
            <div className='comman-container px-4'>
                {children}
            </div>
        </>
    );
}

export default LayoutContainer;
