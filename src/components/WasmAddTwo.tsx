'use client'

import dynamic from 'next/dynamic'
import styles from '../styles/styles.module.css';
import { useState, useEffect } from 'react';

interface WasmAddTwoProps {
  number1: number
  number2: number
}

const WasmAddTwoComponent = ({ number1, number2 }: WasmAddTwoProps) => {
  const [addTwo, setAddTwo] = useState<Function | null>(null);

  useEffect(() => {
    const loadWasm = async () => {
      const wasmModule = await import('@/../pkg/testcrate_bg.wasm');
      setAddTwo(() => wasmModule.add_two);
    };

    loadWasm();
  }, []);

  return (
    <div className={styles.number}>
      <>
          <h3>Sum:</h3>
          {addTwo ? addTwo(number1, number2) : 'Loading...'}
      </>
    </div>
  )
}

const WasmAddTwo = dynamic(() => Promise.resolve(WasmAddTwoComponent), {
  // Ensure only client-side execution:
  ssr: false
})

export default WasmAddTwo
