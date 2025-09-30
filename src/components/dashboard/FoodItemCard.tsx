import { useMemo } from "react";
import { useReduxAction, useReduxState } from "../../hooks/UseRedux";
import CounterButton from "../common/CounterButton";

// type FoodItemCardProps = {
//   image: string;
//   title: string;
//   description: string;
//   price: string;
//   canteen: string;
//   time: string;
//   _id:string
// };

function FoodItemCard(props: any)
{

  const { menu } = useReduxState();
  const { setItemQty } = useReduxAction();

  const menuItem = useMemo(()=>
    menu.find((item:any) => item._id === props.item?._id)
  ,[props.item,menu])

  
  if (props.item === undefined) {
    return (
      <div className={`bg-white shadow-lg rounded-lg overflow-hidden grow`}>
        <div className="w-full h-56 object-cover object-center animate-pulse bg-gray-300" />
        <div className="p-4">
          <h2 className="bg-gray-100 h-4 rounded-full animate-pulse w-2/3"></h2>
          <h2 className="bg-gray-100 h-4 rounded-full animate-pulse mt-2"></h2>
          <h2 className="bg-gray-100 h-4 rounded-full animate-pulse w-2/3 mt-2"></h2>
          <h2 className="bg-gray-100 h-4 rounded-full animate-pulse w-1/3 mt-2"></h2>
          <h2 className="bg-gray-100 h-4 rounded-full animate-pulse mt-2"></h2>
        </div>
      </div>
    );
  }

  const { image, title, description, price, canteen, time } = props.item;
  return (
    <div className={`bg-white border-2 border-[#2E6F40] shadow-lg rounded-lg overflow-hidden ${props.horizontal ? "w-full flex" : "w-64"} max-w-lg grow`}>
      <img
        className={`${props.horizontal ? "w-1/3" : "w-full h-56"} object-cover object-center`}
        src={image}
        alt="food"
      />
      <div className="p-4 grow">
        <h2 className="flex items-center gap-2 md:gap-4 opacity-70 text-xs">
          <span className="">{canteen}</span>
          <span>|</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <span>{time}</span>
        </h2>
        <h2 className="font-bold text-2xl">{title}</h2>
        <h2 className="text-sm text-gray-500">{description}</h2>
        <div className="text-sm flex justify-between items-center mt-2">
          <h2 className="text-xl text-gray-500">{price}</h2>
          <CounterButton quantity={menuItem.quantity} index={props.index} id={props.item._id} setQuantity={setItemQty}/>
        </div>
      </div>
    </div>
  );
  
}

export default FoodItemCard;
