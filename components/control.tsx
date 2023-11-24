
import {useState, useRef} from 'react';
import Link from 'next/link'
import Image from 'next/image'

import styles from '../styles/controls.module.css';

interface ControlProps {
    number1: string,
    number2: string
}


export default function Control (props: ControlProps) {

    const [Number1, setNumber1] = useState(props.number1);
    const [Number2, setNumber2] = useState(props.number2);

    return (
        <>
        <div id="top-left-container" className={styles.controls}>

            <h3>Numbers</h3>

        </div>
        </>
        )
};
