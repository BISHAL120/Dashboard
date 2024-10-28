import React from "react";

const ProductLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="  w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
      <div className="min-h-[calc(100vh-56px)] bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]">
        <div className=" max-w-[1300px] mx-auto py-5">{children}</div>
      </div>
    </div>
  );
};

export default ProductLayout;
