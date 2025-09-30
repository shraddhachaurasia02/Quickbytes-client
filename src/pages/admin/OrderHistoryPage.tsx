import OrderList from '../../components/common/OrderList'

function OrderHistoryPage() {
    return (
        <>
          <main className="container mx-auto px-4">
            <OrderList admin/>
          </main>
        </>
      )
}

export default OrderHistoryPage