import dynamic from 'next/dynamic'
import { useEffect, useState} from 'react';

import BindGenComponent from '@/components/BindGenComponent';

const WasmBindGenCalc2 = dynamic({
    loader: async () => {
        const Component = BindGenComponent;
        return (props) => <Component {...props} />;
    },
    ssr: false
});

export default WasmBindGenCalc2;
