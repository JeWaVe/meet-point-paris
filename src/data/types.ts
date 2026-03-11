export interface Station {
  id: string;
  name: string;
  lat: number;
  lng: number;
  lines: string[];
}

export interface Connection {
  from: string;
  to: string;
  time: number; // minutes
}

export interface LineDefinition {
  id: string;
  name: string;
  color: string;
  type: 'metro' | 'rer' | 'tram';
  // Each branch is an ordered array of station IDs
  branches: string[][];
}
