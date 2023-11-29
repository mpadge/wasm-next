import type { InitOutput } from '@/../pkg/testcrate';
import { initSync } from '@/../pkg/testcrate.js';
import { add_two } from '@/../pkg/testcrate_bg.wasm';

import dynamic from 'next/dynamic'

interface WasmAddTwoProps {
  number1: number
  number2: number
}

interface AddTwoExports {
  add_two: (a: number, b: number) => number
}

const WasmAddTwo = dynamic({
  loader: async () => {
    // @ts-ignore
    const exports = (await import('@/../pkg/testcrate_bg.wasm')) as AddTwoExports
    const { add_two: addTwo } = exports

    return ({ number1, number2 }: WasmAddTwoProps) => (
      <div>
        <>{addTwo(number1, number2)}</>
      </div>
    )
  },
  // Ensure only client-side execution:
  ssr: false
})

export default WasmAddTwo
