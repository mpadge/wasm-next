import type { InitOutput } from '@/../pkg/testcrate';
import { initSync } from '@/../pkg/testcrate.js';

import dynamic from 'next/dynamic'
import { useEffect, useState} from 'react';

import styles from '../styles/styles.module.css';

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

      // TODO: Pass data1 and data2 to your wasm function

      return (
        <div className={styles.json}>
          <h1>Json Result</h1>
        </div>
      )
    }

    return Component
  },
  ssr: false
});

export default WasmJson
