import type * as React from "react";

export type ToastActionElement = React.ReactElement;

export interface ToastProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  [key: string]: unknown;
}
