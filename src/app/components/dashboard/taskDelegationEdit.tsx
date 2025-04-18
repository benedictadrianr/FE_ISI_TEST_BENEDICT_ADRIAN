import { createClient } from "@/app/utils/supabase/client";
import { Tables } from "@/app/utils/supabase/types";
import React, { useEffect, useState } from "react";

type Props = {
  list: string[];
  classname?: string;
  handleRemoveUser: (id: string) => void;
};

const TaskDelegationEdit = ({ list, classname, handleRemoveUser }: Props) => {
  const [users, setUsers] = useState<Tables<"profiles">[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const supabase = await createClient();

      const { data, error } = await supabase
        .from("profiles")
        .select()
        .in("id", list);
      if (error) {
        console.error(error.message);
      } else if (data) {
        setUsers(data);
      }
    };
    getUsers();
  }, [list]);
  return (
    <ul className={`${classname} flex gap-1`}>
      {users.map((user, index) => (
        <li className="border border-zinc-500 rounded-md px-2" key={index}>
          <button
            onClick={() => handleRemoveUser(user.id)}
            className="hover:text-red-500">
            ✖
          </button>{" "}
          {user.username}
          {index < users.length - 1 && ","}
        </li>
      ))}
    </ul>
  );
};

export default TaskDelegationEdit;
