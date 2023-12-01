// import { initSync, parse_json } from '@/../pkg/testcrate.js';
import * as wasm from '@/../pkg/testcrate.js';
// import { initSync, get_result_len_bg, memory, parse_json } from '@/../pkg/testcrate.js';

import dynamic from 'next/dynamic'
import { useEffect, useState} from 'react';

import styles from '../styles/styles.module.css';

export interface AddModuleExports {
    parse_json(): string
}

interface JsonProps {
  filename1: string
  filename2: string
  varname: string
  nentries: number
}

const WasmJson = dynamic({
  loader: async () => {
    const Component = ({ filename1, filename2, varname, nentries }: JsonProps) => {
      const [data1, setData1] = useState(null);
      const [data2, setData2] = useState(null);
      const [result, setResult] = useState<Float64Array>(new Float64Array());

      useEffect(() => {
        const loadData = async () => {
          const response1 = await fetch(filename1);
          const json1 = await response1.json();
          setData1(json1);

          const response2 = await fetch(filename2);
          const json2 = await response2.json();
          setData2(json2);
        };

        loadData();
      }, [filename1, filename2]);

      useEffect(() => {
          fetch('@/../pkg/testcrate_bg.wasm')
              .then(response => {
                  return response.arrayBuffer();
              })
              .then(bytes => {
                  if (data1 && data2) {
                      const thiswasm = wasm.initSync(bytes);
                      const resultPtr = wasm.parse_json(JSON.stringify(data1));
                      const resultLen = wasm.get_result_len_bg();
                      const resultVector = new Float64Array(thiswasm.memory.buffer, resultPtr, resultLen);
                      setResult(resultVector);
                }
              })
              .catch(error => {
                  console.error('Error fetching wasm module:', error);
              });
      }, [data1, data2]);

      return (
          <div className={styles.json}>
              <h1>Json Result</h1>
              {result && Array.from(result).map((value: number, index: number) => (
                  <div key={index}>{value}</div>
              ))}
          </div>
      )
    }

    return Component
  },
  ssr: false
});

export default WasmJson
