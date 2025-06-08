import React, { useState } from 'react';
import line from '../assets/line full.png';

const Donation = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const options = [
    'Select Option 1',
    'Select Option 2',
    'Select Option 3',
    'Select Option 4',  
  ];

  return (
    <div className="bg-[#AC9364] justify-center py-8 min-h-screen">
      <div className="w-[1195px] mx-auto p-[2px] box-border rounded-lg gold-border bg-opacity-10">
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-6 text-white text-left">DONATION</h2>
          <img src={line} alt="separator" className="w-full my-4" />
          <div className="flex flex-col">
            {options.map((label, index) => (
              <div key={index} className="w-full">
                <div
                  onClick={() => toggleDropdown(index)}
                  className="cursor-pointer p-3 text-white font-semibold"
                >
                  {label}
                </div>
                {openIndex === index && (
                  <div className="p-4 mt-1 text-white">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Nullam quis nulla sed orci faucibus elementum. Pellentesque habitant morbi tristique senectus et netus.
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donation;
