export interface ICustomLinkItem {
  id: string;
  title: string;
  description?: string;
  url: string;
  icon?: string;
  iconBgColor?: string;
  iconColor?: string;
  openInNewTab?: boolean;
}

export interface ICustomLinksProps {
  title?: string;
  layout?: 'tiles' | 'brackets';
  links: ICustomLinkItem[];
  openInNewTab?: boolean;
  isDarkTheme: boolean;
  environmentMessage: string;
  userDisplayName: string;
}
