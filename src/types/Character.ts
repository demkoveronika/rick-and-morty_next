import { Location } from "./Location";

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  origin?: {
    name: string;
    url: string;
  }
  location: {
    name: string,
    url: string,
  };
  locationData: Location | null;
}