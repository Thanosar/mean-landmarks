export interface ILandMark {
  objectId: string;
  title: string;
  description: string;
  location: {latitude: number, longitude: number},
  short_info: string;
  url: string;
  order: number;
}
