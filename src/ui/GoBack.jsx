"use client";

import { useRouter } from "next/navigation";

function GoBack() {
  const router = useRouter();

  const GoBackHandle = () => {
    router.back();
  };

  return <button onClick={GoBackHandle}>GoBack</button>;
}

export default GoBack;
