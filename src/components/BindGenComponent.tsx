'use client'

import { useEffect, useState} from 'react';

import * as wasm_js from '@/../pkg/testcrate.js';
import styles from '@/styles/styles.module.css';

interface BindGenProps {
    filename1: string
    filename2: string
    varnames: string[]
    nentries: number
}

const Component = (props: BindGenProps) => {
    const [data1, setData1] = useState(null);
    const [data2, setData2] = useState(null);
    const [result, setResult] = useState<Object | null>(null);

    useEffect(() => {
        const loadData = async () => {
            const response1 = await fetch(props.filename1);
            const json1 = await response1.json();
            setData1(json1);

            const response2 = await fetch(props.filename2);
            const json2 = await response2.json();
            setData2(json2);
        };

        loadData();
        }, [props.filename1, props.filename2]);

    // The 'initSync' call for the WASM module must be made wihtin the same
    // effect in which any module functions are called. For non-bindgen use, it
    // is possible to initialise a WASM module in a separtate effect, and
    // pass that to another effect to make function calls, but that is not
    // possible for bindgen calls which rely on complex input types, and
    // thus need access to memory allocated for input and output objects.
    useEffect(() => {
        fetch('@/../pkg/testcrate_bg.wasm')
        .then(response => {
            return response.arrayBuffer();
            })
        .then(bytes => {
            if (data1 && data2) {
                const wasm_binary = wasm_js.initSync(bytes);
                const varname = props.varnames.join(",");
                const data1js = JSON.stringify(data1);
                const data2js = JSON.stringify(data2);
                const resultJson = wasm_js.parse_json_mult(data1js, data2js, varname, props.nentries);
                const resultObj = JSON.parse(resultJson);
                setResult(resultObj);
            }
            })
        .catch(error => {
            console.error('Error fetching wasm module:', error);
            });
        }, [data1, data2, props.varnames, props.nentries]);

    return (
        <div className={styles.json2}>
            <h1>BindGen2</h1>
                {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
        </div>
    )
}

export default Component;
