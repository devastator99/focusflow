// src/components/gamification/AvatarRenderer.tsx
import { type AvatarConfig } from "../../types/AvatarConfig";

export const AvatarRenderer = ({ config }: { config: AvatarConfig }) => {
  return (
    <div className="relative w-40 h-40">
      <img
        src={`/avatar/backgrounds/${config.background}`}
        className="absolute w-full h-full"
        alt="background"
      />
      <img
        src={`/avatar/body/${config.body}`}
        className="absolute w-full h-full"
        alt="body"
      />
      <img
        src={`/avatar/hair/${config.hair}`}
        className="absolute w-full h-full"
        alt="hair"
      />
      <img
        src={`/avatar/eyes/${config.eyes}`}
        className="absolute w-full h-full"
        alt="eyes"
      />
      <img
        src={`/avatar/clothes/${config.clothes}`}
        className="absolute w-full h-full"
        alt="clothes"
      />
      <img
        src={`/avatar/accessories/${config.accessory}`}
        className="absolute w-full h-full"
        alt="accessory"
      />
    </div>
  );
};
