import "./OpenChamber.css";

interface OpenChamberProps {
  label?: string;
  hint?: string;
  onClick?: () => void;
  ratio?: string;
}

// The add-to-cabinet affordance: an empty slot in the shelf grid, not a floating "+" button.
export function OpenChamber({ label = "The Open Chamber", hint = "Room for the next one.", onClick, ratio = "2 / 3" }: OpenChamberProps) {
  return (
    <button type="button" className="cc-open-chamber" style={{ aspectRatio: ratio }} onClick={onClick} aria-label={label}>
      <span className="cc-label cc-open-chamber__label">{label}</span>
      {hint ? <span className="cc-micro cc-open-chamber__hint">{hint}</span> : null}
    </button>
  );
}
