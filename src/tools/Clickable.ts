interface Clickable {
  id(): string;
  onClick(e: MouseEvent): void;
}

export type { Clickable };
