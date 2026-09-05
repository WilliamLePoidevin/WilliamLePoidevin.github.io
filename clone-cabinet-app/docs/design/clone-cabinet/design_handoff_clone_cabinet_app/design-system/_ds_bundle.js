/* @ds-bundle: {"format":4,"namespace":"CloneCabinetDesignSystem_9042f5","components":[{"name":"ASSET_BASE","sourcePath":"components/brand/Icon.jsx"},{"name":"BrandMark","sourcePath":"components/brand/BrandMark.jsx"},{"name":"ICON_NAMES","sourcePath":"components/brand/Icon.jsx"},{"name":"Icon","sourcePath":"components/brand/Icon.jsx"},{"name":"IrisSeam","sourcePath":"components/brand/IrisSeam.jsx"},{"name":"CollectorAvatar","sourcePath":"components/community/CollectorAvatar.jsx"},{"name":"ReviewCard","sourcePath":"components/community/ReviewCard.jsx"},{"name":"TradeCard","sourcePath":"components/community/TradeCard.jsx"},{"name":"TrustMetric","sourcePath":"components/community/TrustMetric.jsx"},{"name":"VerifiedBadge","sourcePath":"components/community/VerifiedBadge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"EmptyState","sourcePath":"components/core/EmptyState.jsx"},{"name":"SkeletonLoader","sourcePath":"components/core/SkeletonLoader.jsx"},{"name":"StatusChip","sourcePath":"components/core/StatusChip.jsx"},{"name":"Toast","sourcePath":"components/core/Toast.jsx"},{"name":"AccordBar","sourcePath":"components/fragrance/AccordBar.jsx"},{"name":"BOTTLE_BASE","sourcePath":"components/fragrance/BottlePortrait.jsx"},{"name":"BottlePortrait","sourcePath":"components/fragrance/BottlePortrait.jsx"},{"name":"CabinetShelf","sourcePath":"components/fragrance/CabinetShelf.jsx"},{"name":"FragranceCard","sourcePath":"components/fragrance/FragranceCard.jsx"},{"name":"LineageNode","sourcePath":"components/fragrance/LineageNode.jsx"},{"name":"MetricDial","sourcePath":"components/fragrance/MetricDial.jsx"},{"name":"OpenChamber","sourcePath":"components/fragrance/OpenChamber.jsx"},{"name":"AppShell","sourcePath":"components/shell/AppShell.jsx"},{"name":"DESTINATIONS","sourcePath":"components/shell/BottomNav.jsx"},{"name":"BottomNav","sourcePath":"components/shell/BottomNav.jsx"},{"name":"SideRail","sourcePath":"components/shell/SideRail.jsx"},{"name":"TopBar","sourcePath":"components/shell/TopBar.jsx"}],"sourceHashes":{"components/brand/BrandMark.jsx":"eeec3d015451","components/brand/Icon.jsx":"9776dc05e18c","components/brand/IrisSeam.jsx":"2b5b7563663c","components/community/CollectorAvatar.jsx":"5da688dd02fa","components/community/ReviewCard.jsx":"a338c389adb2","components/community/TradeCard.jsx":"adeb8df899eb","components/community/TrustMetric.jsx":"e8a79b8c9285","components/community/VerifiedBadge.jsx":"6a9532f252b7","components/core/Button.jsx":"ce10ae28d5bf","components/core/EmptyState.jsx":"74d702041dfa","components/core/SkeletonLoader.jsx":"541a329f02a8","components/core/StatusChip.jsx":"b2568f377c54","components/core/Toast.jsx":"dea4d6af286f","components/fragrance/AccordBar.jsx":"7ebfe6c5dc9a","components/fragrance/BottlePortrait.jsx":"9fa475f76dc4","components/fragrance/CabinetShelf.jsx":"11098db2d23a","components/fragrance/FragranceCard.jsx":"aad5af86e344","components/fragrance/LineageNode.jsx":"21183bc2d088","components/fragrance/MetricDial.jsx":"d08321702be4","components/fragrance/OpenChamber.jsx":"9cef24c26f9e","components/shell/AppShell.jsx":"110657cc4437","components/shell/BottomNav.jsx":"37423fdf6bde","components/shell/SideRail.jsx":"171c881cc755","components/shell/TopBar.jsx":"5cfadef04f26"},"inlinedExternals":[],"duplicateExports":[{"name":"ASSET_BASE","paths":["components/brand/BrandMark.jsx","components/brand/Icon.jsx"]}],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.CloneCabinetDesignSystem_9042f5 = window.CloneCabinetDesignSystem_9042f5 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/BrandMark.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Photographic brand artwork lives in the design system's assets folder.
 *  Consuming projects copy assets/ across and may re-point this base. */
const ASSET_BASE = "/assets/";
const SRC = {
  mark: "mark-icon.png",
  app: "app-icon.png",
  "app-porcelain": "soft-tech/app-icon.png",
  "app-iris": "iris/app-icon.png",
  lockup: "logo-primary.png"
};
function BrandMark({
  variant = "mark",
  size = 28,
  src,
  showWordmark = false,
  tagline = false,
  style,
  ...rest
}) {
  const img = /*#__PURE__*/React.createElement("img", {
    src: src || ASSET_BASE + SRC[variant],
    alt: "Clone Cabinet",
    style: {
      width: size,
      height: variant === "lockup" ? "auto" : size,
      objectFit: "cover",
      display: "block",
      borderRadius: variant.startsWith("app") ? "var(--radius-appicon)" : 0
    }
  });
  if (!showWordmark || variant === "lockup") return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "inline-flex",
      ...style
    }
  }, rest), img);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-3)",
      ...style
    }
  }, rest), img, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "cc-wordmark",
    style: {
      fontSize: Math.max(11, size * 0.42),
      lineHeight: 1.1
    }
  }, "Clone Cabinet"), tagline && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: "var(--type-micro-size)",
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase",
      color: "var(--text-tertiary)"
    }
  }, "The collector's ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-signal)"
    }
  }, "world"), " of fragrance.")));
}
Object.assign(__ds_scope, { ASSET_BASE, BrandMark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/BrandMark.jsx", error: String((e && e.message) || e) }); }

// components/brand/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ASSET_BASE = "/assets/icons/";

/** The brand's own glyph family, cropped from board 02's key-element studies. */
const ICON_NAMES = ["collection", "discover", "connect", "private-archive", "scent-lineage"];
function Icon({
  name,
  size = 22,
  tone = "primary",
  mode = "light",
  style,
  ...rest
}) {
  const opacity = {
    primary: 1,
    secondary: .68,
    tertiary: .45
  }[tone] || 1;
  return /*#__PURE__*/React.createElement("img", _extends({
    src: ASSET_BASE + mode + "/" + name + ".png",
    alt: "",
    "aria-hidden": true,
    style: {
      width: size,
      height: size,
      display: "block",
      opacity,
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { ASSET_BASE, ICON_NAMES, Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Icon.jsx", error: String((e && e.message) || e) }); }

// components/brand/IrisSeam.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function IrisSeam({
  orientation = "vertical",
  length = "100%",
  thickness = 2,
  glow = true,
  pulse = false,
  style,
  ...rest
}) {
  const vertical = orientation === "vertical";
  return /*#__PURE__*/React.createElement("span", _extends({
    "aria-hidden": true,
    style: {
      display: "block",
      width: vertical ? thickness : length,
      height: vertical ? length : thickness,
      background: vertical ? "var(--grad-iris-seam)" : "var(--grad-iris-seam-h)",
      boxShadow: glow ? "var(--glow-iris-sm)" : "none",
      animation: pulse ? "cc-iris-pulse 3s var(--ease-in-out) infinite" : "none",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { IrisSeam });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/IrisSeam.jsx", error: String((e && e.message) || e) }); }

// components/community/CollectorAvatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function CollectorAvatar({
  name = "",
  src,
  size = 40,
  level,
  verified = false,
  style,
  ...rest
}) {
  const initials = name.split(" ").filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: "relative",
      display: "inline-flex",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: "50%",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--surface-shelf)",
      border: "1px solid " + (verified ? "var(--line-metal)" : "var(--line-strong)")
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: size * .34,
      fontWeight: 500,
      color: "var(--text-metal)"
    }
  }, initials)), level && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      bottom: -6,
      left: "50%",
      transform: "translateX(-50%)",
      padding: "1px 6px",
      borderRadius: "var(--radius-pill)",
      background: "var(--surface-raised)",
      border: "1px solid var(--line-divider)",
      fontFamily: "var(--font-ui)",
      fontSize: 8,
      fontWeight: 600,
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase",
      color: "var(--text-tertiary)",
      whiteSpace: "nowrap"
    }
  }, level));
}
Object.assign(__ds_scope, { CollectorAvatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/community/CollectorAvatar.jsx", error: String((e && e.message) || e) }); }

// components/community/TrustMetric.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function TrustMetric({
  label,
  value,
  detail,
  tone = "neutral",
  style,
  ...rest
}) {
  const color = {
    neutral: "var(--text-primary)",
    good: "var(--success)",
    caution: "var(--warning)",
    alert: "var(--error)"
  }[tone];
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 3,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-h3-size)",
      color
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    className: "cc-label",
    style: {
      color: "var(--text-secondary)"
    }
  }, label), detail && /*#__PURE__*/React.createElement("span", {
    className: "cc-micro"
  }, detail));
}
Object.assign(__ds_scope, { TrustMetric });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/community/TrustMetric.jsx", error: String((e && e.message) || e) }); }

// components/community/VerifiedBadge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function VerifiedBadge({
  label = "Cabinet Verified",
  tone = "alloy",
  size = "md",
  style,
  ...rest
}) {
  const alloy = tone === "alloy";
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-1)",
      height: size === "sm" ? 20 : 24,
      padding: "0 var(--space-2)",
      borderRadius: "var(--radius-inset)",
      border: "1px solid " + (alloy ? "var(--line-metal)" : "var(--line-signal)"),
      background: alloy ? "transparent" : "color-mix(in oklab,var(--electric-iris) 8%,transparent)",
      fontFamily: "var(--font-ui)",
      fontSize: size === "sm" ? 9 : "var(--type-label-size)",
      fontWeight: 600,
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase",
      color: alloy ? "var(--text-metal)" : "var(--text-signal)",
      whiteSpace: "nowrap",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      width: 4,
      height: 4,
      borderRadius: "50%",
      background: alloy ? "var(--rose-alloy)" : "var(--electric-iris)",
      boxShadow: alloy ? "none" : "var(--glow-iris-sm)"
    }
  }), label);
}
Object.assign(__ds_scope, { VerifiedBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/community/VerifiedBadge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const HEIGHTS = {
  sm: "var(--control-height-sm)",
  md: "var(--control-height)"
};
function Button({
  children,
  variant = "primary",
  size = "md",
  full = false,
  disabled = false,
  iconLeft,
  style,
  ...rest
}) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--space-2)",
    minHeight: HEIGHTS[size],
    minWidth: "var(--tap-min)",
    width: full ? "100%" : "auto",
    padding: size === "sm" ? "0 var(--space-3)" : "0 var(--space-6)",
    fontFamily: "var(--font-ui)",
    fontSize: "var(--type-compact-size)",
    fontWeight: 600,
    letterSpacing: "var(--track-label)",
    textTransform: "uppercase",
    borderRadius: "var(--radius-chip)",
    cursor: disabled ? "default" : "pointer",
    opacity: disabled ? "var(--disabled-opacity)" : 1,
    transition: "background var(--dur-micro) var(--ease-material),border-color var(--dur-micro) var(--ease-material),transform var(--dur-micro) var(--ease-material)",
    border: "1px solid transparent",
    WebkitTapHighlightColor: "transparent"
  };
  const variants = {
    primary: {
      background: "var(--action-primary-bg)",
      color: "var(--action-primary-fg)"
    },
    secondary: {
      background: "transparent",
      color: "var(--action-secondary-fg)",
      borderColor: "var(--action-secondary-border)"
    },
    quiet: {
      background: "transparent",
      color: "var(--text-secondary)",
      padding: 0,
      minHeight: "var(--tap-min)"
    },
    signal: {
      background: "transparent",
      color: "var(--text-signal)",
      borderColor: "var(--line-signal)"
    },
    caution: {
      background: "var(--oxblood)",
      color: "var(--porcelain)"
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    style: {
      ...base,
      ...variants[variant],
      ...style
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = "scale(var(--press-scale))";
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = "none";
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = "none";
    }
  }, rest), iconLeft, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/EmptyState.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function EmptyState({
  title,
  body,
  action,
  glyph,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: "var(--space-3)",
      padding: "var(--space-12) var(--space-6)",
      ...style
    }
  }, rest), glyph && /*#__PURE__*/React.createElement("div", {
    style: {
      opacity: .7,
      marginBottom: "var(--space-2)"
    }
  }, glyph), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--type-h3-size)",
      lineHeight: "var(--type-h3-lh)",
      fontWeight: 600,
      color: "var(--text-primary)"
    }
  }, title), body && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--type-body-size)",
      lineHeight: "var(--type-body-lh)",
      color: "var(--text-secondary)",
      maxWidth: 320
    }
  }, body), action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-2)"
    }
  }, action));
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/core/SkeletonLoader.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SkeletonLoader({
  lines = 3,
  height = 12,
  radius = "var(--radius-inset)",
  block = false,
  style,
  ...rest
}) {
  const shimmer = {
    background: "linear-gradient(90deg,var(--surface-glass) 0%,var(--surface-glass-strong) 50%,var(--surface-glass) 100%)",
    backgroundSize: "220% 100%",
    animation: "cc-shimmer 1.6s var(--ease-in-out) infinite",
    borderRadius: radius
  };
  if (block) return /*#__PURE__*/React.createElement("div", _extends({
    "aria-hidden": true,
    style: {
      ...shimmer,
      height,
      ...style
    }
  }, rest));
  return /*#__PURE__*/React.createElement("div", _extends({
    "aria-hidden": true,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      ...style
    }
  }, rest), Array.from({
    length: lines
  }).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      ...shimmer,
      height,
      width: i === lines - 1 ? "62%" : "100%"
    }
  })));
}
Object.assign(__ds_scope, { SkeletonLoader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SkeletonLoader.jsx", error: String((e && e.message) || e) }); }

// components/core/StatusChip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  neutral: {
    fg: "var(--text-secondary)",
    bd: "var(--line-strong)",
    bg: "transparent"
  },
  cabinet: {
    fg: "var(--text-metal)",
    bd: "var(--line-metal)",
    bg: "transparent"
  },
  signal: {
    fg: "var(--text-signal)",
    bd: "var(--line-signal)",
    bg: "transparent"
  },
  trade: {
    fg: "var(--rose-alloy-light)",
    bd: "color-mix(in oklab,var(--oxblood) 90%,transparent)",
    bg: "color-mix(in oklab,var(--oxblood) 35%,transparent)"
  },
  success: {
    fg: "var(--success)",
    bd: "rgba(127,169,139,.45)",
    bg: "transparent"
  },
  warning: {
    fg: "var(--warning)",
    bd: "rgba(201,152,98,.45)",
    bg: "transparent"
  }
};
function StatusChip({
  children,
  tone = "neutral",
  selected = false,
  glyph,
  onClick,
  style,
  ...rest
}) {
  const t = TONES[tone] || TONES.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    role: onClick ? "button" : undefined,
    tabIndex: onClick ? 0 : undefined,
    onClick: onClick,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-1)",
      height: 26,
      padding: "0 var(--space-3)",
      borderRadius: "var(--radius-pill)",
      border: "1px solid " + (selected ? "var(--line-metal)" : t.bd),
      background: selected ? "var(--surface-glass-strong)" : t.bg,
      color: selected ? "var(--text-metal)" : t.fg,
      fontFamily: "var(--font-ui)",
      fontSize: "var(--type-label-size)",
      fontWeight: 600,
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
      cursor: onClick ? "pointer" : "default",
      transition: "all var(--dur-micro) var(--ease-material)",
      ...style
    }
  }, rest), glyph, children);
}
Object.assign(__ds_scope, { StatusChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatusChip.jsx", error: String((e && e.message) || e) }); }

// components/community/ReviewCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ReviewCard({
  author,
  level,
  score,
  body,
  context,
  reactions = [],
  date,
  verified = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("article", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      padding: "var(--space-4)",
      background: "var(--surface-raised)",
      border: "1px solid var(--line-divider)",
      borderRadius: "var(--radius-card)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.CollectorAvatar, {
    name: author,
    level: level,
    verified: verified,
    size: 36
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--type-compact-size)",
      fontWeight: 600,
      color: "var(--text-primary)"
    }
  }, author), context && /*#__PURE__*/React.createElement("div", {
    className: "cc-micro",
    style: {
      marginTop: 2
    }
  }, context)), score != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-h3-size)",
      color: "var(--text-metal)"
    }
  }, score.toFixed(1))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--type-body-size)",
      lineHeight: "var(--type-body-lh)",
      color: "var(--text-secondary)"
    }
  }, body), /*#__PURE__*/React.createElement("footer", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-2)",
      flexWrap: "wrap"
    }
  }, reactions.map(r => /*#__PURE__*/React.createElement(__ds_scope.StatusChip, {
    key: r.label
  }, r.label, " ", r.count)), date && /*#__PURE__*/React.createElement("span", {
    className: "cc-micro",
    style: {
      marginLeft: "auto"
    }
  }, date)));
}
Object.assign(__ds_scope, { ReviewCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/community/ReviewCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Toast({
  children,
  tone = "neutral",
  visible = true,
  action,
  onAction,
  style,
  ...rest
}) {
  const bar = {
    neutral: "var(--line-metal)",
    signal: "var(--grad-iris-seam)",
    success: "var(--success)",
    error: "var(--error)"
  }[tone];
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status",
    "aria-live": "polite",
    style: {
      display: visible ? "flex" : "none",
      alignItems: "center",
      gap: "var(--space-3)",
      position: "relative",
      overflow: "hidden",
      minHeight: 52,
      padding: "var(--space-3) var(--space-4)",
      background: "var(--surface-raised)",
      border: "1px solid var(--line-strong)",
      borderRadius: "var(--radius-chip)",
      boxShadow: "var(--shadow-card)",
      animation: "cc-reveal var(--dur-standard) var(--ease-material)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: 2,
      background: bar
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: "var(--type-compact-size)",
      fontWeight: 500,
      color: "var(--text-primary)"
    }
  }, children), action && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onAction,
    style: {
      background: "none",
      border: 0,
      padding: "var(--space-2)",
      cursor: "pointer",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--type-label-size)",
      fontWeight: 600,
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase",
      color: "var(--text-metal)"
    }
  }, action));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Toast.jsx", error: String((e && e.message) || e) }); }

// components/fragrance/AccordBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function AccordBar({
  label,
  value,
  tone = "alloy",
  showValue = true,
  style,
  ...rest
}) {
  const fill = tone === "iris" ? "var(--grad-iris-seam-h)" : "var(--grad-rose-reflection)";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "0 0 92px",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--type-label-size)",
      fontWeight: 600,
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase",
      color: "var(--text-secondary)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 4,
      borderRadius: 2,
      background: "var(--surface-glass)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("span", {
    role: "img",
    "aria-label": label + " " + value + " percent",
    style: {
      display: "block",
      width: Math.max(0, Math.min(100, value)) + "%",
      height: "100%",
      background: fill
    }
  })), showValue && /*#__PURE__*/React.createElement("span", {
    className: "cc-micro",
    style: {
      flex: "0 0 30px",
      textAlign: "right"
    }
  }, value, "%"));
}
Object.assign(__ds_scope, { AccordBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/fragrance/AccordBar.jsx", error: String((e && e.message) || e) }); }

// components/fragrance/BottlePortrait.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const BOTTLE_BASE = "/assets/bottles/";
const RATIOS = {
  portrait: "3 / 4",
  square: "1 / 1",
  tall: "2 / 3",
  hero: "4 / 5"
};
function BottlePortrait({
  src,
  name,
  ratio = "portrait",
  radius = "var(--radius-card)",
  inset = true,
  glow = false,
  overlay,
  style,
  ...rest
}) {
  const url = src && src.startsWith("/") ? src : BOTTLE_BASE + (src || "object-portrait.png");
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: "relative",
      aspectRatio: RATIOS[ratio],
      width: "100%",
      overflow: "hidden",
      borderRadius: radius,
      background: "var(--grad-depth)",
      border: inset ? "1px solid var(--line-divider)" : "0",
      boxShadow: glow ? "var(--glow-iris-sm)" : inset ? "var(--shadow-inset-tray)" : "none",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("img", {
    src: url,
    alt: name ? name + " bottle" : "",
    loading: "lazy",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block"
    }
  }), overlay && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: "var(--space-3)",
      background: "var(--grad-protect-bottom)"
    }
  }, overlay));
}
Object.assign(__ds_scope, { BOTTLE_BASE, BottlePortrait });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/fragrance/BottlePortrait.jsx", error: String((e && e.message) || e) }); }

// components/community/TradeCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function TradeCard({
  listing,
  onClick,
  action,
  style,
  ...rest
}) {
  const {
    fragrance = {},
    condition,
    fill,
    presentation,
    collector = {},
    trades,
    region,
    wants,
    verified
  } = listing || {};
  return /*#__PURE__*/React.createElement("article", _extends({
    onClick: onClick,
    style: {
      display: "flex",
      gap: "var(--space-3)",
      padding: "var(--space-3)",
      background: "var(--surface-raised)",
      border: "1px solid var(--line-divider)",
      borderRadius: "var(--radius-card)",
      boxShadow: "var(--shadow-card)",
      cursor: onClick ? "pointer" : "default",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 78,
      flex: "0 0 78px"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.BottlePortrait, {
    src: fragrance.image,
    name: fragrance.name,
    ratio: "portrait",
    radius: "var(--radius-chip)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "cc-label",
    style: {
      color: "var(--text-metal)"
    }
  }, fragrance.house), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--type-h3-size)",
      fontWeight: 600,
      color: "var(--text-primary)"
    }
  }, fragrance.name)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "var(--space-1)"
    }
  }, condition && /*#__PURE__*/React.createElement(__ds_scope.StatusChip, {
    tone: "trade"
  }, condition), fill != null && /*#__PURE__*/React.createElement(__ds_scope.StatusChip, null, fill, "% full"), presentation && /*#__PURE__*/React.createElement(__ds_scope.StatusChip, null, presentation)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-2)",
      borderTop: "1px solid var(--line-divider)",
      paddingTop: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.CollectorAvatar, {
    name: collector.name,
    size: 24,
    verified: verified
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--type-compact-size)",
      color: "var(--text-primary)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, collector.name), /*#__PURE__*/React.createElement("div", {
    className: "cc-micro"
  }, [trades != null ? trades + " trades" : null, region].filter(Boolean).join(" · "))), verified && /*#__PURE__*/React.createElement(__ds_scope.VerifiedBadge, {
    label: "Trade Verified",
    size: "sm",
    style: {
      marginLeft: "auto"
    }
  })), wants && /*#__PURE__*/React.createElement("div", {
    className: "cc-micro",
    style: {
      color: "var(--text-secondary)"
    }
  }, "Wants: ", wants), action));
}
Object.assign(__ds_scope, { TradeCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/community/TradeCard.jsx", error: String((e && e.message) || e) }); }

// components/fragrance/CabinetShelf.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function CabinetShelf({
  children,
  columns = 4,
  label,
  tray = true,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("section", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      ...style
    }
  }, rest), label && /*#__PURE__*/React.createElement("div", {
    className: "cc-label"
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(" + columns + ",1fr)",
      gap: "var(--card-gap)",
      padding: tray ? "var(--space-3)" : 0,
      background: tray ? "var(--surface-shelf)" : "transparent",
      border: tray ? "1px solid var(--line-divider)" : "0",
      borderRadius: tray ? "var(--radius-chip)" : 0,
      boxShadow: tray ? "var(--shadow-inset-tray)" : "none"
    }
  }, children));
}
Object.assign(__ds_scope, { CabinetShelf });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/fragrance/CabinetShelf.jsx", error: String((e && e.message) || e) }); }

// components/fragrance/FragranceCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function FragranceCard({
  fragrance,
  variant = "editorial",
  status,
  onClick,
  action,
  style,
  ...rest
}) {
  const {
    name,
    house,
    year,
    concentration,
    accords = [],
    score,
    image,
    thesis,
    lineage
  } = fragrance || {};
  const meta = [house, concentration, year].filter(Boolean).join(" · ");
  const shell = {
    background: "var(--surface-raised)",
    border: "1px solid var(--line-divider)",
    borderRadius: "var(--radius-card)",
    boxShadow: "var(--shadow-card)",
    overflow: "hidden",
    cursor: onClick ? "pointer" : "default",
    transition: "border-color var(--dur-micro) var(--ease-material)"
  };
  const Name = ({
    size = "var(--type-h3-size)"
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: size,
      lineHeight: "var(--type-h3-lh)",
      fontWeight: 600,
      color: "var(--text-primary)"
    }
  }, name);
  const Meta = () => /*#__PURE__*/React.createElement("div", {
    className: "cc-micro",
    style: {
      marginTop: 4
    }
  }, meta);
  const Score = () => score != null ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-compact-size)",
      color: "var(--text-metal)"
    }
  }, score.toFixed(1)) : null;
  if (variant === "compact") {
    return /*#__PURE__*/React.createElement("div", _extends({
      onClick: onClick,
      style: {
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
        padding: "var(--space-2) 0",
        borderBottom: "1px solid var(--line-divider)",
        cursor: onClick ? "pointer" : "default",
        ...style
      }
    }, rest), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 44,
        flex: "0 0 44px"
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.BottlePortrait, {
      src: image,
      name: name,
      ratio: "square",
      radius: "var(--radius-inset)"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement(Name, {
      size: "var(--type-compact-size)"
    }), /*#__PURE__*/React.createElement(Meta, null)), status && /*#__PURE__*/React.createElement(__ds_scope.StatusChip, {
      tone: "cabinet"
    }, status), /*#__PURE__*/React.createElement(Score, null));
  }
  if (variant === "shelf") {
    return /*#__PURE__*/React.createElement("div", _extends({
      onClick: onClick,
      style: {
        position: "relative",
        ...style
      }
    }, rest), /*#__PURE__*/React.createElement(__ds_scope.BottlePortrait, {
      src: image,
      name: name,
      ratio: "tall",
      radius: "var(--radius-chip)",
      glow: status === "In Cabinet" && false
    }), status && /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        top: 6,
        right: 6,
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: "var(--rose-alloy)"
      }
    }));
  }
  if (variant === "object") {
    return /*#__PURE__*/React.createElement("div", _extends({
      onClick: onClick,
      style: {
        ...shell,
        width: 168,
        flex: "0 0 168px",
        ...style
      }
    }, rest), /*#__PURE__*/React.createElement(__ds_scope.BottlePortrait, {
      src: image,
      name: name,
      ratio: "square",
      radius: "0",
      inset: false
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "var(--space-3)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "cc-label",
      style: {
        color: "var(--text-metal)"
      }
    }, house), /*#__PURE__*/React.createElement(Name, {
      size: "var(--type-compact-size)"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "var(--space-2)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "cc-micro"
    }, [concentration, year].filter(Boolean).join(" · ")), /*#__PURE__*/React.createElement(Score, null))));
  }
  if (variant === "lineage") {
    return /*#__PURE__*/React.createElement("div", _extends({
      onClick: onClick,
      style: {
        ...shell,
        display: "flex",
        gap: "var(--space-3)",
        padding: "var(--space-3)",
        ...style
      }
    }, rest), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 56,
        flex: "0 0 56px"
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.BottlePortrait, {
      src: image,
      name: name,
      ratio: "square",
      radius: "var(--radius-inset)"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement(Name, {
      size: "var(--type-compact-size)"
    }), /*#__PURE__*/React.createElement(Meta, null), lineage && /*#__PURE__*/React.createElement("div", {
      className: "cc-micro",
      style: {
        color: "var(--text-signal)",
        marginTop: 6
      }
    }, lineage)), action);
  }
  return /*#__PURE__*/React.createElement("article", _extends({
    onClick: onClick,
    style: {
      ...shell,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.BottlePortrait, {
    src: image,
    name: name,
    ratio: "hero",
    radius: "0",
    inset: false
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "cc-label",
    style: {
      color: "var(--text-metal)"
    }
  }, house), /*#__PURE__*/React.createElement(Name, {
    size: "var(--type-h2-size)"
  }), thesis && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "var(--space-2) 0 0",
      fontSize: "var(--type-body-size)",
      lineHeight: "var(--type-body-lh)",
      color: "var(--text-secondary)"
    }
  }, thesis), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-2)",
      marginTop: "var(--space-3)",
      flexWrap: "wrap"
    }
  }, accords.slice(0, 3).map(a => /*#__PURE__*/React.createElement(__ds_scope.StatusChip, {
    key: a
  }, a)), status && /*#__PURE__*/React.createElement(__ds_scope.StatusChip, {
    tone: "cabinet"
  }, status), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto"
    }
  }, /*#__PURE__*/React.createElement(Score, null))), action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-4)"
    }
  }, action)));
}
Object.assign(__ds_scope, { FragranceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/fragrance/FragranceCard.jsx", error: String((e && e.message) || e) }); }

// components/fragrance/LineageNode.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const RELATION_LABEL = {
  original: "Original",
  inspiration: "Inspiration",
  interpretation: "Interpretation",
  alternative: "Alternative",
  flanker: "Flanker",
  similar: "Similar profile"
};
function LineageNode({
  fragrance,
  relation = "similar",
  verified = false,
  active = false,
  confidence,
  onClick,
  style,
  ...rest
}) {
  const {
    name,
    house,
    image
  } = fragrance || {};
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: onClick,
    style: {
      position: "relative",
      width: 128,
      padding: "var(--space-2)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      textAlign: "left",
      background: active ? "var(--surface-glass-strong)" : "var(--surface-raised)",
      border: "1px solid " + (verified ? "var(--line-metal)" : active ? "var(--line-signal)" : "var(--line-strong)"),
      borderRadius: "var(--radius-chip)",
      cursor: "pointer",
      boxShadow: active ? "var(--glow-iris-sm)" : "none",
      transition: "all var(--dur-standard) var(--ease-material)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.BottlePortrait, {
    src: image,
    name: name,
    ratio: "square",
    radius: "var(--radius-inset)"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: "var(--type-compact-size)",
      fontWeight: 600,
      color: "var(--text-primary)",
      lineHeight: "var(--type-compact-lh)"
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    className: "cc-micro",
    style: {
      marginTop: 2
    }
  }, house)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 4,
      borderTop: "1px solid var(--line-divider)",
      paddingTop: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: "var(--type-micro-size)",
      fontWeight: 600,
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase",
      color: verified ? "var(--text-metal)" : "var(--text-tertiary)"
    }
  }, RELATION_LABEL[relation]), confidence != null && /*#__PURE__*/React.createElement("span", {
    className: "cc-micro",
    style: {
      color: "var(--text-signal)"
    }
  }, confidence, "%")), verified && /*#__PURE__*/React.createElement("span", {
    "aria-label": "Editorially verified",
    style: {
      position: "absolute",
      top: -1,
      right: -1,
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--rose-alloy)"
    }
  }));
}
Object.assign(__ds_scope, { LineageNode });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/fragrance/LineageNode.jsx", error: String((e && e.message) || e) }); }

// components/fragrance/MetricDial.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function MetricDial({
  value,
  label,
  size = 132,
  caption,
  tone = "iris",
  style,
  ...rest
}) {
  const stroke = 3;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const color = tone === "iris" ? "var(--electric-iris)" : "var(--rose-alloy)";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: "relative",
      width: size,
      height: size,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    style: {
      display: "block",
      transform: "rotate(-90deg)"
    },
    "aria-hidden": true
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: "var(--line-divider)",
    strokeWidth: stroke
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeDasharray: circ,
    strokeDashoffset: circ * (1 - Math.max(0, Math.min(100, value)) / 100),
    style: {
      filter: tone === "iris" ? "drop-shadow(0 0 6px color-mix(in oklab,var(--electric-iris) 60%,transparent))" : "none",
      transition: "stroke-dashoffset var(--dur-signature) var(--ease-material)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: size * .26,
      fontWeight: 500,
      color: "var(--text-primary)"
    }
  }, value, "%"), label && /*#__PURE__*/React.createElement("span", {
    className: "cc-label",
    style: {
      fontSize: "var(--type-micro-size)"
    }
  }, label), caption && /*#__PURE__*/React.createElement("span", {
    className: "cc-micro"
  }, caption)));
}
Object.assign(__ds_scope, { MetricDial });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/fragrance/MetricDial.jsx", error: String((e && e.message) || e) }); }

// components/fragrance/OpenChamber.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function OpenChamber({
  label = "The Open Chamber",
  hint = "Room for the next one.",
  onClick,
  ratio = "2 / 3",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: onClick,
    "aria-label": label,
    style: {
      aspectRatio: ratio,
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      padding: "var(--space-3)",
      background: "var(--surface-inset)",
      border: "1px dashed var(--line-strong)",
      borderRadius: "var(--radius-chip)",
      cursor: "pointer",
      textAlign: "center",
      transition: "border-color var(--dur-standard) var(--ease-material)",
      ...style
    },
    onMouseEnter: e => {
      e.currentTarget.style.borderColor = "var(--line-metal)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.borderColor = "var(--line-strong)";
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: "var(--type-micro-size)",
      fontWeight: 600,
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase",
      color: "var(--text-tertiary)"
    }
  }, label), hint && /*#__PURE__*/React.createElement("span", {
    className: "cc-micro",
    style: {
      color: "var(--text-tertiary)",
      opacity: .8
    }
  }, hint));
}
Object.assign(__ds_scope, { OpenChamber });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/fragrance/OpenChamber.jsx", error: String((e && e.message) || e) }); }

// components/shell/AppShell.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function AppShell({
  children,
  mode = "night",
  nav,
  rail,
  sheet,
  toast,
  frame = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-mode": mode,
    style: {
      position: "relative",
      display: "flex",
      flexDirection: rail ? "row" : "column",
      width: "100%",
      height: "100%",
      minHeight: 0,
      overflow: "hidden",
      background: "var(--surface-canvas)",
      color: "var(--text-primary)",
      fontFamily: "var(--font-ui)",
      borderRadius: frame ? "var(--radius-sheet)" : 0,
      ...style
    }
  }, rest), rail, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      minWidth: 0,
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      minHeight: 0,
      overflowY: "auto",
      overscrollBehavior: "contain"
    }
  }, children), nav), toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "var(--page-padding)",
      right: "var(--page-padding)",
      bottom: nav ? 92 : "var(--space-6)",
      zIndex: 40
    }
  }, toast), sheet);
}
Object.assign(__ds_scope, { AppShell });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/shell/AppShell.jsx", error: String((e && e.message) || e) }); }

// components/shell/BottomNav.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const DESTINATIONS = [{
  id: "discover",
  label: "Discover",
  glyph: "discover"
}, {
  id: "lineage",
  label: "Lineage",
  glyph: "scent-lineage"
}, {
  id: "cabinet",
  label: "Cabinet",
  glyph: "collection"
}, {
  id: "trade",
  label: "Trade",
  glyph: "connect"
}, {
  id: "you",
  label: "You",
  glyph: "private-archive"
}];
function BottomNav({
  active = "cabinet",
  onChange,
  mode = "light",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    style: {
      position: "sticky",
      bottom: 0,
      zIndex: 20,
      height: "var(--bottomnav-height)",
      display: "flex",
      alignItems: "stretch",
      background: "var(--surface-nav)",
      backdropFilter: "var(--blur-glass)",
      WebkitBackdropFilter: "var(--blur-glass)",
      borderTop: "1px solid var(--line-divider)",
      ...style
    }
  }, rest), DESTINATIONS.map(d => {
    const on = d.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: d.id,
      type: "button",
      onClick: () => onChange && onChange(d.id),
      "aria-current": on ? "page" : undefined,
      "aria-label": d.label,
      style: {
        position: "relative",
        flex: 1,
        minWidth: "var(--tap-min)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        background: "none",
        border: 0,
        padding: "var(--space-2) 0",
        cursor: "pointer",
        WebkitTapHighlightColor: "transparent"
      }
    }, on && /*#__PURE__*/React.createElement(__ds_scope.IrisSeam, {
      orientation: "horizontal",
      length: 26,
      thickness: 1,
      style: {
        position: "absolute",
        top: 0
      }
    }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: d.glyph,
      size: 22,
      mode: mode,
      tone: on ? "primary" : "tertiary"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-ui)",
        fontSize: "var(--type-micro-size)",
        fontWeight: 600,
        letterSpacing: "var(--track-label)",
        textTransform: "uppercase",
        color: on ? "var(--text-metal)" : "var(--text-tertiary)"
      }
    }, d.label));
  }));
}
Object.assign(__ds_scope, { DESTINATIONS, BottomNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/shell/BottomNav.jsx", error: String((e && e.message) || e) }); }

// components/shell/SideRail.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SideRail({
  active = "cabinet",
  onChange,
  mode = "light",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    style: {
      width: "var(--side-rail-width)",
      flex: "0 0 var(--side-rail-width)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "var(--space-2)",
      padding: "var(--space-6) 0",
      background: "var(--surface-raised)",
      borderRight: "1px solid var(--line-divider)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.BrandMark, {
    variant: "mark",
    size: 26,
    style: {
      marginBottom: "var(--space-6)"
    }
  }), __ds_scope.DESTINATIONS.map(d => {
    const on = d.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: d.id,
      type: "button",
      onClick: () => onChange && onChange(d.id),
      "aria-label": d.label,
      "aria-current": on ? "page" : undefined,
      style: {
        position: "relative",
        width: "100%",
        minHeight: 62,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        background: "none",
        border: 0,
        cursor: "pointer"
      }
    }, on && /*#__PURE__*/React.createElement(__ds_scope.IrisSeam, {
      length: 26,
      thickness: 1,
      style: {
        position: "absolute",
        left: 0
      }
    }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: d.glyph,
      size: 22,
      mode: mode,
      tone: on ? "primary" : "tertiary"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-ui)",
        fontSize: "var(--type-micro-size)",
        fontWeight: 600,
        letterSpacing: "var(--track-label)",
        textTransform: "uppercase",
        color: on ? "var(--text-metal)" : "var(--text-tertiary)"
      }
    }, d.label));
  }));
}
Object.assign(__ds_scope, { SideRail });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/shell/SideRail.jsx", error: String((e && e.message) || e) }); }

// components/shell/TopBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function TopBar({
  title,
  eyebrow,
  leading,
  actions,
  transparent = false,
  centerTitle = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      position: "sticky",
      top: 0,
      zIndex: 20,
      minHeight: "var(--topbar-height)",
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)",
      padding: "var(--space-2) var(--page-padding)",
      background: transparent ? "transparent" : "var(--surface-nav)",
      backdropFilter: transparent ? "none" : "var(--blur-glass)",
      WebkitBackdropFilter: transparent ? "none" : "var(--blur-glass)",
      borderBottom: transparent ? "1px solid transparent" : "1px solid var(--line-divider)",
      ...style
    }
  }, rest), leading, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      textAlign: centerTitle ? "center" : "left"
    }
  }, eyebrow && /*#__PURE__*/React.createElement("div", {
    className: "cc-label",
    style: {
      marginBottom: 2
    }
  }, eyebrow), title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      fontSize: centerTitle ? "var(--type-compact-size)" : "var(--type-h2-size)",
      lineHeight: centerTitle ? "var(--type-compact-lh)" : "var(--type-h2-lh)",
      letterSpacing: centerTitle ? "var(--track-label)" : "var(--track-display)",
      textTransform: centerTitle ? "uppercase" : "none",
      color: "var(--text-primary)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, title)), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-1)"
    }
  }, actions));
}
Object.assign(__ds_scope, { TopBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/shell/TopBar.jsx", error: String((e && e.message) || e) }); }

__ds_ns.ASSET_BASE = __ds_scope.ASSET_BASE;

__ds_ns.BrandMark = __ds_scope.BrandMark;

__ds_ns.ICON_NAMES = __ds_scope.ICON_NAMES;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IrisSeam = __ds_scope.IrisSeam;

__ds_ns.CollectorAvatar = __ds_scope.CollectorAvatar;

__ds_ns.ReviewCard = __ds_scope.ReviewCard;

__ds_ns.TradeCard = __ds_scope.TradeCard;

__ds_ns.TrustMetric = __ds_scope.TrustMetric;

__ds_ns.VerifiedBadge = __ds_scope.VerifiedBadge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.SkeletonLoader = __ds_scope.SkeletonLoader;

__ds_ns.StatusChip = __ds_scope.StatusChip;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.AccordBar = __ds_scope.AccordBar;

__ds_ns.BOTTLE_BASE = __ds_scope.BOTTLE_BASE;

__ds_ns.BottlePortrait = __ds_scope.BottlePortrait;

__ds_ns.CabinetShelf = __ds_scope.CabinetShelf;

__ds_ns.FragranceCard = __ds_scope.FragranceCard;

__ds_ns.LineageNode = __ds_scope.LineageNode;

__ds_ns.MetricDial = __ds_scope.MetricDial;

__ds_ns.OpenChamber = __ds_scope.OpenChamber;

__ds_ns.AppShell = __ds_scope.AppShell;

__ds_ns.DESTINATIONS = __ds_scope.DESTINATIONS;

__ds_ns.BottomNav = __ds_scope.BottomNav;

__ds_ns.SideRail = __ds_scope.SideRail;

__ds_ns.TopBar = __ds_scope.TopBar;

})();
