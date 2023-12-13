"use client";

import dynamic from 'next/dynamic'

import styles from '../styles/styles.module.css';

interface WasmAddTwoProps {
  number1: number
  number2: number
}

const WasmAddTwo = dynamic({
  loader: async () => {
    // @ts-ignore
    const { add_two } = (await import('@/../pkg/testcrate_bg.wasm'));

    return ({ number1, number2 }: WasmAddTwoProps) => (
      <div className={styles.number}>
        <>
            <h3>Sum:</h3>
            {add_two(number1, number2)}
        </>
      </div>
    )
  },
  // Ensure only client-side execution:
  ssr: false
})

export default WasmAddTwo
