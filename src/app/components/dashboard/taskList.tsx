import { Tables } from "@/app/utils/supabase/types";
import React from "react";
import TaskStatusTag from "./taskStatusTag";
import TaskDelegationList from "./taskDelegationList";

type Props = {
  task: Tables<"tasks">;
  handleSelectTask: (id: number) => void;
  currentTaskId: number;
};

const TaskList = ({ task, handleSelectTask, currentTaskId }: Props) => {
  return (
    <button
      onClick={() => handleSelectTask(task.id)}
      className={`${
        currentTaskId === task.id && "bg-white/10"
      } w-full max-h-[50px flex flex-col cursor-pointer rounded-md gap-2 p-2 hover:bg-white/25`}>
      <div className="flex justify-between">
        <p className="text-xl font-bold flex-1 text-start overflow-hidden truncate">
          {task.task_name !== "" ? (
            task.task_name
          ) : (
            <span className="text-zinc-500">Untitled</span>
          )}
        </p>
        <TaskStatusTag status={task.task_status} />
      </div>
      <div className="text-sm flex gap-1 flex-1 overflow-hidden truncate">
        Team:{" "}
        {!task.task_delegations ? (
          "None"
        ) : (
          <TaskDelegationList list={task.task_delegations} />
        )}
      </div>
    </button>
  );
};

export default TaskList;
