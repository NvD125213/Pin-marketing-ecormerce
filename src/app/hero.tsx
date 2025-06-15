"use client";

import Image from "next/image";
import { Button, Typography, Card } from "@material-tailwind/react";
import { FaAmazon } from "react-icons/fa";
import { SiWalmart } from "react-icons/si";
import { SiTaobao } from "react-icons/si";

function Hero() {
  return (
    <div className="!flex h-[55vh] w-full items-center justify-between px-10">
      <Image
        width={1200}
        height={1200}
        src="/image/powerbg.jpg"
        alt="bg-img"
        className="absolute inset-0 ml-auto w-[1200px] h-[658px] rounded-bl-[100px] object-cover object-center"
      />
      <div className="container mx-auto mt-28">
        <div className="grid grid-cols-12 text-center lg:text-left">
          <Card className="col-span-full rounded-xl border border-white bg-white/90 py-10 p-8 shadow-lg shadow-black/10 backdrop-blur-sm backdrop-saturate-200 xl:col-span-7">
            <Typography
              variant="h1"
              color="blue-gray"
              className="lg:text-5xl !leading-snug text-3xl lg:max-w-3xl">
              Khai Phá Năng Lượng Trong Từng Viên Pin
            </Typography>
            <Typography variant="lead" className="mb-10 mt-6 !text-gray-900">
              Bạn đã sẵn sàng để luôn tràn đầy năng lượng và không bị gián đoạn?
              Đừng tìm đâu xa! Chúng tôi là người bạn đồng hành đáng tin cậy,
              mang đến nguồn pin bền bỉ, mạnh mẽ cho mọi nhu cầu của bạn
            </Typography>
            <div className="mb-8 flex justify-center gap-4 lg:justify-start">
              <Button color="gray">Về chúng tôi</Button>
              <Button color="gray" variant="outlined">
                Check bảng giá
              </Button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 items-center justify-between gap-6 lg:justify-start">
              <FaAmazon className="w-[110px] h-[110px] grayscale opacity-60 transition-transform hover:scale-105" />
              <SiWalmart className="w-[144px] h-[144px] transition-transform hover:scale-105" />
              <SiTaobao className="w-[120px] h-[120px] grayscale opacity-60 transition-transform hover:scale-105" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
export default Hero;
