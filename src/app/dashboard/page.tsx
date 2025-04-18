"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import Button from "../components/shared/button";
import { redirect } from "next/navigation";
import RoleTag from "../components/dashboard/RoleTag";
import { Tables } from "../utils/supabase/types";
import { createClient } from "../utils/supabase/client";
import TaskList from "../components/dashboard/taskList";
import TaskDetail from "../components/dashboard/TaskDetail";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Tables<"tasks">[]>([]);
  const [currentTask, setCurrentTask] = useState<Tables<"tasks"> | null>(null);
  const getUser = async () => {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
  };

  const getTasks = async () => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("id");
    if (error) {
      console.error(error.message);
    } else if (data) {
      const filteredTasks =
        user?.user_metadata.role === "team"
          ? data.filter((task) =>
              task.task_delegations?.includes(user?.id || "")
            )
          : data;
      setTasks(filteredTasks);
      setCurrentTask(filteredTasks[0]);
    }
  };

  const handleLogout = async () => {
    const supabase = await createClient();
    supabase.auth.signOut();
    redirect("/login");
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      getTasks();
    }
  }, [user]);

  const createNewTask = async () => {
    const supabase = await createClient();

    const { error } = await supabase.from("tasks").insert({});

    if (error) {
      console.error(error.message);
    } else {
      console.log("Task added successfully");
      getTasks();
    }
  };
  const handleSelectTask = async (id: number) => {
    const selectedTask = tasks.find((task) => task.id === id);
    if (selectedTask) {
      setCurrentTask(selectedTask);
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="w-full border-b py-2 px-4 flex justify-between h-[8%] max-h-[60px]">
        <div className="flex items-center gap-2">
          <p>{user?.user_metadata.username}</p>
          <RoleTag role={user?.user_metadata.role} />
        </div>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <div className="h-[92%] w-full flex">
        <div className="overflow-y-auto border-x h-full w-full max-w-[300px] flex flex-col items-center p-2 gap-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-transparent">
          <ul className="w-full">
            {tasks
              .sort((a, b) => a.id - b.id)
              .map((task) => (
                <TaskList
                  currentTaskId={currentTask ? currentTask.id : 0}
                  handleSelectTask={handleSelectTask}
                  key={task.id}
                  task={task}
                />
              ))}
          </ul>
          {user?.user_metadata.role === "lead" && (
            <Button onClick={createNewTask}>Create New</Button>
          )}
        </div>
        <div className="w-full h-full p-4 relative">
          {currentTask ? (
            <TaskDetail
              isLead={user?.user_metadata.role === "lead"}
              setTasks={setTasks}
              setCurrentTask={setCurrentTask}
              task={currentTask}
            />
          ) : (
            <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-1/2">
              Select a Task...
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
