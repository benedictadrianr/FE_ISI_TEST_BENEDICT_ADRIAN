import { createClient } from "@/app/utils/supabase/client";
import { Tables } from "@/app/utils/supabase/types";
import React, { useEffect, useState } from "react";

type Props = {
  list: string[];
  classname?: string;
};

const TaskDelegationList = ({ list, classname }: Props) => {
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
        <li key={index}>
          {user.username}
          {index < users.length - 1 && ","}
        </li>
      ))}
    </ul>
  );
};

export default TaskDelegationList;
