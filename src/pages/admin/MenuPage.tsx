import { useReduxAction, useReduxState } from "../../hooks/UseRedux";
import Button from "../../components/common/Button";
import { useEffect, useState } from "react";
import Input from "../../components/common/Input";
import axios from "../../axios";
import { toast } from "react-toastify";
import { useModal } from "../../context/ModalContext";


// ... (MenuModal code )
function MenuModal({ modalOpen, setModalOpen, addMode, formData, setFormData }: {
    modalOpen: boolean, setModalOpen: Function, addMode: boolean, formData: {
        title: string;
        price: string;
        description: string;
        time: string;
        image: string;
        canteen: string;
        
        _id?: string; 
    },
    setFormData: Function
}) {
    const { setMenu } = useReduxAction();

    async function GetMenu() { /* ... */ }


    async function handleSubmit(e: any) {
      
        e.preventDefault(); 

        try {
            let response;
            
          
            if (addMode) {
                
                response = await axios.post("/menu", formData);
            } else {

                response = await axios.put("/menu", formData); 
            }

            // Check if the API call was successful (200 OK, 201 Created)
            if (response.status === 200 || response.status === 201) {
                toast.success(addMode ? "Item added successfully" : "Item updated successfully");

                
                const resp = await axios.get("/menu");
                if (resp.status == 200) {
                    // Update the Redux store, which will update the UI
                    setMenu(resp.data.data);
                }

                // Close the modal
                setModalOpen(false);
                
            } else {
                toast.error("Failed to submit item.");
            }
        } catch (err: any) {
            // Show an error message if the API call fails
            toast.error(err?.response?.data?.message || "An unknown error occurred.");
        }
    }

    return (
        <div className={`${modalOpen ? "bg-black/50" : "pointer-events-none"} duration-300 fixed w-screen h-screen top-0 left-0 z-50 grid place-items-center p-4`}>
            <div className={`${modalOpen ? "" : "scale-125 opacity-0"} duration-300 max-w-lg w-full card p-6`}>
                <div className="flex justify-between items-center">
                    <h1 className="text-xl md:text-2xl font-medium">{addMode ? "Add Item" : "Edit Item"}</h1>
                    <svg
                        onClick={() => { setModalOpen(false); }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8 text-text/70 hover:text-primary hover:scale-105 active:scale-95 duration-100 cursor-pointer hover:bg-black/10 rounded-full p-1"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4">
                    <div className="md:col-span-2">
                        <Input placeHolder="Enter Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}>Title</Input>
                    </div>

                    <Input placeHolder="Enter Canteen Name" value={formData.canteen} onChange={(e) => setFormData({ ...formData, canteen: e.target.value })}>Canteen Name</Input>

                    <Input placeHolder="Price Excluding Unit" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })}>Price</Input>

                    <div className="md:col-span-2">
                        <Input placeHolder="A Short Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}>Description</Input>
                    </div>

                    <Input placeHolder="e.g., 15 Mins" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })}>Time</Input>

                    <Input placeHolder="Image URL" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })}>Image</Input>

                    <Button className="mt-4 bg-[#477023] hover:bg-[#3a5a1c] duration-200 md:col-span-2">
                        {addMode ? "Add Item" : "Update Item"}
                    </Button>
                </form>
            </div>
        </div>
    )
}
// ... (MenuItem code )

function MenuItem(props: any) {
    const modal = useModal();
    // Destructure all item properties
    const { title, price, _id, description, image, time, canteen } = props.item;
    const { setModalOpen, setAddMode, setFormData } = props;
    const { setMenu } = useReduxAction();

    // Helper function for the delete confirmation and action
    async function handleDelete() {
        if (await modal?.CreateModal("Delete Menu Item", "Are you sure you want to delete this item?", "Delete", "Cancel")) {
            try {
                const response = await axios.delete('/menu', { data: { _id } });
                if (response.status === 200) {
                    toast.success("Item deleted successfully");
                    // Refetch menu
                    const resp = await axios.get("/menu");
                    if (resp.status == 200)
                        setMenu(resp.data.data);
                } else {
                    toast.error("Failed to delete item");
                }
            } catch (err: any) {
                toast.error(err?.response?.data?.message);
            }
        }
    }

    return (
        // The card is now a flex container
        <div className="card p-4 flex flex-col sm:flex-row gap-4 overflow-hidden">
            {/* Image Section */}
            <img
                // Use a fallback image if none is provided
                src={image || 'https://via.placeholder.com/150'}
                alt={title}
                className="w-full sm:w-36 sm:h-36 h-48 object-cover rounded-lg flex-shrink-0"
            />

            {/* Content Section */}
            <div className="flex flex-col flex-grow">
                {/* Top Row: Title, Canteen, Price */}
                <div className="flex justify-between items-start gap-2">
                    <div>
                        <h1 className="font-bold text-2xl">{title}</h1>
                        <p className="text-sm text-text/70">{canteen}</p>
                    </div>
                    <span className="font-bold text-2xl text-[#477023] flex-shrink-0">{price}</span>
                </div>

                {/* Middle Row: Description */}
                <p className="text-sm text-text/80 my-2 line-clamp-2">
                    {description}
                </p>

                {/* Bottom Row: Time & Actions - mt-auto pushes this to the bottom */}
                <div className="flex justify-between items-center mt-auto pt-2">
                    {/* Delivery Time */}
                    <div className="flex items-center gap-1.5 text-sm text-text/70">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span>{time}</span>
                    </div>

                    {/* Action Buttons: Added text for clarity */}
                    <div className="flex gap-2">
                        <Button
                            className="bg-[#E49B0F] hover:bg-[#c88a0e] text-white duration-200 text-sm font-medium !p-2 flex items-center gap-1.5"
                            onClick={() => {
                                setModalOpen(true);
                                setAddMode(false);
                                setFormData({ ...props.item, price: price.replace("₹", "") });
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                            </svg>
                            <span>Edit</span>
                        </Button>
                        <Button
                            onClick={handleDelete}
                            // Assuming this makes it red
                            className="!p-2 text-sm font-medium flex items-center gap-1.5 bg-[#950606]" // Added text, icon, and spacing
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                            <span>Delete</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

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
                {/* [UI Improvement] Added more padding (p-6) and a sub-heading for context */}
                <div className="card p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-bold">Menu</h1>
                        <p className="text-text/70 mt-1">Manage all the food items available in the canteens.</p>
                    </div>
                    <Button
                        className="bg-[#477023] hover:bg-[#3a5a1c] duration-200 flex-shrink-0" // Added hover effect
                        onClick={() => { setModalOpen(true); setAddMode(true) }}
                    >
                        Add Item
                    </Button>
                </div>
                <div className="flex flex-col gap-4 mt-4">
                    {
                        menu.map((item: any, index: number) => (
                            // Passed the full item to our new, more detailed MenuItem
                            <MenuItem setFormData={setFormData} setModalOpen={setModalOpen} setAddMode={setAddMode} key={index} item={item} />
                        ))
                    }
                </div>
            </main>
        </>
    )
}

// ... (Rest of the file: MenuModal and MenuItem components)

