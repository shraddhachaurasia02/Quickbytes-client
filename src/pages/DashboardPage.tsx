import React from "react";
import Input from "../components/common/Input";
import Navbar from "../components/common/Navbar";
import FeaturedSection from "../components/dashboard/FeaturedSection";
import FoodItemCard from "../components/dashboard/FoodItemCard";
import { useReduxState } from "../hooks/UseRedux";
function DashboardPage() {
  const { menu } = useReduxState();

  const [search, setSearch] = React.useState("");

  return (
    <>
      <Navbar  />
      <main className="container mx-auto px-4 pb-8">
        <FeaturedSection className="mt-8"/>
        <section className="mt-12 md:mt-16">
          <h1 className="font-bold text-3xl md:text-5xl lg:text-6xl mb-6 md:mb-8 leading-tight">
            What Are You <span className="text-[#E49B0F]">Craving?</span>
          </h1>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeHolder="Search for food"
            icon={
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
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            }
          />
        </section>
        {search.length > 0 ? (
          <section className="py-6 md:py-8">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-text/80">
              Search Results for <span className="text-[#477023]">"{search}"</span>
            </h2>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6">
              {menu
                .filter((item: any) =>
                  item.title.toLowerCase().includes(search.toLowerCase())
                )
                .map((item: any, index: any) => (
                  <FoodItemCard key={index} index={index} item={item} />
                ))}
            </div>
          </section>
        ) : (
          <section className="py-6 md:py-8">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-text">Most Ordered</h2>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6">
              {menu.map((item: any, index: any) => (
                <FoodItemCard key={index} index={index} item={item} />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export default DashboardPage;
