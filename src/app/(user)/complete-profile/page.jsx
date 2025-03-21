"use client";

import { completeProfileApi } from "@/services/authServices";
import Button from "@/ui/Button";
import TextField from "@/ui/TextField";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

function CompleteProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const { isPending, mutateAsync: completeProfile } = useMutation({
    mutationFn: completeProfileApi,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { message, user } = await completeProfile({ name, email });
      router.push("/");
      document.location.href = "/";
      setName("");
      setEmail("");
      toast.success(message);
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex justify-center ">
      <div className="w-full sm:max-w-screen-sm ">
        <form className="form" onSubmit={submitHandler}>
          <TextField
            label="نام و نام خاکوادگی"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            //   isRequired
            className=""
          />
          <TextField
            label="ایمیل"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            //   isRequired
            className=""
          />
          {isPending ? (
            "Loading..."
          ) : (
            <Button type="submit" className="btn btn--primary w-full">
              تایید
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}

export default CompleteProfilePage;
