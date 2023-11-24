import { useRouter } from 'next/router'
import Link from 'next/link'
import RustComponent from '../components/RustComponent'
import Control from '../components/control'

export default function Page() {
  const { query } = useRouter()
  const number = parseInt(query.number as string) || 30
  const number2 = 10

  return (
    <div>
      <Control number1={number} number2={number2} />
      <RustComponent number={number} />
      <Link href={`/?number=${number + 1}`}>+</Link>
    </div>
  )
}
