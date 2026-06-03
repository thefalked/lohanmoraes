import { tv } from "tailwind-variants";

const splitHeading = tv({
  slots: {
    root: "flex flex-col gap-1",
    line: [
      "font-display font-semibold uppercase tracking-tight text-text-bright",
      "text-display-md lg:text-display-lg",
    ],
    accent: "text-accent stage-glow",
  },
});

export type SplitHeadingViewProps = {
  lines: string[];
  accentIndex?: number;
  className?: string;
};

export function SplitHeadingView({ lines, accentIndex = 0, className }: SplitHeadingViewProps) {
  const styles = splitHeading();

  return (
    <div className={styles.root({ className })}>
      {lines.map((line, index) => (
        <span
          key={`${line}-${index}`}
          data-reveal
          className={styles.line({
            className: index === accentIndex ? styles.accent() : undefined,
          })}
        >
          {line}
        </span>
      ))}
    </div>
  );
}
