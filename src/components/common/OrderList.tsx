import { useEffect, useState } from "react"
import axios from "../../axios";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";
import Button from "./Button";
import { useModal } from "../../context/ModalContext";

function OrderList(props:{admin?:boolean,hideDoneAndCancelled?:boolean})
{
    interface order {
        status: "unverified" | "verified" | "in-progress" | "done" | "cancelled";
        otp:number;
        userId:{
            username:string;
            email:string;
            password:string;
            _id:string;
        }
        _id:string;
        order: {
            menuId:{
                canteen:string;
                description:string;
                image:string;   
                price: string;
                time:string;
                title: string;
                _id:string;
            }
            quantity: number;
        }[]
    }
    const [orders, setOrders] = useState<order[]>([]);
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
            console.log(response.data.data.orders);
            setOrders(response.data.data.orders);
        }
        catch(error: any)
        {
            console.error(error);
            toast.error(error.response.data.message,
            {
                position: "bottom-right"
            });
        }
    }
    
    useEffect(() => {
        getOrders();
    }, []);
    return (
        <div className={`w-full h-full card shadow-xl p-4 flex flex-col ${orders.length === 0 ? "justify-center" : ""} gap-2 bg-background2 rounded-xl lg:overflow-y-auto`}>
                {
                    orders.length === 0 && <h1 className="text-2xl text-center">No Orders</h1>
                }
                {
                    orders.map((order, index) => {

                        if (props.hideDoneAndCancelled && (order.status === "done" || order.status === "cancelled")) {
                            return null;
                        }

                        let total = 0;
                        console.log(order);
                        order.order.forEach((item) => {
                            total += parseInt(item.menuId.price.split("₹")[1], 10) * item.quantity;
                        });

                        return(
                        <div key={index} className="p-4 card">
                            <div className="flex justify-between">
                                {
                                    props.admin?(
                                        <h1 className="text-2xl font-bold">{order.userId.username}{"  |  "}{order.otp}</h1>
                                    ):(
                                        <h1 className="text-2xl font-bold">{order.otp}{"  |  "}₹{total}</h1>
                                    )
                                }
                                <h1 className={`px-4 py-2 text-white rounded-full ${{
                                    unverified: "bg-slate-800",
                                    verified: "bg-yellow-500",
                                    "in-progress": "bg-blue-500",
                                    done: "bg-green-500",
                                    cancelled: "bg-[#950606]"
                                }[order.status]} text-xs capitalize`}>
                                    {order.status}
                                </h1>
                            </div>
                            <div className="flex flex-col gap-2 px-4 pt-4">
                                {
                                    order.order.map((item, index) => (
                                            <div key={index} className="flex justify-between">
                                                <h1>{item.menuId.title}</h1>
                                                <h1>{item.menuId.price} x {item.quantity} = {parseInt(item.menuId.price.split("₹")[1], 10) * item.quantity}</h1>
                                            </div>
                                        )
                                    )
                                }
                            </div>
                            {
                                (props.admin && order.status != 'done' && order.status != 'cancelled') && (
                                    <div className="flex gap-2 mt-4">
                                        <Button className="w-full bg-[#E49B0F] "
                                            onClick={async () => {
                                                if (!(await modal?.CreateModal("Confirmation", "Are you sure you want to change the status of this order?", "Yes", "No"))) {
                                                    return;
                                                }
                                                const newStatus = {
                                                    unverified: "verified",
                                                    verified: "in-progress",
                                                    "in-progress": "done",
                                                    done: "done",
                                                    cancelled: "cancelled"
                                                }[order.status];
                                                try
                                                {
                                                    
                                                    const response = await axios.put('/order', {
                                                        _id: order._id,
                                                        status: newStatus
                                                    });
                                                    if(response.status == 200)
                                                    {
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
                                            {
                                                {
                                                    unverified: `Verify Payment ₹${total}`,
                                                    verified: "Start Preparing",
                                                    "in-progress": "Mark as Done",
                                                    done: "Done",
                                                    cancelled: "Cancelled"
                                                }[order.status]
                                            }
                                        </Button>
                                        {
                                            order.status == 'unverified' && <Button
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
                                            className="w-full bg-[#950606]" >Payment Not Received</Button>
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