export interface ICircle {
  src: string;
  bsrc: string;
  type: string;
  icon: string;
  position: { x: number; y: number };
  selected: boolean;
}
export interface Images {
  src: string;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
}

export interface Icons {
  type: string;
  src: string;
  background: string;
}
