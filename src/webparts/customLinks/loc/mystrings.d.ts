declare interface ICustomLinksWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppLocalEnvironmentOffice: string;
  AppLocalEnvironmentOutlook: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  AppOfficeEnvironment: string;
  AppOutlookEnvironment: string;
  UnknownEnvironment: string;
  DisplayGroupName: string;
  LayoutFieldLabel: string;
  OpenInNewTabFieldLabel: string;
  TitleFieldLabel: string;
  TilesGroup1Name: string;
  TilesGroup2Name: string;
  AdvancedGroupName: string;
  UseCustomJsonFieldLabel: string;
  CustomJsonFieldLabel: string;
}

declare module 'CustomLinksWebPartStrings' {
  const strings: ICustomLinksWebPartStrings;
  export = strings;
}
