"use client";
import { ReactNode, useEffect, useState, CSSProperties } from "react";
import {
  Canopy,
  Canva,
  Casetext,
  Strava,
  Descript,
  Duolingo,
  Faire,
  Clearbit,
  IDEO,
  KhanAcademy,
  Quizlet,
  Ramp,
} from "./_logos";

export const DEFAULT_LOGOS: ReactNode[][] = [
  [<Canopy key="1" />, <Canva key="2" />, <Casetext key="3" />, <Strava key="4" />],
  [<Descript key="5" />, <Duolingo key="6" />, <Faire key="7" />, <Clearbit key="8" />],
  [<IDEO key="9" />, <KhanAcademy key="10" />, <Quizlet key="11" />, <Ramp key="12" />],
];

export interface LogosCarouselProps {
  /** Rows of logo nodes — each row swaps in cyclically. */
  logos?: ReactNode[][];
  /** Stagger between sibling logos in seconds. */
  stagger?: number;
  /** Show the first N logos per row (defaults to all). */
  count?: number;
  /** Cycle interval in ms. */
  interval?: number;
}

export function LogosCarousel({
  logos = DEFAULT_LOGOS,
  stagger = 0.14,
  count,
  interval = 1500,
}: LogosCarouselProps) {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  const current = logos[index].slice(0, count);
  const next = logos[(index + 1) % logos.length].slice(0, count);

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!animate) return;
    const i = setInterval(() => {
      setIndex((idx) => (idx + 1) % logos.length);
    }, interval);
    return () => clearInterval(i);
  }, [animate, logos.length, interval]);

  return (
    <div
      className="ub-logos-row"
      style={{ maxWidth: 720, width: "100%" }}
    >
      <div
        key={`${index}-exit`}
        style={{
          gridArea: "1 / 1",
          display: "flex",
          width: "100%",
          gap: 32,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {current.map((logo, i) => (
          <Logo key={i} state="exit" animate={animate} index={i} stagger={stagger}>
            {logo}
          </Logo>
        ))}
      </div>
      {animate && (
        <div
          key={`${index}-enter`}
          style={{
            gridArea: "1 / 1",
            display: "flex",
            width: "100%",
            gap: 32,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {next.map((logo, i) => (
            <Logo key={i} state="enter" animate={animate} index={i} stagger={stagger}>
              {logo}
            </Logo>
          ))}
        </div>
      )}
    </div>
  );
}

function Logo({
  children,
  animate,
  index,
  state,
  stagger = 0.14,
}: {
  children: ReactNode;
  animate?: boolean;
  index: number;
  state?: "enter" | "exit";
  stagger?: number;
}) {
  return (
    <div
      className="ub-logo"
      data-state={state}
      data-animate={animate}
      style={{ "--delay": `${index * stagger}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}
