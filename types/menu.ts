export interface MenuItem {
  id: number;
  name: string;
  to: string | null;
  icon: string;
  action?: () => void;
}
