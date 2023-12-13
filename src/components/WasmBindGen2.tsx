"use client";

// A modified version of 'WasmBindGenCalc'' which separates the two two
// components into this one, loaded in the main page, and the component itself,
// defined in 'BindGenComponent'.

import dynamic from 'next/dynamic'
import { useEffect, useState} from 'react';

import BindGenComponent from '@/components/BindGenComponent';

interface BindGenProps {
    filename1: string
    filename2: string
    varnames: string[]
    nentries: number
}

const WasmBindGenCalc2 = dynamic({
    loader: async () => {
        const Component = BindGenComponent;
        return (props: BindGenProps) => <Component {...props} />;
    },
    ssr: false
});

export default WasmBindGenCalc2;
