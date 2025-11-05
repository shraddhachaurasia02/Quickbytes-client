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
    <div className={`bg-white border border-[#2E6F40]/20 shadow-md hover:shadow-xl rounded-2xl overflow-hidden transition-all duration-300 ${props.horizontal ? "w-full flex" : "w-64"} max-w-lg grow hover:-translate-y-1`}>
      <img
        className={`${props.horizontal ? "w-1/3" : "w-full h-56"} object-cover object-center`}
        src={image}
        alt="food"
      />
      <div className={`${props.horizontal ? "p-5" : "p-5"} grow flex flex-col`}>
        <div className="flex items-center gap-2 text-xs text-text/60 mb-2">
          <span className="font-medium">{canteen}</span>
          <span className="text-text/30">•</span>
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-3.5 h-3.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <span>{time}</span>
          </div>
        </div>
        <h2 className="font-bold text-xl md:text-2xl mb-1.5 text-text leading-tight">{title}</h2>
        <h2 className="text-sm text-text/60 mb-4 line-clamp-2">{description}</h2>
        <div className="text-sm flex justify-between items-center mt-auto">
          <h2 className="text-lg font-semibold text-[#477023]">{price}</h2>
          <CounterButton quantity={menuItem.quantity} index={props.index} id={props.item._id} setQuantity={setItemQty}/>
        </div>
      </div>
    </div>
  );
  
}

export default FoodItemCard;
