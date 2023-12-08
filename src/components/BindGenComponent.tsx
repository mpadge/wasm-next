import dynamic from 'next/dynamic'
import { useEffect, useState} from 'react';

import * as wasm_js from '@/../pkg/testcrate.js';
import styles from '@/styles/styles.module.css';

interface BindGenProps {
    filename1: string
    filename2: string
    varnames: string[]
    nentries: number
    bindgenResult: Object | null
    handleResultChange: (Object: any) => void
}

const BindGenReactComponent = (props: BindGenProps) => {
    const [data1, setData1] = useState(null);
    const [data2, setData2] = useState(null);
    const [wasmModule, setWasmModule] = useState<WebAssembly.WebAssemblyInstantiatedSource | null>(null);

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

    useEffect(() => {
        const loadWasm = async () => {
            try {
                const response = await fetch('@/../pkg/testcrate_bg.wasm');
                const wasmModule = await WebAssembly.instantiateStreaming(response);
                setWasmModule(wasmModule);
                if (wasmModule && data1 && data2) {
                    const wasmExports = wasmModule.instance.exports as typeof wasm_js;
                    const varname = props.varnames.join(",");
                    const resultJson = wasmExports.parse_json(JSON.stringify(data1), JSON.stringify(data2), varname, props.nentries);
                    const resultObj = JSON.parse(resultJson);
                    props.handleResultChange(resultObj);
                }
            } catch (err) {
                console.error(`Unexpected error in loadWasm. [Message: ${(err as Error).message}]`);
            }
        };
        loadWasm();
    }, [data1, data2, props.varnames, props.nentries, props.handleResultChange]);

    return (
        <div className={styles.json}>
            <h1>BindGen</h1>
                {props.bindgenResult && <pre>{JSON.stringify(props.bindgenResult, null, 2)}</pre>}
        </div>
    )

}

export default BindGenReactComponent;
