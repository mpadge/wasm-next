import { useRouter } from 'next/router'
import { useState } from 'react';
import Link from 'next/link'
import RustComponent2 from '../components/RustComponent2'
import Control from '../components/control'


export default function Page() {
    const [Number1, setNumber1] = useState(10);
    const [Number2, setNumber2] = useState(10);
    const handleNumber1Change = (value: string) => {
        setNumber1(Number(value));
    }
    const handleNumber2Change = (value: string) => {
        setNumber2(Number(value));
    }

    return (
        <>
        <div>
        <Control
            number1={Number1}
            number2={Number2}
            handleNumber1Change={setNumber1}
            handleNumber2Change={setNumber2}
        />
        <RustComponent2 number1={Number1} number2={Number2} />
        </div>
        </>
    )
}
