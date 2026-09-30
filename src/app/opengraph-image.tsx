import { ImageResponse } from 'next/og';

/**
 * Open Graph image — what appears when someone shares a link on
 * Instagram, WhatsApp, or Slack.
 *
 * This is the single highest-leverage image on the site. A Reel with
 * a link is shared constantly, and a blank preview card reads as a
 * broken link. This one is generated at build time, so it costs
 * nothing at request time and never goes stale.
 *
 * Sized 1200x630 — the standard OG ratio.
 */
export const runtime = 'edge';
export const alt = 'Small-batch crochet creatures and keepsakes — made once, for one person';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  // Satori has no access to the site's CSS variables, so the display
  // face is passed explicitly. It is the same self-hosted file the
  // site already serves — no third-party request, and the share card
  // stays visually identical to the page.
  const display = await fetch(
    new URL('../../public/fonts/cormorant-500.woff2', import.meta.url),
  )
    .then((res) => res.arrayBuffer())
    .catch(() => null);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#eef0ea',
          padding: '68px 76px',
          fontFamily: 'Georgia, "Times New Roman", serif',
          position: 'relative',
        }}
      >
        {/* Ground texture — the same paper grain as the site.
            display must be explicit for Satori, same reason. */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            backgroundImage:
              'repeating-linear-gradient(-45deg, rgba(22,36,27,0.028) 0px, rgba(22,36,27,0.028) 1px, transparent 1px, transparent 9px)',
          }}
        />

        {/* Top row: wordmark and location */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: 'Satoshi, system-ui, sans-serif',
            fontSize: 20,
            letterSpacing: '0.18em',
            color: '#45524b',
          }}
        >
          <span style={{ color: '#16241b' }}>MOR</span>
          <span>INDIA · SHIPPING WORLDWIDE</span>
        </div>

        {/* Centre: the claim.
            NOTE: Satori (the OG renderer) requires an explicit
            display on any div with more than one child, and does not
            support <br /> inside a text block. Each line is its own
            flex child instead. */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {['Made once,', 'for one person.'].map((line) => (
            <div
              key={line}
              style={{
                fontFamily: display ? 'Cormorant' : 'Georgia, serif',
                fontSize: 108,
                lineHeight: 1.02,
                letterSpacing: '-0.02em',
                color: '#16241b',
              }}
            >
              {line}
            </div>
          ))}
        </div>

        {/* Bottom: supporting line and a stitch motif */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: 40,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              fontFamily: 'Satoshi, system-ui, sans-serif',
              fontSize: 25,
              color: '#45524b',
              lineHeight: 1.45,
            }}
          >
            <span>Plush-touch yarn, worked by hand over weeks.</span>
            <span>Commissions open, three tiers, prices on the page.</span>
          </div>

          {/* Shell stitch, the site's signature motif.
              Satori renders SVG children only if the parent <g> is
              the sole child of a <svg>; each shell is drawn at a
              larger scale so the motif reads at thumbnail size. */}
          <svg
            width="248"
            height="62"
            viewBox="0 0 400 40"
            fill="none"
            style={{ display: 'flex' }}
          >
            <g stroke="#a67c00" strokeWidth="1.6">
              {[0, 100, 200, 300].map((x) => (
                <g key={x}>
                  <path d={`M${x + 20} 34 L${x + 20} 12`} />
                  <path d={`M${x + 28} 34 L${x + 28} 9`} />
                  <path d={`M${x + 36} 34 L${x + 36} 8`} />
                  <path d={`M${x + 44} 34 L${x + 44} 9`} />
                  <path d={`M${x + 52} 34 L${x + 52} 12`} />
                  <path d={`M${x + 14} 34 Q${x + 36} 2 ${x + 58} 34`} />
                </g>
              ))}
            </g>
          </svg>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: display
        ? [
            {
              name: 'Cormorant',
              data: display,
              style: 'normal' as const,
              weight: 500 as const,
            },
          ]
        : undefined,
    },
  );
}
