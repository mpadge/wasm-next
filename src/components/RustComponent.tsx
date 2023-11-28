import type { InitOutput } from '@/../pkg/testcrate';
import { initSync } from '@/../pkg/testcrate.js';
import { add_two } from '@/../pkg/testcrate_bg.wasm';

import dynamic from 'next/dynamic'

interface RustComponentProps {
  vector1: number[]
  vector2: number[]
}

interface MultTwoExports {
  mult_two: (a: number[], b: number[]) => number[]
}

const RustComponent = dynamic({
  loader: async () => {
    // @ts-ignore
    const { mult_two: multTwo } = (await import('@/../pkg/testcrate_bg.wasm')) as MultTwoExports

    return ({ vector1, vector2 }: RustComponentProps) => (
      <div>
        <>{multTwo(vector1, vector2)}</>
      </div>
    )
  },
  // Ensure only client-side execution:
  ssr: false
})

export default RustComponent
