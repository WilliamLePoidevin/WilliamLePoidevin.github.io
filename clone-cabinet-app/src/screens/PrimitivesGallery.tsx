import { useState, type ReactNode } from "react";
import { TweaksPanel } from "../components/TweaksPanel";
import { useTheme } from "../theme/ThemeProvider";
import {
  Button,
  StatusChip,
  Toast,
  EmptyState,
  SkeletonLoader,
  VerifiedBadge,
  IrisSeam,
  Icon,
  BrandMark,
  NavGlyph,
  type IconName,
  type IconTone,
  type NavGlyphName,
} from "../components/primitives";
import "./PrimitivesGallery.css";

const ICON_NAMES: IconName[] = ["check", "close", "chevron-left", "chevron-right", "dot", "alert", "plus"];
const ICON_TONES: IconTone[] = ["idle", "active", "selected"];
const NAV_GLYPHS: NavGlyphName[] = ["discover", "collection", "scent-lineage", "connect", "private-archive"];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="cc-gallery__section">
      <h2 className="cc-label cc-gallery__section-title">{title}</h2>
      <div className="cc-gallery__section-body">{children}</div>
    </section>
  );
}

export function PrimitivesGallery() {
  const { mode } = useTheme();
  const glyphMode = mode === "day" ? "ink" : "light";
  const [wide, setWide] = useState(false);
  const [chipSelected, setChipSelected] = useState(false);
  const [toast, setToast] = useState<{ tone: "success" | "error" | "neutral"; message: string } | null>(null);

  return (
    <div className={`cc-gallery${wide ? " cc-gallery--wide" : ""}`} data-layout={wide ? "wide" : "phone"}>
      <TweaksPanel wide={wide} onWideChange={setWide} />

      <div className="cc-gallery__content">
        <header className="cc-gallery__header">
          <BrandMark variant="mark" size={40} />
          <p className="cc-wordmark cc-gallery__wordmark">Clone Cabinet</p>
          <h1 className="cc-gallery__title">Primitives gallery</h1>
          <p className="cc-gallery__subtitle">
            Token layer, primitives, and the delivered brand assets, rendered against all 13
            published colorways. No screen, no data — just the pieces every screen will share.
          </p>
        </header>

        <Section title="BrandMark">
          <div className="cc-gallery__row cc-gallery__row--center">
            <BrandMark variant="icon" size={24} />
            <BrandMark variant="mark" size={72} />
            <BrandMark variant="stacked" size={160} />
          </div>
          <p className="cc-gallery__caption">
            Raster only — the mark is a photographic 3D object, not vector artwork. Below 56px it
            falls back to the icon squircle automatically.
          </p>
        </Section>

        <Section title="Button">
          <div className="cc-gallery__row">
            <Button variant="primary">Confirm</Button>
            <Button variant="secondary">Cancel</Button>
            <Button variant="ghost">Skip</Button>
            <Button variant="signal">Confirms this</Button>
            <Button variant="caution">Remove</Button>
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
            <StatusChip tone="trade">For Trade</StatusChip>
          </div>
        </Section>

        <Section title="VerifiedBadge">
          <div className="cc-gallery__row cc-gallery__row--center">
            <VerifiedBadge size="sm" />
            <VerifiedBadge size="md" tone="alloy" label="Curator" />
            <VerifiedBadge size="md" tone="signal" label="Live Trade" />
          </div>
        </Section>

        <Section title="IrisSeam">
          <div className="cc-gallery__row cc-gallery__row--center">
            <IrisSeam length="26px" pulse />
            <IrisSeam length="80px" />
            <IrisSeam orientation="v" length="40px" flash />
          </div>
        </Section>

        <Section title="Icon (Lucide, general UI glyphs)">
          <div className="cc-gallery__row cc-gallery__row--center">
            {ICON_NAMES.map((name) => (
              <div className="cc-gallery__icon" key={name}>
                <Icon name={name} title={name} />
                <span className="cc-micro">{name}</span>
              </div>
            ))}
          </div>
          <div className="cc-gallery__row cc-gallery__row--center">
            {ICON_TONES.map((tone) => (
              <div className="cc-gallery__icon" key={tone}>
                <Icon name="check" tone={tone} title={tone} />
                <span className="cc-micro">{tone}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="NavGlyph (brand's own 5 nav icons)">
          <div className="cc-gallery__row cc-gallery__row--center">
            {NAV_GLYPHS.map((name) => (
              <div className="cc-gallery__icon" key={name}>
                <NavGlyph name={name} mode={glyphMode} />
                <span className="cc-micro">{name}</span>
              </div>
            ))}
          </div>
          <p className="cc-gallery__caption">
            Raster, two tone variants (light/ink). Only these five exist — this is not the general
            UI icon set.
          </p>
        </Section>

        <Section title="SkeletonLoader">
          <div className="cc-gallery__skeleton-row">
            <SkeletonLoader width={64} height={64} radius="var(--radius-card)" />
            <div className="cc-gallery__skeleton-lines-slot">
              <SkeletonLoader lines={3} height={14} />
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
