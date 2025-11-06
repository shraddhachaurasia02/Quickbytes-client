import { useEffect, useRef, useState } from "react";
import { useReduxState } from "../../hooks/UseRedux";
// import Button from "../common/Button";

function FeaturedSection(props: {className?: string}) {
  const [pageIndex, setPageIndex] = useState(1);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const featuredSection: {
    canteen: string;
    title: string;
    description: string;
    price: string;
    time: string;
    image: string;
  }[] = useReduxState().menu;

  useEffect(() => {
    timeoutRef.current = setInterval(() => {
      setPageIndex((prev) => (prev + 1) % featuredSection.length);
    }, 3000);
    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, [featuredSection]);

  return (
    <section className={`overflow-hidden rounded-2xl shadow-lg ${props.className}`}>
      <section
        style={{
          width: `${100 * featuredSection.length}%`,
          transform: `translateX(-${(pageIndex * 100) / featuredSection.length}%)`,
        }}
        className={`h-80 md:h-128 text-white flex duration-500 ease-in-out`}
      >
        {featuredSection.map((item, index) => (
          <FeaturedTile count={featuredSection.length} key={index} {...item} />
        ))}
      </section>
    </section>
  );
}

function FeaturedTile(props: {
  title: string;
  canteen: string;
  price: string;
  time: string;
  image: string;
  count: number;
  description?: string;
}) {
  return (
    <div
      style={{ width: `${100 / props.count}%` }}
      className="h-full flex flex-col justify-between relative md:p-16 p-8"
    >
      <div className="absolute -z-10 top-0 left-0 w-full h-full bg-gradient-to-br from-black/80 to-black/60">
        <img
          className="w-full h-full object-cover opacity-60"
          src={props.image}
          alt={props.title}
        />
      </div>
      <div className="relative z-10">
        <span className="inline-block px-3 py-1 bg-[#E49B0F]/90 backdrop-blur-sm rounded-full text-xs font-semibold mb-4 shadow-md">Today's Featured</span>
      </div>
      <div className="relative z-10">
        <h2 className="text-base md:text-lg opacity-90 mb-2">{props.canteen}</h2>
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight">{props.title}</h1>
        <h2 className="flex items-center gap-3 mt-2 opacity-90 text-sm md:text-base">
          <span className="">{props.price}</span>
          <span>|</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <span>{props.time}</span>
        </h2>
        {/* <div className="flex gap-4">
          <Button className="mt-4" color={"primary"}>
            Order Now
          </Button>
          <Button className="mt-4" color={"secondary"}>
            Add To Cart
          </Button>
        </div> */}
      </div>
    </div>
  );
}

export default FeaturedSection;
