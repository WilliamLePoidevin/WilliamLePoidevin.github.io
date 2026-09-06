import "./CollectorAvatar.css";

interface CollectorAvatarProps {
  name: string;
  src?: string | null;
  size?: number;
  level?: string;
  verified?: boolean;
}

export function CollectorAvatar({ name, src, size = 40, level, verified = false }: CollectorAvatarProps) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="cc-collector-avatar" style={{ width: size }}>
      <div
        className={`cc-collector-avatar__circle${verified ? " cc-collector-avatar__circle--verified" : ""}`}
        style={{ width: size, height: size }}
      >
        {src ? (
          <img className="cc-collector-avatar__img" src={src} alt={name} />
        ) : (
          <span className="cc-collector-avatar__initials" style={{ fontSize: size * 0.34 }}>
            {initials}
          </span>
        )}
      </div>
      {level ? <span className="cc-collector-avatar__level cc-micro">{level}</span> : null}
    </div>
  );
}
