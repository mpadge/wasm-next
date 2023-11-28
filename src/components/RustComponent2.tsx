import type { InitOutput } from '@/../pkg/testcrate';
import { initSync } from '@/../pkg/testcrate.js';
import { add_two } from '@/../pkg/testcrate_bg.wasm';

import dynamic from 'next/dynamic'

interface RustComponent2Props {
  number1: Number
  number2: Number
}

const RustComponent2 = dynamic({
  loader: async () => {
    // @ts-ignore
    const exports = (await import('@/../pkg/testcrate_bg.wasm')) as AddModuleExports
    const { add_two: addTwo } = exports

    return ({ number1, number2 }: RustComponent2Props) => (
      <div>
        <>{addTwo(number1, number2)}</>
      </div>
    )
  },
})

export default RustComponent2
