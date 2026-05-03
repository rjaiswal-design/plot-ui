"use client";
import { ReactNode, useState } from "react";

import { Button } from "../../src/components/primitives/Button";
import { Input } from "../../src/components/primitives/Input";
import { Textarea } from "../../src/components/primitives/Textarea";
import { Card, CardHeader } from "../../src/components/primitives/Card";
import { Badge } from "../../src/components/primitives/Badge";
import { Tabs } from "../../src/components/primitives/Tabs";
import { Modal } from "../../src/components/primitives/Modal";
import { AlertDialog } from "../../src/components/primitives/AlertDialog";
import { Alert } from "../../src/components/primitives/Alert";
import { Tooltip } from "../../src/components/primitives/Tooltip";
import { HoverCard } from "../../src/components/primitives/HoverCard";
import { Avatar } from "../../src/components/primitives/Avatar";
import { Switch } from "../../src/components/primitives/Switch";
import { Checkbox } from "../../src/components/primitives/Checkbox";
import { RadioGroup } from "../../src/components/primitives/RadioGroup";
import { Select } from "../../src/components/primitives/Select";
import { Slider } from "../../src/components/primitives/Slider";
import { Progress } from "../../src/components/primitives/Progress";
import { Skeleton } from "../../src/components/primitives/Skeleton";
import { Divider } from "../../src/components/primitives/Divider";
import { Kbd } from "../../src/components/primitives/Kbd";
import { Label } from "../../src/components/primitives/Label";
import { Popover } from "../../src/components/primitives/Popover";
import { DropdownMenu } from "../../src/components/primitives/DropdownMenu";
import { Accordion } from "../../src/components/primitives/Accordion";
import { Breadcrumb } from "../../src/components/primitives/Breadcrumb";
import { Pagination } from "../../src/components/primitives/Pagination";
import { Sheet } from "../../src/components/primitives/Sheet";
import { Toggle } from "../../src/components/primitives/Toggle";
import { ToggleGroup } from "../../src/components/primitives/ToggleGroup";
import { useToast } from "../../src/components/primitives/Toast";

import { LiveRipple } from "../../src/components/flavored/LiveRipple";
import { OutlineRail } from "../../src/components/flavored/OutlineRail";
import { PhoneFrame } from "../../src/components/flavored/PhoneFrame";
import { BeforeAfter } from "../../src/components/flavored/BeforeAfter";
import { MonoLabel } from "../../src/components/flavored/MonoLabel";
import { MorphSurface } from "../../src/components/flavored/MorphSurface";
import { BlurReveal, BlurRevealContents } from "../../src/components/flavored/BlurReveal";
import { LogosCarousel } from "../../src/components/flavored/LogosCarousel";
import { Dial } from "../../src/components/flavored/Dial";
import { DialSlider } from "../../src/components/flavored/DialSlider";

interface CellProps {
  num: string;
  name: string;
  span?: 1 | 2 | 3;
  children: ReactNode;
}

function Cell({ num, name, span = 1, children }: CellProps) {
  return (
    <div
      style={{
        gridColumn: `span ${span}`,
        background: "var(--ub-surface)",
        border: "1px solid var(--ub-border)",
        borderRadius: "var(--ub-radius-lg)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 12px",
          borderBottom: "1px solid var(--ub-border)",
          background: "var(--ub-bg-deep)",
        }}
      >
        <span
          className="ub-mono"
          style={{ fontSize: 9, color: "var(--ub-fg-mutedXX)" }}
        >
          {num}
        </span>
        <span className="ub-mono" style={{ fontSize: 9, color: "var(--ub-fg)" }}>
          {name}
        </span>
      </div>
      <div
        style={{
          flex: 1,
          minHeight: 96,
          padding: 18,
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function GalleryDemos() {
  const [modalOpen, setModalOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sliderV, setSliderV] = useState(35);
  const [pop, setPop] = useState(false);
  const [railActive, setRailActive] = useState("c");
  const toast = useToast();

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1080,
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 12,
      }}
    >
      <Cell num="01" name="BUTTON">
        <Button variant="primary" size="sm">Primary</Button>
        <Button variant="secondary" size="sm">Secondary</Button>
        <Button variant="ghost" size="sm">Ghost</Button>
      </Cell>

      <Cell num="02" name="INPUT">
        <Input placeholder="you@noon.com" />
      </Cell>

      <Cell num="03" name="TEXTAREA">
        <Textarea placeholder="Notes…" rows={2} />
      </Cell>

      <Cell num="04" name="SELECT">
        <Select
          defaultValue="opt-2"
          options={[
            { value: "opt-1", label: "Engineering" },
            { value: "opt-2", label: "Design" },
            { value: "opt-3", label: "Product" },
          ]}
        />
      </Cell>

      <Cell num="05" name="CHECKBOX">
        <Checkbox label="Auto-publish" defaultChecked />
        <Checkbox label="Indeterminate" indeterminate />
        <Checkbox label="Disabled" disabled />
      </Cell>

      <Cell num="06" name="RADIO GROUP">
        <RadioGroup
          defaultValue="b"
          options={[
            { value: "a", label: "Public" },
            { value: "b", label: "Internal" },
            { value: "c", label: "Restricted" },
          ]}
        />
      </Cell>

      <Cell num="07" name="SWITCH">
        <Switch defaultChecked label="Notifications" />
      </Cell>

      <Cell num="08" name="SLIDER">
        <div style={{ width: "100%" }}>
          <Slider value={sliderV} onChange={setSliderV} showValue />
        </div>
      </Cell>

      <Cell num="09" name="LABEL">
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Label optional>EMAIL</Label>
          <Input placeholder="rj@noon.com" />
        </div>
      </Cell>

      <Cell num="10" name="BADGE">
        <Badge>Default</Badge>
        <Badge tone="accent">Review</Badge>
        <Badge tone="success">Live</Badge>
        <Badge tone="danger">Failed</Badge>
      </Cell>

      <Cell num="11" name="KBD">
        <span style={{ display: "inline-flex", gap: 4 }}>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </span>
      </Cell>

      <Cell num="12" name="DIVIDER">
        <div style={{ width: "100%" }}>
          <Divider label="OR" />
        </div>
      </Cell>

      <Cell num="13" name="TOOLTIP">
        <Tooltip label="Saved to drafts">
          <Button variant="ghost" size="sm">Hover</Button>
        </Tooltip>
      </Cell>

      <Cell num="14" name="HOVER CARD">
        <HoverCard
          trigger={<Button variant="ghost" size="sm">@rahul</Button>}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <Avatar initials="RJ" size={32} />
              <div>
                <div style={{ color: "var(--ub-fg)", fontSize: 13, fontWeight: 500 }}>
                  Rahul Jaiswal
                </div>
                <div style={{ color: "var(--ub-fg-muted)", fontSize: 11 }}>
                  Design · Noon
                </div>
              </div>
            </div>
            <div style={{ color: "var(--ub-fg-muted)", fontSize: 12 }}>
              Building Plot and the Field DS.
            </div>
          </div>
        </HoverCard>
      </Cell>

      <Cell num="15" name="POPOVER">
        <Popover
          open={pop}
          onOpenChange={setPop}
          trigger={<Button variant="secondary" size="sm">Open</Button>}
          width={220}
        >
          <div style={{ padding: 6, color: "var(--ub-fg-soft)", fontSize: 12 }}>
            Plain content. Click outside or press Esc.
          </div>
        </Popover>
      </Cell>

      <Cell num="16" name="DROPDOWN MENU">
        <DropdownMenu
          trigger={<Button variant="secondary" size="sm">Actions ▾</Button>}
          items={[
            { id: "rename", label: "Rename", shortcut: "R" },
            { id: "share", label: "Share", shortcut: "⇧S" },
            "separator",
            { id: "del", label: "Delete", destructive: true, shortcut: "⌫" },
          ]}
        />
      </Cell>

      <Cell num="17" name="MODAL">
        <Button variant="secondary" size="sm" onClick={() => setModalOpen(true)}>
          Open
        </Button>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Rename project">
          <Input defaultValue="Plot UI" autoFocus />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 }}>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setModalOpen(false)}>
              Save
            </Button>
          </div>
        </Modal>
      </Cell>

      <Cell num="18" name="ALERT DIALOG">
        <Button variant="danger" size="sm" onClick={() => setAlertOpen(true)}>
          Delete
        </Button>
        <AlertDialog
          open={alertOpen}
          onClose={() => setAlertOpen(false)}
          title="Delete project?"
          description="This permanently removes the project and all its tokens. This cannot be undone."
          confirmLabel="Delete"
          destructive
        />
      </Cell>

      <Cell num="19" name="SHEET">
        <Button variant="secondary" size="sm" onClick={() => setSheetOpen(true)}>
          Open right sheet
        </Button>
        <Sheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="Filters">
          <p style={{ color: "var(--ub-fg-muted)", fontSize: 13 }}>
            Sheet content slides in from the side. Useful for filters and detail panes.
          </p>
        </Sheet>
      </Cell>

      <Cell num="20" name="ALERT" span={3}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
          <Alert tone="accent" title="Heads up">
            We just shipped 19 new components and reworked the hero.
          </Alert>
          <Alert tone="success" title="Build succeeded">
            Deployed to staging in 41s.
          </Alert>
          <Alert tone="danger" title="Token override conflicts">
            <code>--ub-accent</code> is set in two places.
          </Alert>
        </div>
      </Cell>

      <Cell num="21" name="TOAST">
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            toast.push({ tone: "success", title: "Saved", body: "Draft updated." })
          }
        >
          Toast: success
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            toast.push({ tone: "danger", title: "Build failed", body: "Check the logs." })
          }
        >
          Toast: danger
        </Button>
      </Cell>

      <Cell num="22" name="PROGRESS">
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
          <Progress value={68} showValue />
          <Progress value={32} tone="success" showValue />
        </div>
      </Cell>

      <Cell num="23" name="SKELETON">
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 6 }}>
          <Skeleton width="60%" height={10} />
          <Skeleton width="90%" height={10} />
          <Skeleton width="40%" height={10} />
        </div>
      </Cell>

      <Cell num="24" name="TABS" span={2}>
        <div style={{ width: "100%" }}>
          <Tabs
            items={[
              { id: "ov", label: "Overview", content: <p style={{ color: "var(--ub-fg-muted)", fontSize: 13, margin: 0 }}>Project at a glance.</p> },
              { id: "mt", label: "Metrics", content: <p style={{ color: "var(--ub-fg-muted)", fontSize: 13, margin: 0 }}>GMV, latency, errors.</p> },
              { id: "lg", label: "Logs", content: <p style={{ color: "var(--ub-fg-muted)", fontSize: 13, margin: 0 }}>Recent events.</p> },
            ]}
          />
        </div>
      </Cell>

      <Cell num="25" name="TOGGLE">
        <Toggle defaultPressed>B</Toggle>
        <Toggle><i>I</i></Toggle>
        <Toggle><u>U</u></Toggle>
      </Cell>

      <Cell num="26" name="TOGGLE GROUP">
        <ToggleGroup
          defaultValue="md"
          items={[
            { value: "sm", label: "SM" },
            { value: "md", label: "MD" },
            { value: "lg", label: "LG" },
          ]}
        />
      </Cell>

      <Cell num="27" name="ACCORDION" span={2}>
        <div style={{ width: "100%" }}>
          <Accordion
            defaultOpen={["a"]}
            items={[
              { id: "a", title: "What is the Plot UI kit?", content: "Editorial primitives extracted from the Plot authoring surface." },
              { id: "b", title: "How do I extend a token?", content: "Override the CSS variable in your own stylesheet — the kit follows." },
              { id: "c", title: "Is it tree-shakeable?", content: "Yes — every component is a named export." },
            ]}
          />
        </div>
      </Cell>

      <Cell num="28" name="BREADCRUMB">
        <Breadcrumb
          items={[
            { label: "WORKSPACE", href: "#" },
            { label: "PROJECTS", href: "#" },
            { label: "PLOT" },
          ]}
        />
      </Cell>

      <Cell num="29" name="PAGINATION" span={2}>
        <Pagination total={12} defaultPage={4} />
      </Cell>

      <Cell num="30" name="AVATAR">
        <Avatar initials="RJ" />
        <Avatar initials="AK" active={false} />
        <Avatar initials="DS" color="var(--ub-success)" />
      </Cell>

      <Cell num="31" name="CARD" span={2}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, width: "100%" }}>
          <Card padded={false} style={{ padding: 14 }}>
            <CardHeader eyebrow="V1" title="Compact" meta="GMV +12%" />
          </Card>
          <Card active padded={false} style={{ padding: 14 }}>
            <CardHeader eyebrow="V2" title="Calendar-first" meta="GMV +18%" />
          </Card>
        </div>
      </Cell>

      {/* ── Flavored row ──────────────────────────────────────────────────── */}
      <Cell num="32" name="LIVE RIPPLE">
        <LiveRipple />
        <LiveRipple label="DEPLOYING" color="var(--ub-accent)" />
      </Cell>

      <Cell num="33" name="OUTLINE RAIL · interactive" span={2}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 36,
            width: "100%",
            justifyContent: "center",
            padding: "12px 0",
          }}
        >
          <OutlineRail
            activeId={railActive}
            onSelect={setRailActive}
            items={[
              { id: "intro",       major: true  },
              { id: "tokens"                   },
              { id: "primitives",  major: true  },
              { id: "hooks"                    },
              { id: "patterns",    major: true  },
              { id: "examples"                 },
              { id: "changelog",   major: true  },
            ]}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 160 }}>
            <span
              className="ub-mono"
              style={{ fontSize: 9, color: "var(--ub-fg-mutedXX)" }}
            >
              ACTIVE SECTION
            </span>
            <span
              style={{
                fontFamily: "var(--ub-font-title)",
                fontSize: 22,
                letterSpacing: "-0.4px",
                color: "var(--ub-fg)",
                textTransform: "capitalize",
              }}
            >
              {railActive}
            </span>
            <span
              className="ub-mono"
              style={{ fontSize: 9, color: "var(--ub-fg-muted)", marginTop: 4 }}
            >
              CLICK ANY DASH
            </span>
          </div>
        </div>
      </Cell>

      <Cell num="34" name="MONO LABEL">
        <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start" }}>
          <MonoLabel>DEFAULT</MonoLabel>
          <MonoLabel tone="accent">ACCENT</MonoLabel>
          <MonoLabel tone="muted">MUTED</MonoLabel>
        </div>
      </Cell>

      <Cell num="35" name="PHONE FRAME" span={2}>
        <PhoneFrame width={148} height={310}>
          <div
            style={{
              padding: 12,
              display: "flex",
              flexDirection: "column",
              gap: 8,
              background: "linear-gradient(180deg, var(--ub-bg-deep) 0%, #1a1a1a 100%)",
              height: "100%",
            }}
          >
            <span className="ub-mono" style={{ color: "var(--ub-accent)", fontSize: 8 }}>
              EXPERIENCES
            </span>
            <span style={{ fontFamily: "var(--ub-font-title)", fontSize: 16, lineHeight: 1.05 }}>
              Burj Khalifa<br />Sky Tour
            </span>
            <div style={{ marginTop: "auto" }}>
              <Badge tone="accent">AED 149</Badge>
            </div>
          </div>
        </PhoneFrame>
      </Cell>

      <Cell num="36" name="MORPH SURFACE" span={3}>
        <MorphSurface demoMode />
      </Cell>

      <Cell num="37" name="BLUR REVEAL" span={3}>
        <BlurReveal duration={2200} blur={12}>
          <BlurRevealContents />
        </BlurReveal>
      </Cell>

      <Cell num="38" name="LOGOS CAROUSEL" span={3}>
        <LogosCarousel count={4} />
      </Cell>

      <Cell num="39" name="DIAL · the namesake" span={3}>
        <div
          style={{
            display: "flex",
            gap: 36,
            alignItems: "center",
            justifyContent: "center",
            padding: "8px 0",
            flexWrap: "wrap",
          }}
        >
          <Dial label="GAIN"   defaultValue={62} unit="%" />
          <Dial label="MIX"    defaultValue={40} unit="%" />
          <Dial label="ATTACK" defaultValue={18} unit="ms" />
          <Dial label="DECAY"  defaultValue={75} unit="ms" />
          <DialSlider label="LOW"  defaultValue={48} unit="db" />
          <DialSlider label="MID"  defaultValue={64} unit="db" />
          <DialSlider label="HIGH" defaultValue={32} unit="db" />
          <DialSlider label="OUT"  defaultValue={80} unit="db" />
        </div>
      </Cell>

      <Cell num="40" name="DIAL SLIDER · horizontal" span={3}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            width: "100%",
            maxWidth: 460,
            margin: "0 auto",
          }}
        >
          <DialSlider orientation="horizontal" label="DRY/WET" defaultValue={35} unit="%" length={400} />
          <DialSlider orientation="horizontal" label="REVERB"  defaultValue={68} unit="%" length={400} />
          <DialSlider orientation="horizontal" label="DELAY"   defaultValue={22} unit="%" length={400} />
        </div>
      </Cell>

      <Cell num="37" name="BEFORE / AFTER" span={3}>
        <div style={{ width: "100%" }}>
          <BeforeAfter
            height={180}
            before={
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "repeating-linear-gradient(45deg, #1a1a1a 0 12px, #161616 12px 24px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--ub-fg-muted)",
                  fontFamily: "var(--ub-font-mono)",
                  fontSize: 11,
                }}
              >
                v1 SURFACE
              </div>
            }
            after={
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(255,88,0,0.18), transparent 60%), #0e0e0e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--ub-fg)",
                  fontFamily: "var(--ub-font-mono)",
                  fontSize: 11,
                }}
              >
                v2 SURFACE
              </div>
            }
          />
        </div>
      </Cell>
    </div>
  );
}
