"use client";

import { MotionConfig } from "framer-motion";

// Todas las animaciones de framer-motion respetan prefers-reduced-motion
const Motion = ({ children }: { children: React.ReactNode }) => (
  <MotionConfig reducedMotion="user">{children}</MotionConfig>
);

export default Motion;
