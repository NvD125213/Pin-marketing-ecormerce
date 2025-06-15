import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  ExclamationCircleIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";

interface PinInputProps {
  onSearch: (pin: string) => Promise<void>;
  loading?: boolean;
  error?: string;
}

const PinInput: React.FC<PinInputProps> = ({
  onSearch,
  loading = false,
  error: externalError,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!searchValue.trim()) {
      setError("Vui lòng nhập mã PIN");
      return;
    }
    setError("");
    await onSearch(searchValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase(); // Chuyển thành chữ hoa
    if (value.length <= 25) {
      // Tăng giới hạn độ dài
      setSearchValue(value);
      if (error) setError("");
    }
  };

  // Use external error if provided
  const displayError = externalError || error;

  return (
    <div className="w-full max-w-[1200px]">
      {/* Main Input Container */}
      <div className="relative group">
        {/* Glassmorphism Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-white/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 transition-all duration-500" />

        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-3xl blur-xl opacity-0 transition-all duration-500" />

        {/* Content */}
        <div className="relative p-12">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl mb-6 shadow-lg">
              <KeyIcon className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Nhập mã PIN
            </h2>
            <p className="text-slate-500 mt-3 text-lg">
              Vui lòng nhập mã PIN để tiếp tục
            </p>
          </div>

          {/* PIN Input Field */}
          <div className="relative mb-8">
            <div
              className={`relative overflow-hidden rounded-2xl bg-white/60 backdrop-blur-sm border-2 transition-all duration-300 ${
                focused
                  ? "border-blue-400 shadow-lg shadow-blue-400/25"
                  : displayError
                  ? "border-red-400 shadow-lg shadow-red-400/25"
                  : "border-white/40 hover:border-white/60"
              }`}>
              <input
                type="text"
                value={searchValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Nhập mã PIN..."
                disabled={loading}
                className="w-full px-8 py-6 text-2xl font-mono text-center bg-transparent outline-none placeholder-slate-400 disabled:opacity-50 tracking-wider"
                maxLength={25}
              />

              {/* Animated Border */}
              <div
                className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 ${
                  focused ? "w-full" : "w-0"
                }`}
              />
            </div>

            {/* Character Count */}
            <div className="flex justify-end items-center mt-3 px-2">
              {searchValue.length > 0 && (
                <span className="text-base text-blue-500 font-medium">
                  {searchValue.length >= 6 ? "✓ Đủ độ dài" : "⚠️ Quá ngắn"}
                </span>
              )}
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={loading || !searchValue.trim()}
            className="w-full relative overflow-hidden rounded-2xl p-6 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold text-xl shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-500 disabled:hover:to-indigo-500 group/btn">
            {/* Button Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300" />

            <div className="relative flex items-center justify-center gap-4">
              {loading ? (
                <>
                  <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Đang xử lý...</span>
                </>
              ) : (
                <>
                  <MagnifyingGlassIcon className="w-8 h-8" />
                  <span>Tìm kiếm</span>
                </>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Error Message */}
      {displayError && (
        <div className="mt-6 p-6 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-2xl">
          <div className="flex items-center gap-4 text-red-600">
            <div className="flex-shrink-0">
              <ExclamationCircleIcon className="w-6 h-6" />
            </div>
            <p className="text-base font-medium">{displayError}</p>
          </div>
        </div>
      )}

      {/* Helper Text */}
      <div className="mt-8 text-center">
        <p className="text-base text-slate-500">
          Mã PIN có thể bao gồm chữ và số
        </p>
      </div>
    </div>
  );
};

export default PinInput;
