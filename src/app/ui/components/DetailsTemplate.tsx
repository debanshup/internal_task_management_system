/* eslint-disable @next/next/no-img-element */
import React from 'react';

const DetailsTemplate = ({employee}) => {

  
    return (
      <header className="p-4 bg-zinc-50 flex items-center space-x-4">
        {/* Employee Image */}
        <div className="flex-shrink-0">
          <img
            src={employee.image_src}
            alt={`${employee.name}'s profile`}
            className="w-16 h-16 rounded-full object-cover border border-gray-300"
          />
        </div>
     
        {/* Employee Details */}
        <div>
          <h1 className="text-lg font-semibold text-gray-800">{employee.name}</h1>
          <p className="text-sm text-gray-600">{employee.profession||"profession"}</p>
        </div>
      </header>
    );
  };
  

export default DetailsTemplate;
