"use client";

import { useEffect } from "react";
import { useCart } from "@/store/use-cart";

export default function CartHydrator() {
  const hydrate = useCart((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return null;
}