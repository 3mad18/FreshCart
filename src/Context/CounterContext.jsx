import { createContext, useState } from "react";

export let CounterContext = createContext(0);

export default function CounterContextProvider(props) {


    const [Counter, setCounter] = useState(0);
    const [userName, setUserName] = useState('');


    return <CounterContext.Provider value={{ Counter, userName, setCounter }}>
        {props.children}
    </CounterContext.Provider>
}