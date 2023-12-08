import dynamic from 'next/dynamic'

interface BindGenProps {
    filename1: string
    filename2: string
    varnames: string[]
    nentries: number
    bindgenResult: Object | null
    handleResultChange: (Object: any) => void
}

const BindGenReactComponent = dynamic(() => import('@/components/BindGenComponent'), {
    ssr: false
});

export default function WasmBindGen2 (props: BindGenProps) {
    return (
        <>
        <BindGenReactComponent
            filename1={props.filename1}
            filename2={props.filename2}
            varnames={props.varnames}
            nentries={props.nentries}
            bindgenResult={props.bindgenResult}
            handleResultChange={props.handleResultChange}
        />
        </>
    );
};
