"use client";

import Link from "next/link";
import Button from "./components/shared/button";

const NotFound = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <p>We couldn&apos;t find your page... (404 Not Found)</p>
      <Link href="/">
        <Button>Back to home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
