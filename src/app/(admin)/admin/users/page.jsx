"use client";

import { useGetAllUsers } from "@/hooks/useAuth";
import UsersListTable from "../_components/UsersListTable";
import Loading from "@/components/Loading";

function UsersPage() {
  const { isLoading, data } = useGetAllUsers();
  const { users } = data || {};
  // console.log(data);

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-2">
      <h1 className="font-bold text-secondary-900 text-xl pb-6">
        اطلاعات کاربران
      </h1>
      <UsersListTable users={users} />
    </div>
  );
}

export default UsersPage;
