import { Tables, Enums } from "@/app/utils/supabase/types";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useRef,
} from "react";
import { createClient } from "@/app/utils/supabase/client";
import TaskStatusTag from "./taskStatusTag";
import TaskDelegationEdit from "./taskDelegationEdit";
import { BsFillTrash3Fill as TrashIcon } from "react-icons/bs";
import DeleteTaskAlert from "./deleteTaskAlert";
import TaskDelegationList from "./taskDelegationList";

type Props = {
  task: Tables<"tasks">;
  setCurrentTask: Dispatch<SetStateAction<Tables<"tasks"> | null>>;
  setTasks: Dispatch<SetStateAction<Tables<"tasks">[]>>;
  isLead: boolean;
};

type User = {
  id: string;
  username: string;
};

const TaskDetail = ({ task, setCurrentTask, setTasks, isLead }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const statusDropdownRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!task) return;
    setCurrentTask((prev) => {
      if (!prev) return task;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleChangeTextArea = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    if (!task) return;
    setCurrentTask((prev) => {
      if (!prev) return task;
      return {
        ...prev,
        task_description: value,
      };
    });
  };

  const handleStatusChange = async (newStatus: Enums<"task_status">) => {
    if (!task) return;
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === task.id ? { ...t, task_status: newStatus } : t
      )
    );
    setCurrentTask((prev) => {
      if (!prev) return task;
      return {
        ...prev,
        task_status: newStatus,
      };
    });
    setIsStatusDropdownOpen(false);

    const supabase = await createClient();
    const { error } = await supabase
      .from("tasks")
      .update({ task_status: newStatus })
      .eq("id", task.id);

    if (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleDeleteTask = async () => {
    if (!task) return;
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
    setCurrentTask(null);

    const supabase = await createClient();
    const { error } = await supabase.from("tasks").delete().eq("id", task.id);

    if (error) {
      console.error("Error deleting task:", error);
    } else {
      window.location.href = "/dashboard";
    }
  };

  const fetchAvailableUsers = async () => {
    const supabase = await createClient();
    const delegations = task.task_delegations || [];
    const { data: users, error } = await supabase
      .from("profiles")
      .select("id, username")
      .not("id", "in", `(${delegations.join(",")})`);

    if (error) {
      console.error("Error fetching users:", error);
    } else if (users) {
      setAvailableUsers(users as User[]);
    }
  };

  const handleAddUser = async (userId: string) => {
    if (!task) return;
    const newDelegations = [...(task.task_delegations || []), userId];

    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === task.id ? { ...t, task_delegations: newDelegations } : t
      )
    );
    setCurrentTask((prev) => {
      if (!prev) return task;
      return {
        ...prev,
        task_delegations: newDelegations,
      };
    });
    setIsDropdownOpen(false);

    const supabase = await createClient();
    const { error } = await supabase
      .from("tasks")
      .update({ task_delegations: newDelegations })
      .eq("id", task.id);

    if (error) {
      console.error("Error updating task delegations:", error);
    }
  };

  const handleRemoveUser = async (userId: string) => {
    if (!task) return;
    const newDelegations = (task.task_delegations || []).filter(
      (user) => user !== userId
    );

    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === task.id ? { ...t, task_delegations: newDelegations } : t
      )
    );
    setCurrentTask((prev) => {
      if (!prev) return task;
      return {
        ...prev,
        task_delegations: newDelegations,
      };
    });

    const supabase = await createClient();
    const { error } = await supabase
      .from("tasks")
      .update({ task_delegations: newDelegations })
      .eq("id", task.id);

    if (error) {
      console.error("Error updating task delegations:", error);
    }
  };

  const handleTitleBlur = async () => {
    if (!task) return;
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === task.id ? { ...t, task_name: task.task_name } : t
      )
    );

    const supabase = await createClient();
    const { error } = await supabase
      .from("tasks")
      .update({ task_name: task.task_name })
      .eq("id", task.id);

    if (error) {
      console.error("Error updating task title:", error);
    }
  };

  const handleDescriptionBlur = async () => {
    if (!task) return;
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === task.id ? { ...t, task_description: task.task_description } : t
      )
    );

    const supabase = await createClient();
    const { error } = await supabase
      .from("tasks")
      .update({ task_description: task.task_description })
      .eq("id", task.id);

    if (error) {
      console.error("Error updating task description:", error);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      fetchAvailableUsers();
    }
  }, [isDropdownOpen, task.task_delegations]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target as Node)
      ) {
        setIsStatusDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const statusOptions: Enums<"task_status">[] = [
    "Not Started",
    "On Progress",
    "Done",
    "Reject",
  ];

  return (
    <div>
      <header className="flex justify-between">
        <div>
          {isLead ? (
            <input
              type="text"
              className="text-2xl font-bold outline-0 py-2"
              value={task.task_name}
              placeholder="Insert a title..."
              onChange={handleChange}
              onBlur={handleTitleBlur}
              name="task_name"
            />
          ) : (
            <h1 className="text-2xl font-bold py-2">{task.task_name}</h1>
          )}
          <div className="text-sm flex gap-1 items-center">
            <div className="flex">
              Team:{" "}
              {isLead ? (
                <TaskDelegationEdit
                  handleRemoveUser={handleRemoveUser}
                  classname="ml-1"
                  list={task.task_delegations || []}
                />
              ) : (
                <TaskDelegationList list={task.task_delegations || []} />
              )}
            </div>{" "}
            <div className="relative" ref={dropdownRef}>
              {isLead && (
                <button
                  className="underline cursor-pointer hover:text-blue-500"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  Add...
                </button>
              )}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 bg-zinc-900 border rounded-md shadow-lg py-1 min-w-[200px] z-10">
                  {availableUsers.length > 0 ? (
                    availableUsers.map((user) => (
                      <button
                        key={user.id}
                        className="w-full text-left px-4 py-2 hover:bg-white/25 cursor-pointer"
                        onClick={() => handleAddUser(user.id)}>
                        {user.username}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500">
                      No available users
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative" ref={statusDropdownRef}>
            <button
              onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}>
              <TaskStatusTag status={task.task_status} />
            </button>
            {isStatusDropdownOpen && (
              <div className="absolute top-full right-0 mt-1 bg-zinc-900 border rounded-md shadow-lg py-1 min-w-[200px] z-10">
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    className="w-full text-left px-4 py-2 hover:bg-white/25 cursor-pointer"
                    onClick={() => handleStatusChange(status)}>
                    <TaskStatusTag status={status} />
                  </button>
                ))}
              </div>
            )}
          </div>
          {isLead && (
            <button onClick={() => setIsDeleteAlertOpen(true)}>
              <TrashIcon className="size-6 text-red-300 hover:text-red-400" />
            </button>
          )}
        </div>
      </header>
      <div>
        {isLead ? (
          <textarea
            name="task_description"
            id="task_description"
            value={task.task_description ?? ""}
            onChange={handleChangeTextArea}
            onBlur={handleDescriptionBlur}
            className="w-full h-[200px] mt-2 bg-transparent outline-none resize-none"
            placeholder="Add a description..."
          />
        ) : (
          <p>{task.task_description ?? "Task not described yet"}</p>
        )}
      </div>

      <DeleteTaskAlert
        isOpen={isDeleteAlertOpen}
        onClose={() => setIsDeleteAlertOpen(false)}
        onConfirm={handleDeleteTask}
        taskName={task.task_name}
      />
    </div>
  );
};

export default TaskDetail;
