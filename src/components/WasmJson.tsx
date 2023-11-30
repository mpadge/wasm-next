import type { InitOutput } from '@/../pkg/testcrate';
import { initSync } from '@/../pkg/testcrate.js';
import dynamic from 'next/dynamic'

import styles from '../styles/styles.module.css';

const WasmJson = dynamic({
  loader: async () => {
    // @ts-ignore
    // const { mult_json: multJson } = (await import('@/../pkg/testcrate_bg.wasm')) as MultTwoExports

    // const { mult_json, get_result_len, memory } = await import('@/../pkg/testcrate_bg.wasm');

    const Component = ({ filename1, filename2, varname, nentries }: JsonProps) => {

        return (
            <div className={styles.vector}>
              <h1>Json Result</h1>
            </div>
        )
    }

    return Component
    },
    // Ensure only client-side execution:
    ssr: false
})

export default WasmJson
