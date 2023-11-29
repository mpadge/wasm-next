import { useRouter } from 'next/router'
import { useState } from 'react';
import Link from 'next/link'
import VectorMult from '../components/WasmVectorMult'
import WasmAddTwo from '../components/WasmAddTwo'
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

    // Initialize vectors for calling mult_two fn:
    const Vector1 = Float64Array.from({ length: 5 }, () => Math.random());
    const Vector2 = Float64Array.from({ length: 5 }, () => Math.random());

    const filename = "/data/dat1.json";
    const varname = "bike_index";
    const nentries = 10;

    return (
        <>
        <div>
        <Control
            number1={Number1}
            number2={Number2}
            handleNumber1Change={setNumber1}
            handleNumber2Change={setNumber2}
        />
        <WasmAddTwo number1={Number1} number2={Number2} />
        <VectorMult vector1={Vector1} vector2={Vector2} />
        </div>
        </>
    )
}
