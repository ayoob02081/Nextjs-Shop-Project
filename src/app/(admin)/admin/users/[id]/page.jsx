"use client";

import { useGetAllUsers } from "@/hooks/useAuth";
import Loading from "@/components/Loading";
import { useParams } from "next/navigation";
import GoBack from "@/ui/GoBack";

function UsersPage() {
  const { id } = useParams();
  const { isLoading, data } = useGetAllUsers();
  const { users } = data || {};
  console.log(users);

  const currentUser = users?.filter((user) => user._id === id);
  console.log(currentUser && currentUser[0].name);

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-secondary-900">اطلاعات کاربر</h1>
        <GoBack />
      </div>
      <div>{currentUser && currentUser[0].name}</div>
    </div>
  );
}

export default UsersPage;
