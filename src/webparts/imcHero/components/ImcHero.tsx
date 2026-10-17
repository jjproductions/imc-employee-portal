import * as React from 'react';
import styles from './ImcHero.module.scss';
import { IImcHeroProps } from './IImcHeroProps';
import { DEFAULT_HERO_IMAGE } from './defaultHeroImage';

/**
 * Helper to convert hex color to rgba string
 */
function hexToRgba(hexOrColor: string, alpha: number): string {
  if (!hexOrColor) return `rgba(230, 237, 248, ${alpha})`;
  let hex = hexOrColor.trim();
  if (hex.startsWith('#')) {
    hex = hex.slice(1);
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    }
    if (hex.length === 6) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
  }
  return hexOrColor;
}

/**
 * Determines whether a color is considered dark for contrast calculations
 */
function isColorDark(colorStr: string): boolean {
  if (!colorStr) return false;
  let hex = colorStr.trim();
  if (hex.startsWith('#')) {
    hex = hex.slice(1);
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    if (hex.length === 6) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      const yiq = (r * 299 + g * 587 + b * 114) / 1000;
      return yiq < 140;
    }
  }
  return false;
}

export const ImcHero: React.FC<IImcHeroProps> = (props) => {
  const {
    overlineText = 'EMPLOYEE RESOURCE CENTER',
    headlineText = 'Together Through Music',
    descriptionText = 'Welcome to the IMC Employee Resource Center — your one-stop source for policies, benefits, forms, training, and more.',
    backgroundColor = '#e6edf8',
    textColorMode = 'auto',
    accentColor = '#0d2755',
    layout = 'textLeft',
    heightMode = 'medium',
    imageUrl,
    imageAlt = 'IMC Dance Performance',
    showHighlights = false,
    highlight1Text = 'Support Our Community',
    highlight2Text = 'Empower Young People',
    highlight3Text = 'Make a Lasting Impact',
    showCta = false,
    ctaText = 'Explore Programs',
    ctaUrl = '#',
    ctaOpenInNewTab = false,
    showSecondaryCta = false,
    secondaryCtaText = 'Learn More',
    secondaryCtaUrl = '#',
    secondaryCtaOpenInNewTab = false,
    bottomSpacing = 'flush'
  } = props;

  // Resolve background color (defaults to #e6edf8 as in IMCHomePage.pdf)
  const effectiveBg = (backgroundColor && backgroundColor.trim()) ? backgroundColor.trim() : '#e6edf8';

  // Determine text theme (light or dark)
  const isDark = textColorMode === 'auto'
    ? isColorDark(effectiveBg)
    : textColorMode === 'dark';

  const themeClass = isDark ? styles.darkTheme : styles.lightTheme;

  // Resolve image source: custom URL if provided, otherwise the bundled default image
  const resolvedImageSrc = (imageUrl && imageUrl.trim()) ? imageUrl.trim() : DEFAULT_HERO_IMAGE;

  // Compute layout alignment
  const isImageRight = layout === 'textLeft';

  // Compute bottom spacing class (flush eliminates the gap to the next web part)
  let bottomSpacingClass = styles.flushBottom;
  if (bottomSpacing === 'tight') {
    bottomSpacingClass = styles.tightBottom;
  } else if (bottomSpacing === 'none') {
    bottomSpacingClass = styles.noneBottom;
  } else if (bottomSpacing === 'normal') {
    bottomSpacingClass = styles.normalBottom;
  }

  // Double-layer wide gradient blend:
  // 1. Overlay gradient in the direction of the text panel with wide, gentle curve
  // 2. CSS mask-image feathering the inner edge to transparent
  const overlayGradientStyle: React.CSSProperties = isImageRight
    ? {
        background: `linear-gradient(to right, ${effectiveBg} 0%, ${effectiveBg} 15%, ${hexToRgba(effectiveBg, 0.95)} 28%, ${hexToRgba(effectiveBg, 0.62)} 48%, ${hexToRgba(effectiveBg, 0.15)} 75%, transparent 100%)`
      }
    : {
        background: `linear-gradient(to left, ${effectiveBg} 0%, ${effectiveBg} 15%, ${hexToRgba(effectiveBg, 0.95)} 28%, ${hexToRgba(effectiveBg, 0.62)} 48%, ${hexToRgba(effectiveBg, 0.15)} 75%, transparent 100%)`
      };

  const imageMaskStyle: React.CSSProperties = isImageRight
    ? {
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.05) 12%, rgba(0, 0, 0, 0.5) 32%, rgba(0, 0, 0, 0.9) 55%, black 72%)',
        maskImage: 'linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.05) 12%, rgba(0, 0, 0, 0.5) 32%, rgba(0, 0, 0, 0.9) 55%, black 72%)'
      }
    : {
        WebkitMaskImage: 'linear-gradient(to left, transparent 0%, rgba(0, 0, 0, 0.05) 12%, rgba(0, 0, 0, 0.5) 32%, rgba(0, 0, 0, 0.9) 55%, black 72%)',
        maskImage: 'linear-gradient(to left, transparent 0%, rgba(0, 0, 0, 0.05) 12%, rgba(0, 0, 0, 0.5) 32%, rgba(0, 0, 0, 0.9) 55%, black 72%)'
      };

  // Primary CTA button styles
  const primaryCtaStyle: React.CSSProperties = isDark
    ? {
        backgroundColor: accentColor || '#38bdf8',
        color: '#090d16'
      }
    : {
        backgroundColor: accentColor || '#0d2755',
        color: '#ffffff'
      };

  return (
    <div
      className={`${styles.heroWrapper} ${bottomSpacingClass}`}
      style={{ backgroundColor: effectiveBg }}
    >
      <div
        className={`${styles.heroContainer} ${styles[heightMode] || styles.medium}`}
      >
        {/* Image Layer: Spans 68% width for a wide, continuous bleed behind the text */}
        <div
          className={`${styles.imageLayer} ${
            isImageRight ? styles.imageRight : styles.imageLeft
          }`}
          aria-hidden="true"
        >
          <img
            src={resolvedImageSrc}
            alt={imageAlt || 'Hero Banner'}
            className={styles.heroImage}
            style={imageMaskStyle}
            loading="lazy"
          />
          {/* Gentle continuous color wash matching effectiveBg */}
          <div
            className={styles.imageGradientOverlay}
            style={overlayGradientStyle}
          />
        </div>

        {/* Content Panel: Transparent background sitting directly on the canvas */}
        <div
          className={`${styles.contentPanel} ${themeClass} ${
            isImageRight ? styles.contentLeft : styles.contentRight
          }`}
        >
          {/* Row 1: Overline / Tagline */}
          {overlineText && overlineText.trim() && (
            <div className={styles.overlineRow}>
              <span className={styles.overlineText}>
                <span
                  className={styles.overlineDot}
                  style={{
                    backgroundColor: accentColor || (isDark ? '#38bdf8' : '#0d2755')
                  }}
                  aria-hidden="true"
                />
                {overlineText}
              </span>
            </div>
          )}

          {/* Row 2: Main Headline */}
          {headlineText && headlineText.trim() && (
            <h1 className={styles.headline}>
              {headlineText}
            </h1>
          )}

          {/* Row 3: Description Paragraph */}
          {descriptionText && descriptionText.trim() && (
            <p className={styles.description}>
              {descriptionText}
            </p>
          )}

          {/* Optional Highlights Row (as seen in IMCHomePage.pdf) */}
          {showHighlights && (
            <div className={styles.highlightsContainer}>
              {highlight1Text && (
                <div className={styles.highlightItem}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                  </svg>
                  <span>{highlight1Text}</span>
                </div>
              )}
              {highlight2Text && (
                <div className={styles.highlightItem}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                  </svg>
                  <span>{highlight2Text}</span>
                </div>
              )}
              {highlight3Text && (
                <div className={styles.highlightItem}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  <span>{highlight3Text}</span>
                </div>
              )}
            </div>
          )}

          {/* Optional Call to Action Button(s) */}
          {showCta && (
            <div className={styles.ctaContainer}>
              <a
                href={ctaUrl || '#'}
                className={styles.primaryCta}
                style={primaryCtaStyle}
                target={ctaOpenInNewTab ? '_blank' : undefined}
                rel={ctaOpenInNewTab ? 'noopener noreferrer' : undefined}
              >
                <span>{ctaText || 'Learn More'}</span>
                <span className={styles.ctaArrow} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path fillRule="evenodd" d="M3.75 8a.75.75 0 0 1 .75-.75h7.19L8.72 4.28a.75.75 0 1 1 1.06-1.06l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06l2.97-2.97H4.5A.75.75 0 0 1 3.75 8z" clipRule="evenodd" />
                  </svg>
                </span>
              </a>

              {showSecondaryCta && secondaryCtaText && (
                <a
                  href={secondaryCtaUrl || '#'}
                  className={styles.secondaryCta}
                  target={secondaryCtaOpenInNewTab ? '_blank' : undefined}
                  rel={secondaryCtaOpenInNewTab ? 'noopener noreferrer' : undefined}
                >
                  <span>{secondaryCtaText}</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImcHero;
