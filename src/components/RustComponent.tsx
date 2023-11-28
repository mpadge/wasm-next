import type { InitOutput } from '@/../pkg/testcrate';
import { initSync } from '@/../pkg/testcrate.js';
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

    const { mult_two, get_result_len, memory } = await import('@/../pkg/testcrate_bg.wasm');

    // Initialize your input vectors
    const vector1 = Float64Array.from({ length: 5 }, () => Math.random());
    const vector2 = Float64Array.from({ length: 5 }, () => Math.random());

    // Allocate space in the Wasm memory for the input vectors and copy the vectors into it
    const ptr1 = allocateSpaceForVector(vector1);
    const ptr2 = allocateSpaceForVector(vector2);

    // Call mult_two and get the pointer to the result vector
    const resultPtr = mult_two(ptr1, vector1.length, ptr2, vector2.length);

    // Call get_result_len to get the length of the result vector
    const resultLen = get_result_len();

    // Create a new Float64Array view on the Wasm memory
    const resultVector = new Float64Array(memory.buffer, resultPtr, resultLen);

    // Now resultVector is a JavaScript Float64Array containing the result
    console.log(resultVector);

    return (
        <div>
          {resultVector.map((value, index) => (
            <div key={index}>{value}</div>
          ))}
        </div>
    )
    },
    // Ensure only client-side execution:
    ssr: false
})

export default RustComponent
