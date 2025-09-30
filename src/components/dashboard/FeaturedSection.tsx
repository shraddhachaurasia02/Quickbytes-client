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
    <section className={`overflow-clip rounded-xl ${props.className}`}>
      <section
        style={{
          width: `${100 * featuredSection.length}%`,
          transform: `translateX(-${(pageIndex * 100) / featuredSection.length}%)`,
        }}
        className={`h-96 md:h-128 text-background flex duration-300 mt-4 md:mt-0`}
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
      <div className="absolute -z-10 top-0 left-0 w-full h-full bg-black">
        <img
          className="w-full h-full object-cover opacity-70"
          src={props.image}
          alt=""
        />
      </div>
      <div>
        <h2>Today's Featured</h2>
      </div>
      <div>
        <h2 className="text-lg opacity-70">{props.canteen}</h2>
        <h1 className="text-3xl font-bold">{props.title}</h1>
        <h2 className="flex items-center gap-4 mt-2 opacity-70">
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
