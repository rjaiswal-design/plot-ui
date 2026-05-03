"use client";
import { useEffect, useState } from "react";
import { Command, CommandItem } from "../../src/components/primitives/Command";
import { useToast } from "../../src/components/primitives/Toast";

const items: Omit<CommandItem, "onSelect">[] = [
  { id: "go-install",     group: "Navigate",   label: "Go to install",      shortcut: "G I" },
  { id: "go-foundations", group: "Navigate",   label: "Go to foundations",  shortcut: "G F" },
  { id: "go-gallery",     group: "Navigate",   label: "Go to components",   shortcut: "G C" },
  { id: "copy-install",   group: "Actions",    label: "Copy install command",                shortcut: "⌘ I" },
  { id: "open-github",    group: "Actions",    label: "Open on GitHub",     shortcut: "⌘ G" },
  { id: "btn",            group: "Components", label: "Button",      keywords: ["primary", "secondary", "cta"] },
  { id: "input",          group: "Components", label: "Input" },
  { id: "select",         group: "Components", label: "Select" },
  { id: "modal",          group: "Components", label: "Modal" },
  { id: "alert-dialog",   group: "Components", label: "Alert Dialog" },
  { id: "command",        group: "Components", label: "Command palette" },
  { id: "sheet",          group: "Components", label: "Sheet" },
  { id: "popover",        group: "Components", label: "Popover" },
  { id: "dropdown",       group: "Components", label: "Dropdown menu" },
  { id: "accordion",      group: "Components", label: "Accordion" },
  { id: "pagination",     group: "Components", label: "Pagination" },
  { id: "live-ripple",    group: "Components", label: "Live ripple" },
  { id: "phone-frame",    group: "Components", label: "Phone frame" },
];

export function CommandLauncher() {
  const [open, setOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const wired: CommandItem[] = items.map((it) => ({
    ...it,
    onSelect: () => {
      if (it.id.startsWith("go-")) {
        const map: Record<string, string> = {
          "go-install": "install",
          "go-foundations": "foundations",
          "go-gallery": "gallery",
        };
        scrollTo(map[it.id]);
      } else if (it.id === "copy-install") {
        navigator.clipboard.writeText("npm i @plot/ui");
        toast.push({ tone: "success", title: "Copied", body: "npm i @plot/ui" });
      } else {
        toast.push({ tone: "neutral", title: it.label, body: `Selected ${it.label}.` });
      }
    },
  }));

  return <Command open={open} onClose={() => setOpen(false)} items={wired} />;
}
