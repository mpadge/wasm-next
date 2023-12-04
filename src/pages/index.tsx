import { useRouter } from 'next/router'
import { useState } from 'react';
import Link from 'next/link'
import WasmAddTwo from '../components/WasmAddTwo'
import WasmVectorMult from '../components/WasmVectorMult'
import WasmBindGen from '../components/WasmBindGen'
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

    const filename1 = "/data/dat1.json";
    const filename2 = "/data/dat2.json";
    const varnames = ["bike_index", "social_index"];
    const nentries = 5;

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
        <WasmVectorMult vector1={Vector1} vector2={Vector2} />
        <WasmBindGen filename1={filename1} filename2={filename2} varnames={varnames} nentries={nentries} />
        </div>
        </>
    )
}
