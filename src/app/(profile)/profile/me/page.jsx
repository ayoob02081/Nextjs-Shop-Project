"use client";

import Loading from "@/components/Loading";
import { useGetUser } from "@/hooks/useAuth";
import { updateProfileApi } from "@/services/authServices";
import Button from "@/ui/Button";
import GoBack from "@/ui/GoBack";
import TextField from "@/ui/TextField";
import { includeObj } from "@/utils/objectUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function MePage() {
  const { data, isLoading } = useGetUser();
  const [formData, setFormData] = useState({});
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutateAsync: updateProfile } = useMutation({
    mutationFn: updateProfileApi,
  });
  const { user } = data || {};

  const includesKey = ["name", "email", "phoneNumber", "biography"];
  useEffect(() => {
    if (user) setFormData(includeObj(user, includesKey));
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { message } = await updateProfile(formData);
      queryClient.invalidateQueries({ queryKey: "get-user" });
      toast.success(message);
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
    }
  };

  if (isLoading) return <Loading />;
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-secondary-900 text-xl">اطلاعات کاربری</h1>
        <GoBack />
      </div>
      <form className="form" onSubmit={submitHandler}>
        {Object.keys(includeObj(user, includesKey)).map((key) => {
          return (
            <TextField
              label={key}
              name={key}
              key={key}
              value={formData[key] || ""}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          );
        })}
        {isUpdating ? (
          <Loading />
        ) : (
          <Button type="submit" className="btn btn--primary w-full">
            تایید
          </Button>
        )}
      </form>
    </div>
  );
}

export default MePage;
