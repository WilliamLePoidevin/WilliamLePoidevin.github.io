import type { ReactNode } from "react";
import "./EmptyState.css";

interface EmptyStateProps {
  title: string;
  body: string;
  action?: ReactNode;
}

// Sentence case for the description, per the copy rules — never title case, never emoji.
export function EmptyState({ title, body, action }: EmptyStateProps) {
  return (
    <div className="cc-empty-state">
      <p className="cc-empty-state__title">{title}</p>
      <p className="cc-empty-state__body">{body}</p>
      {action ? <div className="cc-empty-state__action">{action}</div> : null}
    </div>
  );
}
