type BtnVariant = "default" | "outlined" | "tonal";
type BtnSize = "x-small" | "small" | "large" | "x-large";
type BtnType = "submit" | "reset" | "button";
type BtnColor = "default" | "green" | "red" | "amber" | "indigo";

export interface Btn {
  loading?: boolean;
  variant?: BtnVariant;
  size?: BtnSize;
  type?: BtnType;
  color?: BtnColor;
}
