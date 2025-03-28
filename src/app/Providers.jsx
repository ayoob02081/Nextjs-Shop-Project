"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

function Providers({ children }) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default Providers;
