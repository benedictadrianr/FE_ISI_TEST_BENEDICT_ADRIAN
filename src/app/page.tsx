import Link from "next/link";
import Button from "./components/shared/button";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl">Your Company To Do List App</h1>
      <div className="flex gap-4">
        <Link href="/login">
          <Button>Login</Button>
        </Link>
        <Link href="/signup">
          <Button>Signup</Button>
        </Link>
      </div>
    </div>
  );
}
