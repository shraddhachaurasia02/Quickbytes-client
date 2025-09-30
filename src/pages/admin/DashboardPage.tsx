import { Link } from 'react-router-dom';
import OrderList from '../../components/common/OrderList';

function DashboardPage() {
    return (
        <main className="container p-4 mx-auto flex flex-col lg:grow lg:h-0 lg:flex-row gap-4">
            <OrderList admin hideDoneAndCancelled/>
            <div className="w-full h-128 lg:h-full flex flex-col gap-4">
                <Link to={'menu'} className="h-full w-full relative bg-black rounded-xl overflow-clip grid place-content-center group">
                    <img className="w-full h-full absolute opacity-50 group-hover:scale-105 duration-300" src="https://images.pexels.com/photos/313700/pexels-photo-313700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    <h1 className="text-2xl md:text-4xl font-bold text-white z-10">Edit Menu</h1>
                </Link>
                <Link to={'orders'} className="h-full w-full relative bg-black rounded-xl overflow-clip grid place-content-center group">
                    <img className="w-full h-full absolute opacity-50 group-hover:scale-105 duration-300" src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    <h1 className="text-2xl md:text-4xl font-bold text-white z-10">View Order History</h1>
                </Link>
            </div>
        </main>
    )
}

export default DashboardPage