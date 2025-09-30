import { Link } from 'react-router-dom'
import Button from '../components/common/Button'

function DefaultRoute() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold">PAGE NOT FOUND</h1>
        <Link to="/">
            <Button color={'primary'}>Go to Home</Button>
        </Link>
    </div>
  )
}

export default DefaultRoute