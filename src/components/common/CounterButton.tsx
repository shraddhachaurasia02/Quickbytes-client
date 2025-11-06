
function CounterButton(props:{quantity: number,id:string,setQuantity:any,index:number})
{
    const {quantity, setQuantity,index} = props;
    return (
    <div className={`bg-[#477023]/10 ${quantity==0?"w-9":"w-28"} duration-300 h-9 relative rounded-full grid place-items-center border border-[#477023]/20 shadow-sm`}>
        <div onClick={()=>{setQuantity( {index ,quantity:quantity-1})}} className="bg-white hover:bg-gray-50 cursor-pointer select-none absolute left-0 grid place-items-center rounded-full w-9 h-9 text-text/70 hover:text-text font-medium text-sm shadow-sm transition-colors">−</div>
        <div onClick={()=>{setQuantity( {index ,quantity:quantity+1})}} className={`${quantity==0?"bg-[#477023] text-white hover:bg-[#3d5f1f]":"bg-white hover:bg-gray-50 text-[#477023]"} duration-200 cursor-pointer select-none absolute right-0 z-10 grid place-items-center rounded-full w-9 h-9 font-medium text-sm shadow-sm transition-all`}>+</div>
        <span className={`text-sm font-semibold ${quantity==0 ? "text-text/40" : "text-[#477023]"}`}>{quantity}</span>
    </div>
  )
}

export default CounterButton