import dynamic from 'next/dynamic'
import { useEffect, useState} from 'react';

import Component from '@/components/BindGenComponent';

const WasmBindGenCalc = dynamic({
    loader: async () => {
        return Component
    },
    ssr: false
});

export default WasmBindGenCalc;
