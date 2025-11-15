"use client";
import heroBg from "@/assets/images/herobg.png";
import heroiamge from "@/assets/images/heroiamge.png";
import { Container } from "@/components/ui-library/container";
import Image from "next/image";

const Banner = () => {
  return (
    <div
      className="bg-cover bg-center min-h-[652px] pt-10 lg:pb-0 pb-10"
      style={{ backgroundImage: `url(${heroBg.src})` }}
    >
      <Container>
        <div className="flex lg:flex-row flex-col items-center gap-[60px]">
          <div className="flex-1">
            <h1 className="lg:text-[50px] md:text-[40px] sm:text-[30px] text-[26px] font-bold text-black ">
              Smart Automated{" "}
              <span className="text-primary">‘Live’ Event Management</span> Tool
              for Sports Clubs
            </h1>
            <p className="mt-[30px] mb-12 text-text-primary">
              Two versions — one with AI mention, one without (you should
              confirm whether AI is used)
            </p>
            <button
              className="bg-primary  text-white px-[26px] py-4 rounded-xl text-sm font-medium hover:bg-primary-hover transition-colors duration-200 cursor-pointer"
              onClick={() => {
                alert("Redirecting to app store...");
              }}
            >
              Try 1 Month Free
            </button>
          </div>
          <div className="flex-1">
            <Image
              src={heroiamge}
              alt="Hero Image"
              className="w-full h-auto shadow-xl"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
