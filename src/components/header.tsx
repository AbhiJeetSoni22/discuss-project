import React, { Suspense } from "react";
import AuthHeader from "./authHeader";
import SearchInput from "./SearchInput";

const Header = () => {
  return (
    <div className="grid grid-cols-3 items-center justify-between p-4">
      <div className="flex justify-start">
        <h1 className="font-bold text-xl">Discuss</h1>
      </div>
      <div className="mx-2">
        <Suspense fallback={<p>Searching...</p>}>
          <SearchInput />
        </Suspense>
      </div>
      <div className="flex gap-2 justify-end">
        <AuthHeader />
      </div>
    </div>
  );
};

export default Header;
