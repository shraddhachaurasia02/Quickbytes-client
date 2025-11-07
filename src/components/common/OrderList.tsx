import { useEffect } from "react"
import axios from "../../axios";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";
import Button from "./Button";
import { useModal } from "../../context/ModalContext";
import { useReduxAction, useReduxState } from "../../hooks/UseRedux";
import { Order } from "../../model/order/IOrderModel";

type OrderStatus = Order['status'];

const statusColors: Record<OrderStatus, string> = {
    unverified: "bg-slate-600",
    verified: "bg-yellow-500",
    "in-progress": "bg-blue-500",
    done: "bg-green-600",
    cancelled: "bg-red-600"
};

const statusTransitions: Record<OrderStatus, OrderStatus> = {
    unverified: "verified",
    verified: "in-progress",
    "in-progress": "done",
    done: "done",
    cancelled: "cancelled"
};

const statusButtonText: Record<OrderStatus, string> = {
    unverified: `Verify Payment`,
    verified: "Start Preparing",
    "in-progress": "Mark as Done",
    done: "Done",
    cancelled: "Cancelled"
};

function OrderList(props:{admin?:boolean,hideDoneAndCancelled?:boolean})
{
    const { orders } = useReduxState();
    const { setOrders, updateOrder } = useReduxAction();
    const modal = useModal();

    async function getOrders()
    {
        try
        {
            let response:AxiosResponse<any, any>;

            if(props.admin)
            {
                response = await axios.get('/order');
            }
            else
            {
                const token = localStorage.getItem('token');
                response = await axios.get('/order',{
                    headers: {
                        Authorization: `${token}`
                    }
                });    
            }
            if (response.data.success) {
                setOrders(response.data.data.orders);
            }
        }
        catch(error: any)
        {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to fetch orders",
            {
                position: "bottom-right"
            });
        }
    }
    
    useEffect(() => {
        getOrders();
    }, []);
    return (
        <div className={`w-full h-full card p-6 flex flex-col ${orders.length === 0 ? "justify-center" : ""} gap-4 lg:overflow-y-auto`}>
                {
                    orders.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 text-text/20 mb-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                            </svg>
                            <h1 className="text-2xl font-bold text-text/60">No Orders</h1>
                            <p className="text-sm text-text/40 mt-2">Your order history will appear here</p>
                        </div>
                    )
                }
                {
                    orders.map((order: Order, index: number) => {

                        if (props.hideDoneAndCancelled && (order.status === "done" || order.status === "cancelled")) {
                            return null;
                        }

                        let total = 0;
                        order.order.forEach((item) => {
                            const priceStr = item.menuId.price.replace(/₹/g, "").replace(/,/g, "").trim();
                            const price = parseFloat(priceStr) || 0;
                            total += price * item.quantity;
                        });
                        
                        // Use order amount if available, otherwise calculate
                        const orderTotal = order.amount || total;

                        return(
                        <div key={index} className="p-5 card hover:shadow-lg transition-shadow">
                            <div className="flex justify-between items-center mb-4 pb-3 border-b border-text/10">
                                {
                                    props.admin?(
                                        <div>
                                            <h1 className="text-xl font-bold text-text">{order.userId.username}</h1>
                                            <p className="text-sm text-text/50 mt-0.5">OTP: {order.otp}</p>
                                        </div>
                                    ):(
                                        <div>
                                            <h1 className="text-xl font-bold text-text">Order #{order.otp}</h1>
                                            <p className="text-sm text-[#477023] font-semibold mt-0.5">₹{orderTotal}</p>
                                        </div>
                                    )
                                }
                                <span className={`px-3 py-1.5 text-white rounded-full text-xs font-medium capitalize shadow-sm ${statusColors[order.status]}`}>
                                    {order.status.replace("-", " ")}
                                </span>
                            </div>
                            <div className="flex flex-col gap-2.5 mb-4">
                                {
                                    order.order.map((item, index) => (
                                            <div key={index} className="flex justify-between items-center py-1.5 px-2 rounded-lg hover:bg-text/5 transition-colors">
                                                <h1 className="text-sm font-medium text-text">{item.menuId.title}</h1>
                                                <h1 className="text-sm text-text/70">{item.menuId.price} × {item.quantity} = <span className="font-semibold text-[#477023]">₹{(parseFloat(item.menuId.price.replace(/₹/g, "").replace(/,/g, "").trim()) || 0) * item.quantity}</span></h1>
                                            </div>
                                        )
                                    )
                                }
                            </div>
                            {
                                (props.admin && order.status != 'done' && order.status != 'cancelled') && (
                                    <div className="flex gap-2 mt-2 pt-4 border-t border-text/10">
                                        <Button 
                                            color="primary"
                                            className="w-full bg-[#E49B0F] hover:bg-[#d18a0d]"
                                            onClick={async () => {
                                                if (!(await modal?.CreateModal("Confirmation", "Are you sure you want to change the status of this order?", "Yes", "No"))) {
                                                    return;
                                                }
                                                const newStatus = statusTransitions[order.status];
                                                try
                                                {
                                                    const response = await axios.put('/order', {
                                                        _id: order._id,
                                                        status: newStatus
                                                    });
                                                    if(response.status == 200)
                                                    {
                                                        // Update order in state
                                                        updateOrder({
                                                            orderId: order._id,
                                                            updates: { status: newStatus }
                                                        });
                                                        // Also refresh to get latest data
                                                        getOrders();
                                                    }
                                                    
                                                }
                                                catch(error: any)
                                                {
                                                    console.error(error);
                                                    toast.error(error.response.data.message,
                                                    {
                                                        position: "bottom-right"
                                                    });
                                                }
                                            }}
                                        >
                                            {order.status === "unverified" ? `Verify Payment ₹${orderTotal}` : statusButtonText[order.status]}
                                        </Button>
                                        {
                                            order.status == 'unverified' && <Button
                                            color="red"
                                            onClick={async()=>{
                                                if (!(await modal?.CreateModal("Confirmation", "Are you sure you want to change the status of this order?", "Yes", "No"))) {
                                                    return;
                                                }
                                                try
                                                {
                                                    const response = await axios.put('/order', {
                                                        _id: order._id,
                                                        status: "cancelled"
                                                    });
                                                    if(response.status == 200)
                                                    {
                                                        // Update order in state
                                                        updateOrder({
                                                            orderId: order._id,
                                                            updates: { status: "cancelled" }
                                                        });
                                                        // Also refresh to get latest data
                                                        getOrders();
                                                    }
                                                    
                                                }
                                                catch(error: any)
                                                {
                                                    console.error(error);
                                                    toast.error(error.response.data.message,
                                                    {
                                                        position: "bottom-right"
                                                    });
                                                }
                                            }}
                                            className="w-full bg-red-600 hover:bg-red-700" >Payment Not Received</Button>
                                        }
                                    </div>
                                )
                            }
                        </div>
                    )})
                }
            </div>
    )
}

export default OrderList