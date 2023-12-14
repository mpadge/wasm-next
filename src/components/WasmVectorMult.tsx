'use client'

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'
import styles from '../styles/styles.module.css';

interface VectorMultProps {
  vector1: Float64Array
  vector2: Float64Array
}

function allocateSpaceForVector(vector: Float64Array, memory: WebAssembly.Memory): number {
  const ptr = memory.buffer.byteLength;
  const requiredSpace = vector.length * vector.BYTES_PER_ELEMENT;
  memory.grow(Math.ceil(requiredSpace / 65536)); // Grow memory by necessary number of pages
  const view = new Float64Array(memory.buffer, ptr, vector.length);
  view.set(vector);
  return ptr;
}

const WasmVectorMultComponent = ({ vector1, vector2 }: VectorMultProps) => {
    const [mult_two, setMultTwo] = useState<Function | null>(null);
    const [get_result_len, setGetResultLen] = useState<Function | null>(null);
    const [memory, setMemory] = useState<Function | null>(null);

    useEffect(() => {
        const loadWasm = async () => {
            const wasmModule = await import('@/../pkg/testcrate_bg.wasm');
            setMultTwo(() => wasmModule.mult_two);
            setGetResultLen(() => wasmModule.get_result_len);
            setMemory(() => wasmModule.memory);
        };

        loadWasm();
    }, []);

    const [resultVector, setResultVector] = useState<Float64Array | null>(null);
    useEffect(() => {
        if (mult_two && get_result_len && memory) {
            const ptr1 = allocateSpaceForVector(vector1, memory);
            const ptr2 = allocateSpaceForVector(vector2, memory);

            const resultPtr = mult_two(ptr1, vector1.length, ptr2, vector2.length);
            const resultLen = get_result_len();
            const resultVector = new Float64Array(memory.buffer, resultPtr, resultLen);
            setResultVector(resultVector);
        }
    }, [mult_two, get_result_len, memory, vector1, vector2]);

    return (
        <div className={styles.vector}>
        <h1>Vector Result</h1>
        {resultVector ?
            Array.from(resultVector).map((value: number, index: number) => (
            <div key={index}>{value}</div>)) :
            'Loading...'
        }
        </div>
    )
}

const WasmVectorMult = dynamic(() => Promise.resolve(WasmVectorMultComponent), {
  // Ensure only client-side execution:
  ssr: false
})

export default WasmVectorMult
