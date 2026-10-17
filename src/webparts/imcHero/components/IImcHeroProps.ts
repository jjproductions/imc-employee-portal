export type HeroLayout = 'textLeft' | 'imageLeft';
export type HeroHeight = 'compact' | 'medium' | 'tall';
export type TextColorMode = 'light' | 'dark' | 'auto';
export type BlendStyle = 'smooth' | 'soft' | 'wide';
export type CtaStyle = 'filled' | 'outline' | 'glass';
export type BottomSpacing = 'flush' | 'tight' | 'none' | 'normal';

export interface IImcHeroProps {
  // Row 1: Overline / Tagline
  overlineText: string;

  // Row 2: Main Headline
  headlineText: string;

  // Row 3: Description Paragraph
  descriptionText: string;

  // Appearance & Theme
  backgroundColor: string;
  textColorMode: TextColorMode;
  accentColor?: string;

  // Layout & Blending
  layout: HeroLayout;
  blendStyle: BlendStyle;
  heightMode: HeroHeight;
  bottomSpacing?: BottomSpacing;

  // Image Settings
  imageUrl?: string;
  imageAlt?: string;

  // Primary Call-to-Action
  showCta: boolean;
  ctaText?: string;
  ctaUrl?: string;
  ctaOpenInNewTab?: boolean;
  ctaStyle?: CtaStyle;

  // Secondary Call-to-Action (optional)
  showSecondaryCta?: boolean;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  secondaryCtaOpenInNewTab?: boolean;

  // Highlights Row (as seen in IMCHomePage.pdf)
  showHighlights?: boolean;
  highlight1Text?: string;
  highlight2Text?: string;
  highlight3Text?: string;

  // Environment & SPFx context
  isDarkTheme?: boolean;
  environmentMessage?: string;
  userDisplayName?: string;
}
