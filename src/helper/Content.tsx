import React from 'react';
function Content({ children }: any) {
    return (
        <div className="content-wrapper">
            {children}
        </div>
    )
}

export default Content;