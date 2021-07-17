import React from 'react';

interface commentType {
    name: string;
    comment: string;
}

export default function Comment(props: commentType) {
    return (
        props.name ?
            <div style={{ paddingLeft: '2em', marginTop: '1em' }}>
                <h5>{props.name}</h5>
                <p>{props.comment}</p>
                <hr />
            </div>
            : <div></div>
            
    )
}