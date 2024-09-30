import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const CabinSelection = () => {
  const cabinNames = [
    "Singapore",
    "Sydney",
    "New Delhi",
    "Washington D.C",
    "Moscow",
    "Tokyo",
    "Paris",
    "Dubai",
    "London",
    "Berlin",
    "Rome",
  ];
  const navigate = useNavigate();

  const handleCabinSelect = (cabinName) => {
    // Navigate to the specific cabin page
    navigate(`/cabin/${cabinName}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-col items-center justify-center p-8 flex-1">
        <h1 className="text-3xl font-bold uppercase mb-8">Select Your Cabin</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
          {cabinNames.map((cabinName, index) => (
            <button
              key={index}
              onClick={() => handleCabinSelect(cabinName)}
              className="p-6 h-24 bg-lime-600 text-white text-xl font-bold rounded-lg shadow-lg hover:bg-rose-700 transition transform hover:scale-105"
            >
              {cabinName}
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CabinSelection;
