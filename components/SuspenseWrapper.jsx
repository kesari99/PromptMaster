"use client";

import React, { Suspense } from "react";
import Loading from "@components/Loading"; 

const SuspenseWrapper = ({ children }) => {
  return (
    <Suspense fallback={<Loading />}>
      {children}
    </Suspense>
  );
};

export default SuspenseWrapper;
