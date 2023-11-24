import { useRouter } from 'next/router'
import { useState } from 'react';
import Link from 'next/link'
import RustComponent from '../components/RustComponent'
import Control from '../components/control'


export default function Page() {
    const { query } = useRouter()
        const number = parseInt(query.number as string) || 30
        const number2 = 10

        const [Number1, setNumber1] = useState(number);
    const [Number2, setNumber2] = useState(number2);
    const handleNumber1Change = (value: string) => {
        setNumber1(value);
    }
    const handleNumber2Change = (value: string) => {
        setNumber2(value);
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
        <RustComponent number={number} />
        <Link href={`/?number=${number + 1}`}>+</Link>
        </div>
        </>
    )
}
