'use client';

import { useState } from 'react';
import { CableRib } from './stitch';

/**
 * Image with a graceful fallback.
 *
 * If a photograph is missing or fails to decode, we render a tonal
 * stitch tile rather than a broken-image icon. This means the site
 * can be deployed before the photography exists, and replacing a
 * placeholder with a real photo is a single file drop — no config,
 * no code change, and no broken page if a file is misnamed.
 */
export function Photo({
  src,
  alt,
  tone = '#c9c0b0',
  label,
  index,
  priority = false,
}: {
  src?: string;
  alt: string;
  tone?: string;
  label?: string;
  index?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <Fallback tone={tone} label={label ?? alt} index={index} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover"
    />
  );
}

function Fallback({
  tone,
  label,
  index,
}: {
  tone: string;
  label: string;
  index?: string;
}) {
  return (
    <div
      className="placeholder-tile absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center"
      style={{ backgroundColor: tone }}
    >
      <CableRib tone="ink" className="h-4 w-20" opacity={0.16} />
      <span className="meta text-ink-mute/80">{label}</span>
      {index && <span className="meta text-ink-mute/50">{index}</span>}
    </div>
  );
}
