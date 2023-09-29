export interface Occurrence {
  id: string;
  createdBy: string;
  type: string;
  comment?: string;
  creationDate: string;
  location: {
    lat: number;
    lng: string;
  };
  image: File;
}
