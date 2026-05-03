/* Brand logos used by LogosCarousel. SVGs paint with --color-gray12.
   tokens.css aliases that to --ub-fg so they pick up the kit theme. */
"use client";
import { useId } from "react";

const SIZE = { width: 136, height: 56, viewBox: "0 0 136 56" } as const;

export function Canopy() {
  return (
    <svg preserveAspectRatio="xMidYMid meet" width={SIZE.width} height={SIZE.height} viewBox={SIZE.viewBox} fill="none">
      <text x="68" y="34" textAnchor="middle" fill="var(--color-gray12)" fontFamily="var(--ub-font-mono)" fontSize="14" fontWeight="700" letterSpacing="0.18em">CANOPY</text>
    </svg>
  );
}
export function Canva() {
  const id = useId();
  return (
    <svg preserveAspectRatio="xMidYMid meet" width={SIZE.width} height={SIZE.height} viewBox={SIZE.viewBox} fill="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--color-gray12)" />
          <stop offset="1" stopColor="var(--color-gray12)" />
        </linearGradient>
      </defs>
      <text x="68" y="34" textAnchor="middle" fill="var(--color-gray12)" fontFamily="var(--ub-font-title)" fontSize="22" fontWeight="500" letterSpacing="-0.5px">Canva</text>
    </svg>
  );
}
export function Casetext() {
  return (
    <svg preserveAspectRatio="xMidYMid meet" width={SIZE.width} height={SIZE.height} viewBox={SIZE.viewBox} fill="none">
      <text x="68" y="34" textAnchor="middle" fill="var(--color-gray12)" fontFamily="var(--ub-font-body)" fontSize="16" fontWeight="600">casetext</text>
    </svg>
  );
}
export function Strava() {
  return (
    <svg preserveAspectRatio="xMidYMid meet" width={SIZE.width} height={SIZE.height} viewBox={SIZE.viewBox} fill="none">
      <text x="68" y="34" textAnchor="middle" fill="var(--color-gray12)" fontFamily="var(--ub-font-body)" fontSize="18" fontWeight="700" letterSpacing="0.04em">STRAVA</text>
    </svg>
  );
}
export function Descript() {
  return (
    <svg preserveAspectRatio="xMidYMid meet" width={SIZE.width} height={SIZE.height} viewBox={SIZE.viewBox} fill="none">
      <text x="68" y="34" textAnchor="middle" fill="var(--color-gray12)" fontFamily="var(--ub-font-body)" fontSize="18" fontWeight="500">Descript</text>
    </svg>
  );
}
export function Duolingo() {
  return (
    <svg preserveAspectRatio="xMidYMid meet" width={SIZE.width} height={SIZE.height} viewBox={SIZE.viewBox} fill="none">
      <text x="68" y="34" textAnchor="middle" fill="var(--color-gray12)" fontFamily="var(--ub-font-body)" fontSize="18" fontWeight="700" letterSpacing="-0.4px">duolingo</text>
    </svg>
  );
}
export function Faire() {
  return (
    <svg preserveAspectRatio="xMidYMid meet" width={SIZE.width} height={SIZE.height} viewBox={SIZE.viewBox} fill="none">
      <text x="68" y="34" textAnchor="middle" fill="var(--color-gray12)" fontFamily="var(--ub-font-title)" fontSize="22" fontWeight="500" letterSpacing="-0.4px">Faire.</text>
    </svg>
  );
}
export function Clearbit() {
  return (
    <svg preserveAspectRatio="xMidYMid meet" width={SIZE.width} height={SIZE.height} viewBox={SIZE.viewBox} fill="none">
      <g transform="translate(28 14)">
        <rect x="0" y="0" width="14" height="28" rx="2" fill="var(--color-gray12)" />
        <rect x="14" y="0" width="14" height="14" rx="0" fill="var(--color-gray12)" opacity="0.6" />
        <rect x="14" y="14" width="14" height="14" rx="0" fill="var(--color-gray12)" opacity="0.2" />
      </g>
      <text x="78" y="34" fill="var(--color-gray12)" fontFamily="var(--ub-font-body)" fontSize="15" fontWeight="600">Clearbit</text>
    </svg>
  );
}
export function IDEO() {
  return (
    <svg preserveAspectRatio="xMidYMid meet" width={SIZE.width} height={SIZE.height} viewBox={SIZE.viewBox} fill="none">
      <text x="68" y="36" textAnchor="middle" fill="var(--color-gray12)" fontFamily="var(--ub-font-body)" fontSize="22" fontWeight="700" letterSpacing="0.04em">IDEO</text>
    </svg>
  );
}
export function KhanAcademy() {
  return (
    <svg preserveAspectRatio="xMidYMid meet" width={SIZE.width} height={SIZE.height} viewBox={SIZE.viewBox} fill="none">
      <text x="68" y="34" textAnchor="middle" fill="var(--color-gray12)" fontFamily="var(--ub-font-body)" fontSize="13" fontWeight="600">Khan Academy</text>
    </svg>
  );
}
export function Quizlet() {
  return (
    <svg preserveAspectRatio="xMidYMid meet" width={SIZE.width} height={SIZE.height} viewBox={SIZE.viewBox} fill="none">
      <text x="68" y="34" textAnchor="middle" fill="var(--color-gray12)" fontFamily="var(--ub-font-body)" fontSize="18" fontWeight="700" letterSpacing="-0.3px">Quizlet</text>
    </svg>
  );
}
export function Ramp() {
  return (
    <svg preserveAspectRatio="xMidYMid meet" width={SIZE.width} height={SIZE.height} viewBox={SIZE.viewBox} fill="none">
      <text x="68" y="36" textAnchor="middle" fill="var(--color-gray12)" fontFamily="var(--ub-font-body)" fontSize="22" fontWeight="700" letterSpacing="-0.4px">ramp</text>
    </svg>
  );
}
