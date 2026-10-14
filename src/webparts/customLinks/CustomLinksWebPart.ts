import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneChoiceGroup,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'CustomLinksWebPartStrings';
import CustomLinks from './components/CustomLinks';
import { ICustomLinksProps, ICustomLinkItem } from './components/ICustomLinksProps';

export interface ICustomLinksWebPartProps {
  description?: string;
  title: string;
  layout: 'tiles' | 'brackets';
  openInNewTab: boolean;
  tile1Title: string;
  tile1Description: string;
  tile1Url: string;
  tile2Title: string;
  tile2Description: string;
  tile2Url: string;
  tile3Title: string;
  tile3Description: string;
  tile3Url: string;
  tile4Title: string;
  tile4Description: string;
  tile4Url: string;
  tile5Title: string;
  tile5Description: string;
  tile5Url: string;
  tile6Title: string;
  tile6Description: string;
  tile6Url: string;
  useCustomJson: boolean;
  linksJson: string;
}

export default class CustomLinksWebPart extends BaseClientSideWebPart<ICustomLinksWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  public render(): void {
    const element: React.ReactElement<ICustomLinksProps> = React.createElement(
      CustomLinks,
      {
        title: this.properties.title,
        layout: this.properties.layout || 'tiles',
        links: this._getLinks(),
        openInNewTab: !!this.properties.openInNewTab,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        userDisplayName: this.context.pageContext.user.displayName
      }
    );

    ReactDom.render(element, this.domElement);
  }

  private _getLinks(): ICustomLinkItem[] {
    if (this.properties.useCustomJson && this.properties.linksJson) {
      try {
        const parsed = JSON.parse(this.properties.linksJson);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch {
        // Fallback to individual tile settings if JSON is invalid
      }
    }

    return [
      {
        id: 'handbook',
        title: this.properties.tile1Title || 'Employee Handbook',
        description: this.properties.tile1Description !== undefined
          ? this.properties.tile1Description
          : 'Policies, procedures and our shared values',
        url: this.properties.tile1Url || '#',
        icon: 'book',
        iconBgColor: '#EBF3FC',
        iconColor: '#0F6CBD'
      },
      {
        id: 'benefits',
        title: this.properties.tile2Title || 'My Benefits',
        description: this.properties.tile2Description !== undefined
          ? this.properties.tile2Description
          : 'Health, wellness and financial resources',
        url: this.properties.tile2Url || '#',
        icon: 'benefits',
        iconBgColor: '#E6F7F5',
        iconColor: '#0D8267'
      },
      {
        id: 'forms',
        title: this.properties.tile3Title || 'Forms & Documents',
        description: this.properties.tile3Description !== undefined
          ? this.properties.tile3Description
          : 'PTO requests, expense reimbursements and more',
        url: this.properties.tile3Url || '#',
        icon: 'forms',
        iconBgColor: '#FFF4E5',
        iconColor: '#D97706'
      },
      {
        id: 'training',
        title: this.properties.tile4Title || 'Training & Development',
        description: this.properties.tile4Description !== undefined
          ? this.properties.tile4Description
          : 'Grow your skills and your impact',
        url: this.properties.tile4Url || '#',
        icon: 'training',
        iconBgColor: '#F3EEFF',
        iconColor: '#7C3AED'
      },
      {
        id: 'calendar',
        title: this.properties.tile5Title || 'Calendar',
        description: this.properties.tile5Description !== undefined
          ? this.properties.tile5Description
          : 'Holidays, events and important dates',
        url: this.properties.tile5Url || '#',
        icon: 'calendar',
        iconBgColor: '#FEECEE',
        iconColor: '#E11D48'
      },
      {
        id: 'directory',
        title: this.properties.tile6Title || 'Staff Directory',
        description: this.properties.tile6Description !== undefined
          ? this.properties.tile6Description
          : 'Connect with the IMC team',
        url: this.properties.tile6Url || '#',
        icon: 'directory',
        iconBgColor: '#E0F2FE',
        iconColor: '#0284C7'
      }
    ];
  }

  protected onInit(): Promise<void> {
    return this._getEnvironmentMessage().then(message => {
      this._environmentMessage = message;
    });
  }

  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) {
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office':
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentOffice
                : strings.AppOfficeEnvironment;
              break;
            case 'Outlook':
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentOutlook
                : strings.AppOutlookEnvironment;
              break;
            case 'Teams':
            case 'TeamsModern':
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentTeams
                : strings.AppTeamsTabEnvironment;
              break;
            default:
              environmentMessage = strings.UnknownEnvironment;
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(
      this.context.isServedFromLocalhost
        ? strings.AppLocalEnvironmentSharePoint
        : strings.AppSharePointEnvironment
    );
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const { semanticColors } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.DisplayGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                }),
                PropertyPaneChoiceGroup('layout', {
                  label: strings.LayoutFieldLabel,
                  options: [
                    { key: 'tiles', text: 'Tiles (Modern Cards)' },
                    { key: 'brackets', text: 'Classic Bracket Links' }
                  ]
                }),
                PropertyPaneToggle('openInNewTab', {
                  label: strings.OpenInNewTabFieldLabel
                })
              ]
            },
            {
              groupName: strings.TilesGroup1Name,
              groupFields: [
                PropertyPaneTextField('tile1Title', {
                  label: 'Tile 1 Title',
                  placeholder: 'Employee Handbook'
                }),
                PropertyPaneTextField('tile1Description', {
                  label: 'Tile 1 Subtitle',
                  placeholder: 'Policies, procedures and our shared values'
                }),
                PropertyPaneTextField('tile1Url', {
                  label: 'Tile 1 URL',
                  placeholder: 'https://...'
                }),
                PropertyPaneTextField('tile2Title', {
                  label: 'Tile 2 Title',
                  placeholder: 'My Benefits'
                }),
                PropertyPaneTextField('tile2Description', {
                  label: 'Tile 2 Subtitle',
                  placeholder: 'Health, wellness and financial resources'
                }),
                PropertyPaneTextField('tile2Url', {
                  label: 'Tile 2 URL',
                  placeholder: 'https://...'
                }),
                PropertyPaneTextField('tile3Title', {
                  label: 'Tile 3 Title',
                  placeholder: 'Forms & Documents'
                }),
                PropertyPaneTextField('tile3Description', {
                  label: 'Tile 3 Subtitle',
                  placeholder: 'PTO requests, expense reimbursements and more'
                }),
                PropertyPaneTextField('tile3Url', {
                  label: 'Tile 3 URL',
                  placeholder: 'https://...'
                })
              ]
            },
            {
              groupName: strings.TilesGroup2Name,
              groupFields: [
                PropertyPaneTextField('tile4Title', {
                  label: 'Tile 4 Title',
                  placeholder: 'Training & Development'
                }),
                PropertyPaneTextField('tile4Description', {
                  label: 'Tile 4 Subtitle',
                  placeholder: 'Grow your skills and your impact'
                }),
                PropertyPaneTextField('tile4Url', {
                  label: 'Tile 4 URL',
                  placeholder: 'https://...'
                }),
                PropertyPaneTextField('tile5Title', {
                  label: 'Tile 5 Title',
                  placeholder: 'Calendar'
                }),
                PropertyPaneTextField('tile5Description', {
                  label: 'Tile 5 Subtitle',
                  placeholder: 'Holidays, events and important dates'
                }),
                PropertyPaneTextField('tile5Url', {
                  label: 'Tile 5 URL',
                  placeholder: 'https://...'
                }),
                PropertyPaneTextField('tile6Title', {
                  label: 'Tile 6 Title',
                  placeholder: 'Staff Directory'
                }),
                PropertyPaneTextField('tile6Description', {
                  label: 'Tile 6 Subtitle',
                  placeholder: 'Connect with the IMC team'
                }),
                PropertyPaneTextField('tile6Url', {
                  label: 'Tile 6 URL',
                  placeholder: 'https://...'
                })
              ]
            },
            {
              groupName: strings.AdvancedGroupName,
              groupFields: [
                PropertyPaneToggle('useCustomJson', {
                  label: strings.UseCustomJsonFieldLabel
                }),
                PropertyPaneTextField('linksJson', {
                  label: strings.CustomJsonFieldLabel,
                  multiline: true,
                  rows: 8,
                  disabled: !this.properties.useCustomJson
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
