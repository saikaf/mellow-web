"use client";

import { useEffect } from "react";

export default function Contact() {
  useEffect(() => {
    window.location.replace("/#contact");
  }, []);
  return null;
}
