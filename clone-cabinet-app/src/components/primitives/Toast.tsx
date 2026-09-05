import { useEffect } from "react";
import "./Toast.css";

type Tone = "success" | "error" | "neutral";

interface ToastProps {
  tone?: Tone;
  message: string;
  onDismiss: () => void;
}

// 2800ms auto-dismiss, per the Motion system spec's --dur-toast.
export function Toast({ tone = "neutral", message, onDismiss }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 2800);
    return () => clearTimeout(t);
  }, [onDismiss, message]);

  return (
    <div className={`cc-toast cc-toast--${tone}`} role="status">
      {message}
    </div>
  );
}
