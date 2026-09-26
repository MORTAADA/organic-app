import type * as React from "react";

/**
 * Toast types
 *
 * This file contains the shared types used by:
 * src/hooks/use-toast.ts
 *
 * The current application does not require a visual Toast component,
 * so we keep this file dependency-free.
 */

/**
 * Element used as an optional action inside a toast.
 *
 * Example:
 * <button>Undo</button>
 */
export type ToastActionElement = React.ReactElement;

/**
 * Properties accepted by the toast state manager.
 */
export interface ToastProps {
  /**
   * Controls whether the toast is visible.
   */
  open?: boolean;

  /**
   * Called when the toast visibility changes.
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Optional toast title.
   */
  title?: React.ReactNode;

  /**
   * Optional toast description.
   */
  description?: React.ReactNode;

  /**
   * Optional action element.
   */
  action?: ToastActionElement;

  /**
   * Allows additional properties without breaking
   * the toast state management system.
   */
  [key: string]: unknown;
}
