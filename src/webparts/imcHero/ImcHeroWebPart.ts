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

import * as strings from 'ImcHeroWebPartStrings';
import ImcHero from './components/ImcHero';
import {
  IImcHeroProps,
  HeroLayout,
  HeroHeight,
  TextColorMode,
  BlendStyle,
  BottomSpacing
} from './components/IImcHeroProps';

export interface IImcHeroWebPartProps {
  overlineText: string;
  headlineText: string;
  descriptionText: string;
  backgroundColor: string;
  accentColor: string;
  textColorMode: TextColorMode;
  layout: HeroLayout;
  heightMode: HeroHeight;
  bottomSpacing: BottomSpacing;
  blendStyle: BlendStyle;
  imageUrl: string;
  imageAlt: string;
  showCta: boolean;
  ctaText: string;
  ctaUrl: string;
  ctaOpenInNewTab: boolean;
  showSecondaryCta: boolean;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
  secondaryCtaOpenInNewTab: boolean;
  showHighlights: boolean;
  highlight1Text: string;
  highlight2Text: string;
  highlight3Text: string;
}

export default class ImcHeroWebPart extends BaseClientSideWebPart<IImcHeroWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  public render(): void {
    const element: React.ReactElement<IImcHeroProps> = React.createElement(
      ImcHero,
      {
        overlineText: this.properties.overlineText !== undefined
          ? this.properties.overlineText
          : 'EMPLOYEE RESOURCE CENTER',
        headlineText: this.properties.headlineText !== undefined
          ? this.properties.headlineText
          : 'Together Through Music',
        descriptionText: this.properties.descriptionText !== undefined
          ? this.properties.descriptionText
          : 'Welcome to the IMC Employee Resource Center — your one-stop source for policies, benefits, forms, training, and more.',
        backgroundColor: this.properties.backgroundColor || '#e6edf8',
        accentColor: this.properties.accentColor || '#0d2755',
        textColorMode: this.properties.textColorMode || 'auto',
        layout: this.properties.layout || 'textLeft',
        heightMode: this.properties.heightMode || 'medium',
        bottomSpacing: this.properties.bottomSpacing || 'flush',
        blendStyle: this.properties.blendStyle || 'smooth',
        imageUrl: this.properties.imageUrl,
        imageAlt: this.properties.imageAlt || 'IMC Dance Performance',
        showCta: !!this.properties.showCta,
        ctaText: this.properties.ctaText || 'Explore Programs',
        ctaUrl: this.properties.ctaUrl || '#',
        ctaOpenInNewTab: !!this.properties.ctaOpenInNewTab,
        showSecondaryCta: !!this.properties.showSecondaryCta,
        secondaryCtaText: this.properties.secondaryCtaText || 'Learn More',
        secondaryCtaUrl: this.properties.secondaryCtaUrl || '#',
        secondaryCtaOpenInNewTab: !!this.properties.secondaryCtaOpenInNewTab,
        showHighlights: this.properties.showHighlights !== undefined ? this.properties.showHighlights : true,
        highlight1Text: this.properties.highlight1Text || 'Support Our Community',
        highlight2Text: this.properties.highlight2Text || 'Empower Young People',
        highlight3Text: this.properties.highlight3Text || 'Make a Lasting Impact',
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        userDisplayName: this.context.pageContext.user.displayName
      }
    );

    ReactDom.render(element, this.domElement);
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
              groupName: strings.ContentGroupName,
              groupFields: [
                PropertyPaneTextField('overlineText', {
                  label: strings.OverlineFieldLabel,
                  placeholder: 'EMPLOYEE RESOURCE CENTER'
                }),
                PropertyPaneTextField('headlineText', {
                  label: strings.HeadlineFieldLabel,
                  placeholder: 'Together Through Music'
                }),
                PropertyPaneTextField('descriptionText', {
                  label: strings.DescriptionFieldLabel,
                  placeholder: 'Welcome to the IMC Employee Resource Center — your one-stop source...',
                  multiline: true,
                  rows: 3
                })
              ]
            },
            {
              groupName: strings.LayoutGroupName,
              groupFields: [
                PropertyPaneChoiceGroup('layout', {
                  label: strings.LayoutFieldLabel,
                  options: [
                    {
                      key: 'textLeft',
                      text: 'Text on Left, Image on Right'
                    },
                    {
                      key: 'imageLeft',
                      text: 'Image on Left, Text on Right'
                    }
                  ]
                }),
                PropertyPaneChoiceGroup('heightMode', {
                  label: strings.HeightModeFieldLabel,
                  options: [
                    { key: 'compact', text: 'Compact (320px)' },
                    { key: 'medium', text: 'Standard (420px)' },
                    { key: 'tall', text: 'Spacious (520px)' }
                  ]
                }),
                PropertyPaneChoiceGroup('bottomSpacing', {
                  label: strings.BottomSpacingFieldLabel,
                  options: [
                    { key: 'flush', text: 'Eliminate Gap (Flush with tiles below)' },
                    { key: 'tight', text: 'Tight Gap (-12px)' },
                    { key: 'none', text: 'Zero Margin (0px)' },
                    { key: 'normal', text: 'Standard Gap (+24px)' }
                  ]
                }),
                PropertyPaneTextField('imageUrl', {
                  label: strings.ImageUrlFieldLabel,
                  placeholder: 'Leave blank to use default IMC dance photo'
                }),
                PropertyPaneTextField('imageAlt', {
                  label: strings.ImageAltFieldLabel,
                  placeholder: 'IMC Dance Performance'
                })
              ]
            },
            {
              groupName: strings.DesignGroupName,
              groupFields: [
                PropertyPaneTextField('backgroundColor', {
                  label: strings.BackgroundColorFieldLabel,
                  placeholder: '#e6edf8'
                }),
                PropertyPaneTextField('accentColor', {
                  label: strings.AccentColorFieldLabel,
                  placeholder: '#0d2755'
                }),
                PropertyPaneChoiceGroup('textColorMode', {
                  label: strings.TextColorModeFieldLabel,
                  options: [
                    { key: 'auto', text: 'Auto (Contrast-based)' },
                    { key: 'dark', text: 'Force Light Text (Dark Theme)' },
                    { key: 'light', text: 'Force Dark Text (Light Theme)' }
                  ]
                })
              ]
            },
            {
              groupName: strings.HighlightsGroupName,
              groupFields: [
                PropertyPaneToggle('showHighlights', {
                  label: strings.ShowHighlightsFieldLabel
                }),
                PropertyPaneTextField('highlight1Text', {
                  label: strings.Highlight1FieldLabel,
                  placeholder: 'Support Our Community',
                  disabled: !this.properties.showHighlights
                }),
                PropertyPaneTextField('highlight2Text', {
                  label: strings.Highlight2FieldLabel,
                  placeholder: 'Empower Young People',
                  disabled: !this.properties.showHighlights
                }),
                PropertyPaneTextField('highlight3Text', {
                  label: strings.Highlight3FieldLabel,
                  placeholder: 'Make a Lasting Impact',
                  disabled: !this.properties.showHighlights
                })
              ]
            },
            {
              groupName: strings.CtaGroupName,
              groupFields: [
                PropertyPaneToggle('showCta', {
                  label: strings.ShowCtaFieldLabel
                }),
                PropertyPaneTextField('ctaText', {
                  label: strings.CtaTextFieldLabel,
                  disabled: !this.properties.showCta
                }),
                PropertyPaneTextField('ctaUrl', {
                  label: strings.CtaUrlFieldLabel,
                  disabled: !this.properties.showCta
                }),
                PropertyPaneToggle('ctaOpenInNewTab', {
                  label: strings.CtaOpenInNewTabFieldLabel,
                  disabled: !this.properties.showCta
                }),
                PropertyPaneToggle('showSecondaryCta', {
                  label: strings.ShowSecondaryCtaFieldLabel,
                  disabled: !this.properties.showCta
                }),
                PropertyPaneTextField('secondaryCtaText', {
                  label: strings.SecondaryCtaTextFieldLabel,
                  disabled: !this.properties.showCta || !this.properties.showSecondaryCta
                }),
                PropertyPaneTextField('secondaryCtaUrl', {
                  label: strings.SecondaryCtaUrlFieldLabel,
                  disabled: !this.properties.showCta || !this.properties.showSecondaryCta
                }),
                PropertyPaneToggle('secondaryCtaOpenInNewTab', {
                  label: strings.SecondaryCtaOpenInNewTabFieldLabel,
                  disabled: !this.properties.showCta || !this.properties.showSecondaryCta
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
