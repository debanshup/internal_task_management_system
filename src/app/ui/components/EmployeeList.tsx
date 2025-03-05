/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import React from "react";

const EmployeeList = ({employees, clickHandler}) => {
 
  return (
    <nav className="flex min-w-[240px] flex-col mt-1 bg-white h-sceen rounded-lg">
    {employees.map((employee) => (
      <div
      onClick={()=>{clickHandler(employee)}}
        key={employee._id}
        role="button"
        className="flex items-center w-full p-3 border-b border-b-slate-100 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-200"
      >
        {/* Avatar */}
        <div className="mr-4 flex items-center justify-center">
          <img
            alt={`${employee.name}'s avatar`}
            src={employee.image_src}
            className="h-14 w-14 rounded-full object-cover object-center"
          />
        </div>
        
        {/* Name and Profession */}
        <div>
          <h6 className="text-slate-800 font-semibold text-lg">{employee.name}</h6>
          <p className="text-slate-500 text-sm ">{employee.email}</p>
          <p className="text-green-500 text-sm ">{employee.profession}</p>
        </div>
      </div>
    ))}
  </nav> 
  );
};

export default EmployeeList;
