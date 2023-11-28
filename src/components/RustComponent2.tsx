import { initSync, InitOutput } from '../wasm/testcrate.js';
import dynamic from 'next/dynamic'

interface RustComponent2Props {
  number1: Number
  number2: Number
}

const RustComponent2 = dynamic({
  loader: async () => {
    // @ts-ignore
    const exports = (await import('../wasm/testcrate_bg.wasm')) as AddModuleExports
    const { add_two: addTwo } = exports

    return ({ number1, number2 }: RustComponent2Props) => (
      <div>
        <>{addTwo(number1, number2)}</>
      </div>
    )
  },
})

export default RustComponent2
