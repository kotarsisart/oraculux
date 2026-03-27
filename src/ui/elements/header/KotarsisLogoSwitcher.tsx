import { useRef, useLayoutEffect, useState } from "react";
import "./_kotarsis-logo-switcher.scss";

interface LogoVersion {
  src: string;
  text: string;
  alt?: string;
}

interface LogoSwitcherProps {
  versions: [LogoVersion, LogoVersion];
  height?: number;
  iconSize?: number;
  className?: string;
}

export default function KotarsisLogoSwitcher({
  versions,
  height = 60,
  iconSize = 45,
  className = ""
}: LogoSwitcherProps) {

  const containerRef = useRef<HTMLDivElement>(null);
  const [autoHeight, setAutoHeight] = useState<number | null>(
    height ? height : null
  );

  useLayoutEffect(() => {
    if (height) return;

    const first = containerRef.current?.querySelector(
      ".kts-logo__version--main"
    ) as HTMLElement;

    if (first) {
      setAutoHeight(first.offsetHeight);
    }
  }, [height]);

  return (
    <div
      className={`kts-logo ${className}`}
      ref={containerRef}
      style={{ height: autoHeight || height }}
    >
      <div className="kts-logo__version kts-logo__version--main">
        <img
          src={versions[0].src}
          className="kts-logo__icon"
          style={{ width: iconSize }}
          alt={versions[0].alt || versions[0].text}
        />
        <span className="kts-logo__text">{versions[0].text}</span>
      </div>

      <div className="kts-logo__version kts-logo__version--alt">
        <img
          src={versions[1].src}
          className="kts-logo__icon"
          style={{ width: iconSize }}
          alt={versions[1].alt || versions[1].text}
        />
        <span className="kts-logo__text">{versions[1].text}</span>
      </div>
    </div>
  );
}
