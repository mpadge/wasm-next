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
            const [result, setResult] = useState<Object | null>(null);

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
                        const resultJson = wasm.parse_json(JSON.stringify(data1), JSON.stringify(data2), varname, nentries);
                        const resultObj = JSON.parse(resultJson);
                        setResult(resultObj);
                    }
                    })
                .catch(error => {
                    console.error('Error fetching wasm module:', error);
                    });
                }, [data1, data2]);

            return (
                <div className={styles.json}>
                <h1>Json Result</h1>
                    {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
                </div>
            )
        }

        return Component
    },
    ssr: false
});

export default WasmJson
