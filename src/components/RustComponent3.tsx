import type { InitOutput } from '@/../pkg/testcrate';
import { initSync } from '@/../pkg/testcrate.js';
import dynamic from 'next/dynamic'

import styles from '../styles/vector.module.css';

interface RustComponent3Props {
  filename: string
  varname: string
  nentries: number
}

interface ReadFileExports {
  read_file: (a: Float64Array, b: Float64Array) => Float64Array
}

function allocateStringInMemory(str: string, memory: WebAssembly.Memory): { ptr: number, len: number } {
  const encoder = new TextEncoder();
  const encodedStr = encoder.encode(str);
  const ptr = memory.buffer.byteLength;
  const requiredSpace = encodedStr.length;
  memory.grow(Math.ceil(requiredSpace / 65536)); // Grow memory by necessary number of pages
  const view = new Uint8Array(memory.buffer, ptr, encodedStr.length);
  view.set(encodedStr);
  return { ptr, len: encodedStr.length };
}

const RustComponent3 = dynamic({
  loader: async () => {
    // @ts-ignore
    const { read_file: readFile } = (await import('@/../pkg/testcrate_bg.wasm')) as ReadFileExports

    const { read_file, get_result_len, memory } = await import('@/../pkg/testcrate_bg.wasm');

    const Component3 = ({ filename, varname, nentries }: RustComponent3Props) => {
        const { ptr: filename_ptr, len: filename_len } = allocateStringInMemory(filename, memory);
        const { ptr: varname_ptr, len: varname_len } = allocateStringInMemory(varname, memory);

        console.log(`Filename: ${filename}`);
        console.log(`Pointer: ${filename_ptr}`);
        console.log(`Length: ${filename_len}`);
      
        const resultPtr = read_file(filename_ptr, filename_len, varname_ptr, varname_len, nentries);
        const resultLen = get_result_len();
   
        // Create a new Float64Array view on the Wasm memory
        const resultVector = new Float64Array(memory.buffer, resultPtr, resultLen);
   
        console.log(resultVector);
       
        return (
            <div className={styles.readfile}>
            <h1>ReadFile Result</h1>
                {Array.from(resultVector).map((value: number, index: number) => (
                <div key={index}>{value}</div>
            ))}
            </div>
         )
    }

    return Component3
    },
    // Ensure only client-side execution:
    ssr: false
})

export default RustComponent3
