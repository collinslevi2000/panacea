"use client";
import { useRouter } from "next/navigation";

export default function useApp() {
  const router = useRouter();

  function toContactUs() {
    router.push("/contact-us");
  }

  return {
    toContactUs,
  };
}
