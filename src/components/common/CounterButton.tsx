
function CounterButton(props:{quantity: number,id:string,setQuantity:any,index:number})
{
    const {quantity, setQuantity,index} = props;
    return (
    <div className={`bg-slate-300 outline outline-1 outline-text/25 ${quantity==0?"w-8":"w-24"} duration-200 h-8 relative rounded-full grid place-items-center`}>
        <div onClick={()=>{setQuantity( {index ,quantity:quantity-1})}} className="bg-gray-100 cursor-pointer select-none absolute left-0 grid place-items-center rounded-full w-8 h-8">-</div>
        <div onClick={()=>{setQuantity( {index ,quantity:quantity+1})}} className={`${quantity==0?"bg-[#2E6F40] text-white":"bg-gray-100"} duration-100 cursor-pointer select-none absolute right-0 z-10 grid place-items-center rounded-full w-8 h-8`}>+</div>
        {quantity}
    </div>
  )
}

export default CounterButton