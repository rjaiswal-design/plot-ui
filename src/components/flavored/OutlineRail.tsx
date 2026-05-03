"use client";

export interface OutlineRailItem {
  id: string;
  major?: boolean;
}

export function OutlineRail({
  items,
  activeId,
  onSelect,
}: {
  items: OutlineRailItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        paddingTop: 12,
        paddingBottom: 12,
      }}
    >
      {items.map((it) => {
        const isActive = it.id === activeId;
        return (
          <button
            key={it.id}
            type="button"
            onClick={() => onSelect?.(it.id)}
            aria-label={it.id}
            style={{
              background: "transparent",
              border: "none",
              padding: 0,
              cursor: "pointer",
              height: 1,
              width: it.major ? 40 : 24,
              marginLeft: 15,
              backgroundColor: isActive
                ? "var(--ub-accent)"
                : it.major
                ? "var(--ub-fg)"
                : "var(--ub-border-strong)",
              transition: "background-color 0.2s ease, width 0.2s ease",
            }}
          />
        );
      })}
    </div>
  );
}
