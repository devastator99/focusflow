// src/types/AvatarConfig.ts
export interface AvatarConfig {
  body: string;
  hair: string;
  eyes: string;
  clothes: string;
  accessory: string;
  background: string;
}

export type AvatarPartKey = keyof AvatarConfig;

export interface AvatarPartConfig {
  items: string[];
  label: string;
  icon: string;
  description: string;
}
