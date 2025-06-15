"use client";

import React, { useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "@/config/axios.service";
import PinInput from "@/components/pin-input";

interface PinInfo {
  brand: string;
  type: string;
  voltage: string;
  date: string;
  contentKeys: string[];
  combined_info: {
    [key: string]: string | null;
  };
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function CheckPinPage() {
  const [searchResult, setSearchResult] = useState<PinInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (pin: string) => {
    setError("");
    setLoading(true);
    setSearchResult(null);

    try {
      const { data } = await axiosInstance.get(`/api/products/${pin.trim()}`);
      setSearchResult(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Không tìm thấy mã PIN");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12">
          {/* @ts-ignore */}
          <Typography
            variant="h2"
            color="blue-gray"
            className="mb-4 font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Kiểm tra thông tin PIN
          </Typography>
          {/* @ts-ignore */}
          <Typography
            variant="lead"
            color="gray"
            className="max-w-2xl mx-auto text-gray-600">
            Nhập mã PIN để tra cứu thông tin chi tiết về sản phẩm
          </Typography>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Phần tìm kiếm - 4/12 */}
          <div className="w-full lg:w-5/12">
            <PinInput onSearch={handleSearch} loading={loading} error={error} />
          </div>

          {/* Phần hiển thị thông tin - 8/12 */}
          <div className="w-full lg:w-7/12">
            <AnimatePresence mode="wait">
              {searchResult ? (
                <motion.div
                  key="result"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: 20 }}
                  className="h-full">
                  {/* @ts-ignore */}
                  <Card className="overflow-hidden shadow-2xl border border-white/20 bg-white/80 backdrop-blur-sm h-full">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-8">
                      {/* @ts-ignore */}
                      <Typography
                        variant="h4"
                        color="white"
                        className="font-bold text-center">
                        Thông tin sản phẩm
                      </Typography>
                    </div>
                    <div className="p-8">
                      <motion.div
                        variants={itemVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-lg border border-blue-100">
                            {/* @ts-ignore */}
                            <Typography
                              variant="h6"
                              color="blue-gray"
                              className="mb-6 font-semibold text-blue-900">
                              Thông tin cơ bản
                            </Typography>
                            <div className="space-y-4">
                              <div className="flex justify-between items-center border-b border-blue-100 pb-3">
                                {/* @ts-ignore */}
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-medium text-blue-700">
                                  Thương hiệu
                                </Typography>
                                {/* @ts-ignore */}
                                <Typography className="font-semibold text-blue-900">
                                  {searchResult.brand}
                                </Typography>
                              </div>
                              <div className="flex justify-between items-center border-b border-blue-100 pb-3">
                                {/* @ts-ignore */}
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-medium text-blue-700">
                                  Loại
                                </Typography>
                                {/* @ts-ignore */}
                                <Typography className="font-semibold text-blue-900">
                                  {searchResult.type}
                                </Typography>
                              </div>
                              <div className="flex justify-between items-center border-b border-blue-100 pb-3">
                                {/* @ts-ignore */}
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-medium text-blue-700">
                                  Điện áp
                                </Typography>
                                {/* @ts-ignore */}
                                <Typography className="font-semibold text-blue-900">
                                  {searchResult.voltage}
                                </Typography>
                              </div>
                              <div className="flex justify-between items-center">
                                {/* @ts-ignore */}
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-medium text-blue-700">
                                  Ngày sản xuất
                                </Typography>
                                {/* @ts-ignore */}
                                <Typography className="font-semibold text-blue-900">
                                  {searchResult.date}
                                </Typography>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-6">
                          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-lg border border-blue-100">
                            {/* @ts-ignore */}
                            <Typography
                              variant="h6"
                              color="blue-gray"
                              className="mb-6 font-semibold text-blue-900">
                              Thông số kỹ thuật
                            </Typography>
                            <div className="space-y-4">
                              {searchResult.contentKeys.map((key) => {
                                if (!key || !searchResult.combined_info[key])
                                  return null;
                                return (
                                  <div
                                    key={key}
                                    className="flex justify-between items-center border-b border-blue-100 pb-3 last:border-0">
                                    {/* @ts-ignore */}
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-medium text-blue-700">
                                      {key}
                                    </Typography>
                                    {/* @ts-ignore */}
                                    <Typography className="font-semibold text-blue-900">
                                      {searchResult.combined_info[key]}
                                    </Typography>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>
              ) : (
                <div className="h-full flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-12">
                  <div className="text-center text-gray-500">
                    <p className="text-lg">
                      Nhập mã PIN để xem thông tin sản phẩm
                    </p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
