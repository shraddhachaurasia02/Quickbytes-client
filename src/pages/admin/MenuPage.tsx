import { useReduxAction, useReduxState } from "../../hooks/UseRedux"
import Button from "../../components/common/Button";
import { useEffect, useState } from "react";
import Input from "../../components/common/Input";
import axios from "../../axios";
import { toast } from "react-toastify";
import { useModal } from "../../context/ModalContext";

export default function MenuPage() {
    const { menu } = useReduxState();
    const [modalOpen, setModalOpen] = useState(false);
    const [addMode, setAddMode] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        description: "",
        time: "",
        image: "",
        canteen: ""
    });

    useEffect(() => {
        if (!modalOpen) {
            setFormData({ description: "", image: "", price: "", time: "", title: "", canteen: "" });
        }
    }, [modalOpen])

    return (
        <>
            <MenuModal formData={formData} setFormData={setFormData} addMode={addMode} modalOpen={modalOpen} setModalOpen={setModalOpen} />
            <main className="w-full lg:w-[64rem] p-4 mx-auto">
                <div className="card p-4 flex justify-between items-center">
                    <h1 className="text-4xl font-bold">Menu</h1>
                    <Button onClick={() => { setModalOpen(true); setAddMode(true) }} color={"primary"}>Add Item</Button>
                </div>
                <div className="flex flex-col gap-4 mt-4">
                    {
                        menu.map((item: any, index: number) => (
                            <MenuItem setFormData={setFormData} setModalOpen={setModalOpen} setAddMode={setAddMode} horizontal key={index} item={item} />
                        ))
                    }
                </div>
            </main>
        </>
    )
}

function MenuModal({ modalOpen, setModalOpen, addMode, formData, setFormData }: {
    modalOpen: boolean, setModalOpen: Function, addMode: boolean, formData: {
        title: string;
        price: string;
        description: string;
        time: string;
        image: string;
        canteen: string;
    },
    setFormData: Function
}) {
    const { setMenu } = useReduxAction();

    async function GetMenu() {
        try {
            const resp = await axios.get("/menu");
            if (resp.status == 200)
                setMenu(resp.data.data);
        }
        catch (e: any) {
            toast.error(e.message, {
                position: "bottom-right",
            });
        }
    }

    async function handleSubmit(e: any) {
        e.preventDefault();
        if (addMode) {
            try {
                const response = await axios.post('/menu', {
                    ...formData,
                    price: `₹${formData.price}`
                })
                // console.log(response);
                if (response.status === 200) {
                    toast.success("Item added successfully");
                    setModalOpen(false);
                    setFormData({ description: "", image: "", price: "", time: "", title: "", canteen: "" });
                    GetMenu();
                }
                else {
                    toast.error("Failed to add item");
                }
            }
            catch (err: any) {
                toast.error(err?.response?.data?.message);
            }
        }
        else {
            try {
                const response = await axios.put('/menu', {
                    ...formData,
                    price: `₹${formData.price}`
                })
                // console.log(response);
                if (response.status === 200) {
                    toast.success("Item updated successfully");
                    setModalOpen(false);
                    setFormData({ description: "", image: "", price: "", time: "", title: "", canteen: "" });
                    GetMenu();
                }
                else {
                    toast.error("Failed to update item");
                }
            }
            catch (err: any) {
                toast.error(err?.response?.data?.message);
            }
        }
    }

    return (
        <div className={`${modalOpen ? "bg-black/50" : "pointer-events-none"} duration-300 fixed w-screen h-screen top-0 left-0 z-50 grid place-items-center`}>
            <div className={`${modalOpen ? "" : "scale-125 opacity-0"} duration-300 max-w-lg w-full card p-4`}>
                <div className="flex justify-between items-center">
                    <h1 className="text-xl md:text-2xl font-medium">{addMode ? "Add Item" : "Edit Item"}</h1>
                    <svg
                        onClick={() => {
                            setModalOpen(false);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8 text-text/70 hover:text-primary hover:scale-105 active:scale-95 duration-100 cursor-pointer"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col mt-4 gap-2">
                    <Input placeHolder="Enter Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}>Title</Input>
                    <Input placeHolder="Enter Canteen Name" value={formData.canteen} onChange={(e) => setFormData({ ...formData, canteen: e.target.value })}>Canteen Name</Input>
                    <Input placeHolder="Price Excluding Unit" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })}>Price</Input>
                    <Input placeHolder="A Short Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}>Description</Input>
                    <Input placeHolder="Delivery Time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })}>Time</Input>
                    <Input placeHolder="Image URL" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })}>Image</Input>
                    <Button className="mt-6" color={"primary"}>{addMode ? "Add Item" : "Update Item"}</Button>
                </form>
            </div>
        </div>
    )
}

function MenuItem(props: any) {
    const modal = useModal();
    const { title, price, _id } = props.item;
    const { setModalOpen, setAddMode, setFormData } = props;
    const { setMenu } = useReduxAction();
    return (
        <div className="card p-4">
            <div className="flex justify-between items-center">
                <h1 className="font-medium text-xl">{title} | {price}</h1>
                <div className="flex gap-4">
                    <Button onClick={() => {
                        setModalOpen(true);
                        setAddMode(false);
                        setFormData({ ...props.item, price: price.replace("₹", "") });
                    }} color={"primary"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>
                    </Button>
                    <Button onClick={async () => {
                        if (await modal?.CreateModal("Delete Menu Item", "Are you sure you want to delete this item?", "Delete", "Cancel")) {
                            try {
                                const response = await axios.delete('/menu', {
                                    data: {
                                        _id: _id
                                    }
                                })
                                // console.log(response);
                                if (response.status === 200) {
                                    toast.success("Item deleted successfully");
                                    const resp = await axios.get("/menu");
                                    if (resp.status == 200)
                                        setMenu(resp.data.data);
                                }
                                else {
                                    toast.error("Failed to delete item");
                                }
                            }
                            catch (err: any) {
                                toast.error(err?.response?.data?.message);
                            }
                        }
                    }} color={"red"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </Button>
                </div>
            </div>
        </div>
    );
}