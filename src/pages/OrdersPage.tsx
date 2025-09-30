import Navbar from '../components/common/Navbar'
import OrderList from '../components/common/OrderList'

function OrdersPage()
{
  return (
    <>
      <Navbar  />
      <main className="container mx-auto px-4">
        <OrderList />
      </main>
    </>
  )
}

export default OrdersPage