import { Metadata } from "next";

import { HomePage } from "@/views/home/ui/home-page";


export const metadata: Metadata = {
  title: "Home",
};

export default function HomeRoute() {
  return <HomePage />;
}