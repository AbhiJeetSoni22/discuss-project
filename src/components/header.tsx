

import React from "react";
import { Input } from "./ui/input";
import AuthHeader from "./authHeader";

const Header = () => {


  return (
    <div className="grid grid-cols-3 items-center justify-between p-4">
      <div className="flex justify-start">
        <h1 className="font-bold text-xl">Discuss</h1>
      </div>
      <div className="mx-2">
        <Input type="text" placeholder="Search Post..." />
      </div>
      <div className="flex gap-2 justify-end">
       <AuthHeader/>
      </div>
    </div>
  );
};

export default Header;
