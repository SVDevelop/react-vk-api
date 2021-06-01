import React from 'react'
import {ContextProvider} from '../ContextApp'
export default function Main (props) {
    return <ContextProvider>{props.children}</ContextProvider>
}