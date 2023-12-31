'use client'

import {useState, useRef} from 'react';
import Select from 'react-select';
import Link from 'next/link'
import Image from 'next/image'

import styles from '../styles/styles.module.css';

interface ControlProps {
    number1: number,
    number2: number,
    handleNumber1Change: (value: number) => void,
    handleNumber2Change: (value: number) => void
}


export default function Control (props: ControlProps) {

    const options = [
        { value: "10", label: "10" },
        { value: "20", label: "20" },
        { value: "30", label: "30" },
        { value: "40", label: "40" },
        { value: "50", label: "50" },
        { value: "60", label: "60" },
        { value: "70", label: "70" },
        { value: "80", label: "80" },
        { value: "90", label: "90" },
        { value: "100", label: "100" }
    ]

    const [isSearchable, setIsSearchable] = useState(true);
    const [selected, setSelected] = useState(null);

    const handleChange1 = (selectedOption: any) => {
        setSelected(selectedOption);
        props.handleNumber1Change(Number(selectedOption.value));
    };
    const handleChange2 = (selectedOption: any) => {
        setSelected(selectedOption);
        props.handleNumber2Change(Number(selectedOption.value));
    };


    return (
        <>
        <div id="top-left-container" className={styles.controls}>

        <h3>Number1</h3>
        <Select
            options={options}
            defaultValue={options[0]}
            name="Number1"
            //isClearable={isClearable}
            isSearchable={isSearchable}
            onChange = {handleChange1}
        />

        <h3>Number2</h3>
        <Select
            options={options}
            defaultValue={options[0]}
            name="Number2"
            //isClearable={isClearable}
            isSearchable={isSearchable}
            onChange = {handleChange2}
        />

        </div>
        </>
        )
};
