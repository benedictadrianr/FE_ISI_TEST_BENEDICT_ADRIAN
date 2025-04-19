import { Enums } from "@/app/utils/supabase/types";
import React from "react";

type Props = {
  status: Enums<"task_status">;
};

const TaskStatusTag = ({ status }: Props) => {
  const TaskColorType = () => {
    switch (status) {
      case "Not Started":
        return "border-gray-500 text-gray-500";
      case "On Progress":
        return "border-blue-500 text-blue-500";
      case "Done":
        return "border-green-500 text-green-500";
      case "Reject":
        return "border-red-500 text-red-500";
    }
  };
  return (
    <div className={`border px-2 rounded-md text-center ${TaskColorType()}`}>
      {status}
    </div>
  );
};

export default TaskStatusTag;
