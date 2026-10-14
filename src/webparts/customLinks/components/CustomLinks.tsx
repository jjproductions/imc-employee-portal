import * as React from 'react';
import styles from './CustomLinks.module.scss';
import type { ICustomLinksProps, ICustomLinkItem } from './ICustomLinksProps';
import { renderTileIcon, ChevronRightIcon } from './TileIcons';

export default class CustomLinks extends React.Component<ICustomLinksProps> {
  public render(): React.ReactElement<ICustomLinksProps> {
    const {
      title,
      layout = 'tiles',
      links = [],
      openInNewTab = false,
      isDarkTheme = false
    } = this.props;

    const containerClasses = [
      styles.customLinksContainer,
      isDarkTheme ? styles.isDark : ''
    ].filter(Boolean).join(' ');

    if (layout === 'brackets') {
      return (
        <div className={containerClasses}>
          {title && <h2 className={styles.sectionHeader}>{title}</h2>}
          <div className={styles.linksRow}>
            {links.map((link: ICustomLinkItem) => {
              const target = link.openInNewTab ?? openInNewTab;
              return (
                <a
                  key={link.id}
                  href={link.url || '#'}
                  target={target ? '_blank' : undefined}
                  rel={target ? 'noopener noreferrer' : undefined}
                  className={styles.bracketLink}
                >
                  [ {link.title} ]
                </a>
              );
            })}
          </div>
        </div>
      );
    }

    return (
      <div className={containerClasses}>
        {title && <h2 className={styles.sectionHeader}>{title}</h2>}
        <div className={styles.tilesGrid} role="list" aria-label={title || 'Quick Links'}>
          {links.map((link: ICustomLinkItem) => {
            const target = link.openInNewTab ?? openInNewTab;
            const itemAriaLabel = link.description
              ? `${link.title}: ${link.description}`
              : link.title;

            const cardBgColor = link.iconBgColor || '#EBF3FC';
            const iconColor = link.iconColor || '#0F6CBD';

            return (
              <a
                key={link.id}
                id={`tile-${link.id}`}
                href={link.url || '#'}
                target={target ? '_blank' : undefined}
                rel={target ? 'noopener noreferrer' : undefined}
                className={styles.tileCard}
                style={{
                  backgroundColor: cardBgColor
                }}
                role="listitem"
                aria-label={itemAriaLabel}
              >
                <div className={styles.tileTop}>
                  <div className={styles.iconWrapper}>
                    {renderTileIcon(link.icon, iconColor, 28)}
                  </div>
                  <div className={styles.tileTitle}>{link.title}</div>
                  {link.description && (
                    <div className={styles.tileDescription}>{link.description}</div>
                  )}
                </div>

                <div className={styles.tileBottom}>
                  <span
                    className={styles.arrowCircle}
                    style={{
                      color: iconColor,
                      borderColor: iconColor
                    }}
                    aria-hidden="true"
                  >
                    <ChevronRightIcon strokeColor={iconColor} size={12} />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    );
  }
}
