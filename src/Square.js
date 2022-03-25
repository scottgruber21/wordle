import React, {useState} from 'react'

export const Square = ({letter, status}) => {
    return (
        <div className={'square ' + status}>
            {letter}
        </div>
    )
}