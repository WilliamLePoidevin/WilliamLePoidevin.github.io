import type { ReactNode } from "react";
import { useNav } from "../../nav/NavProvider";
import "./ScreenTransition.css";

// Depth-aware transition: pushing deeper advances +12px/scale(.988)/420ms, popping recedes
// -8px/scale(1.012)/300ms, both cubic-bezier(.22,1,.36,1) (--ease-standard). Switching tabs
// uses the default content entrance (cc-reveal) — the handoff doesn't specify a distinct
// depth transition for lateral tab switches, only for push/pop within a tab's own stack.
interface ScreenTransitionProps {
  contentKey: string;
  children: ReactNode;
}

export function ScreenTransition({ contentKey, children }: ScreenTransitionProps) {
  const { transition } = useNav();
  const animClass =
    transition.kind === "push"
      ? "cc-screen-transition--forward"
      : transition.kind === "pop"
        ? "cc-screen-transition--back"
        : "cc-screen-transition--reveal";

  return (
    <div className="cc-screen-transition" key={contentKey}>
      <div className={`cc-screen-transition__content ${animClass}`}>{children}</div>
    </div>
  );
}
