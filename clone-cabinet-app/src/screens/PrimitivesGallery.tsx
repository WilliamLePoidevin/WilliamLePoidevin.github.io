import { useState, type ReactNode } from "react";
import { TweaksPanel } from "../components/TweaksPanel";
import {
  Button,
  StatusChip,
  Toast,
  EmptyState,
  SkeletonLoader,
  VerifiedBadge,
  IrisSeam,
  Icon,
  type IconName,
} from "../components/primitives";
import "./PrimitivesGallery.css";

const ICON_NAMES: IconName[] = ["check", "close", "chevron-left", "chevron-right", "dot", "alert", "plus"];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="cc-gallery__section">
      <h2 className="cc-label cc-gallery__section-title">{title}</h2>
      <div className="cc-gallery__section-body">{children}</div>
    </section>
  );
}

export function PrimitivesGallery() {
  const [wide, setWide] = useState(false);
  const [chipSelected, setChipSelected] = useState(false);
  const [toast, setToast] = useState<{ tone: "success" | "error" | "neutral"; message: string } | null>(null);

  return (
    <div className={`cc-gallery${wide ? " cc-gallery--wide" : ""}`} data-layout={wide ? "wide" : "phone"}>
      <TweaksPanel wide={wide} onWideChange={setWide} />

      <div className="cc-gallery__content">
        <header className="cc-gallery__header">
          <p className="cc-wordmark cc-gallery__wordmark">Clone Cabinet</p>
          <h1 className="cc-gallery__title">Primitives gallery</h1>
          <p className="cc-gallery__subtitle">
            Phase 1-2 of START_HERE.md's build order: the token layer and core primitives, rendered
            side by side against the design handoff. No screen, no data — just the pieces every
            screen will share.
          </p>
        </header>

        <Section title="Button">
          <div className="cc-gallery__row">
            <Button variant="primary">Confirm</Button>
            <Button variant="secondary">Cancel</Button>
            <Button variant="ghost">Skip</Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
            <Button variant="primary" size="sm">
              Small
            </Button>
          </div>
        </Section>

        <Section title="StatusChip">
          <div className="cc-gallery__row">
            <StatusChip selected={chipSelected} onClick={() => setChipSelected((v) => !v)}>
              Warm Spicy
            </StatusChip>
            <StatusChip tone="cabinet">In Cabinet</StatusChip>
            <StatusChip tone="warning">Discontinued</StatusChip>
            <StatusChip tone="signal">Live</StatusChip>
            <StatusChip tone="success">Community Confirmed</StatusChip>
          </div>
        </Section>

        <Section title="VerifiedBadge">
          <div className="cc-gallery__row cc-gallery__row--center">
            <VerifiedBadge size="sm" />
            <VerifiedBadge size="md" />
            <span className="cc-gallery__caption">Curator level, verified collector</span>
          </div>
        </Section>

        <Section title="IrisSeam">
          <div className="cc-gallery__row cc-gallery__row--center">
            <IrisSeam length="26px" pulse />
            <IrisSeam length="80px" />
            <IrisSeam orientation="v" length="40px" flash />
          </div>
        </Section>

        <Section title="Icon">
          <div className="cc-gallery__row cc-gallery__row--center">
            {ICON_NAMES.map((name) => (
              <div className="cc-gallery__icon" key={name}>
                <Icon name={name} title={name} />
                <span className="cc-micro">{name}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="SkeletonLoader">
          <div className="cc-gallery__skeleton-row">
            <SkeletonLoader width={64} height={64} radius="var(--radius-card)" />
            <div className="cc-gallery__skeleton-lines">
              <SkeletonLoader width="70%" height={14} />
              <SkeletonLoader width="40%" height={12} />
            </div>
          </div>
        </Section>

        <Section title="EmptyState">
          <EmptyState title="Nothing under that name" body="Try a house, an accord, or a collector handle." />
        </Section>

        <Section title="Toast">
          <div className="cc-gallery__row">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setToast({ tone: "success", message: "Added to cabinet" })}
            >
              Trigger success
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setToast({ tone: "error", message: "Couldn't save" })}
            >
              Trigger error
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setToast({ tone: "neutral", message: "Vote recorded" })}
            >
              Trigger neutral
            </Button>
          </div>
        </Section>
      </div>

      {toast ? (
        <div className="cc-gallery__toast-slot">
          <Toast tone={toast.tone} message={toast.message} onDismiss={() => setToast(null)} />
        </div>
      ) : null}
    </div>
  );
}
