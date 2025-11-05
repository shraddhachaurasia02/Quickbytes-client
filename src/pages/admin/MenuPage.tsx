import { useReduxAction, useReduxState } from "../../hooks/UseRedux";
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
    canteen: "",
  });

  useEffect(() => {
    if (!modalOpen) {
      setFormData({
        description: "",
        image: "",
        price: "",
        time: "",
        title: "",
        canteen: "",
      });
    }
  }, [modalOpen]);

  return (
    <>
      <MenuModal
        formData={formData}
        setFormData={setFormData}
        addMode={addMode}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
      <main className="w-full lg:w-[64rem] p-6 mx-auto">
        <div className="flex justify-between items-center bg-white shadow-md rounded-2xl p-6 border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-800 tracking-wide">
            🍽️ Menu Dashboard
          </h1>
          <Button
            className="bg-[#477023] hover:bg-[#588b2e] text-white px-6 py-2 rounded-lg shadow-md"
            onClick={() => {
              setModalOpen(true);
              setAddMode(true);
            }}
          >
            + Add Item
          </Button>
        </div>

        {/* Menu Items Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {menu.map((item: any, index: number) => (
            <MenuItem
              key={index}
              item={item}
              setFormData={setFormData}
              setModalOpen={setModalOpen}
              setAddMode={setAddMode}
            />
          ))}
        </div>
      </main>
    </>
  );
}

function MenuModal({
  modalOpen,
  setModalOpen,
  addMode,
  formData,
  setFormData,
}: {
  modalOpen: boolean;
  setModalOpen: Function;
  addMode: boolean;
  formData: {
    title: string;
    price: string;
    description: string;
    time: string;
    image: string;
    canteen: string;
  };
  setFormData: Function;
}) {
  const { setMenu } = useReduxAction();

  async function GetMenu() {
    try {
      const resp = await axios.get("/menu");
      if (resp.status == 200) setMenu(resp.data.data);
    } catch (e: any) {
      toast.error(e.message, {
        position: "bottom-right",
      });
    }
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    const endpoint = addMode ? "/menu" : "/menu";
    const method = addMode ? axios.post : axios.put;

    try {
      const response = await method(endpoint, {
        ...formData,
        price: `₹${formData.price}`,
      });
      if (response.status === 200) {
        toast.success(`Item ${addMode ? "added" : "updated"} successfully`);
        setModalOpen(false);
        setFormData({
          description: "",
          image: "",
          price: "",
          time: "",
          title: "",
          canteen: "",
        });
        GetMenu();
      } else {
        toast.error(`Failed to ${addMode ? "add" : "update"} item`);
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 grid place-items-center transition-all duration-300 ${
        modalOpen ? "bg-black/50 visible opacity-100" : "opacity-0 invisible"
      }`}
    >
      <div
        className={`bg-white w-[90%] max-w-md rounded-2xl shadow-lg p-6 transform transition-all duration-300 ${
          modalOpen ? "scale-100 opacity-100" : "scale-110 opacity-0"
        }`}
      >
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            {addMode ? "Add Menu Item" : "Edit Menu Item"}
          </h1>
          <button
            onClick={() => setModalOpen(false)}
            className="text-gray-500 hover:text-[#477023] transition"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            placeHolder="Enter Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          >
            Title
          </Input>
          <Input
            placeHolder="Enter Canteen Name"
            value={formData.canteen}
            onChange={(e) =>
              setFormData({ ...formData, canteen: e.target.value })
            }
          >
            Canteen Name
          </Input>
          <Input
            placeHolder="Price (exclude ₹)"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          >
            Price
          </Input>
          <Input
            placeHolder="Short Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          >
            Description
          </Input>
          <Input
            placeHolder="Delivery Time (e.g., 15 mins)"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          >
            Time
          </Input>
          <Input
            placeHolder="Image URL"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          >
            Image
          </Input>

          <Button className="mt-4 bg-[#477023] hover:bg-[#588b2e] text-white py-2 rounded-lg transition">
            {addMode ? "Add Item" : "Update Item"}
          </Button>
        </form>
      </div>
    </div>
  );
}

function MenuItem({ item, setFormData, setModalOpen, setAddMode }: any) {
  const modal = useModal();
  const { title, price, _id, description, image, canteen, time } = item;
  const { setMenu } = useReduxAction();

  return (
    <div className="bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all rounded-2xl overflow-hidden flex flex-col">
      {image ? (
        <img
          src={image}
          alt={title}
          className="h-40 w-full object-cover rounded-t-2xl"
        />
      ) : (
        <div className="h-40 w-full bg-gray-100 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}

      <div className="p-4 flex flex-col gap-2">
        <h2 className="font-semibold text-lg text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="font-medium text-[#477023]">{price}</span>
          <span className="text-sm text-gray-500">{time}</span>
        </div>
        <p className="text-sm text-gray-400 italic">Canteen: {canteen}</p>

        <div className="flex gap-3 mt-4">
          <Button
            className="flex-1 bg-[#E49B0F] hover:bg-[#f2aa2d] text-white rounded-lg py-1"
            onClick={() => {
              setModalOpen(true);
              setAddMode(false);
              setFormData({ ...item, price: price.replace("₹", "") });
            }}
          >
            Edit
          </Button>
          <Button
            className="flex-1 bg-[#950606] hover:bg-red-700 text-white rounded-lg py-1"
            onClick={async () => {
              if (
                await modal?.CreateModal(
                  "Delete Menu Item",
                  "Are you sure you want to delete this item?",
                  "Delete",
                  "Cancel"
                )
              ) {
                try {
                  const response = await axios.delete("/menu", {
                    data: { _id },
                  });
                  if (response.status === 200) {
                    toast.success("Item deleted successfully");
                    const resp = await axios.get("/menu");
                    if (resp.status == 200) setMenu(resp.data.data);
                  } else {
                    toast.error("Failed to delete item");
                  }
                } catch (err: any) {
                  toast.error(err?.response?.data?.message);
                }
              }
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
