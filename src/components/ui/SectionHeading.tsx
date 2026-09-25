interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      {eyebrow && (
        <p className="font-body text-sm font-medium tracking-wide text-pine">{eyebrow}</p>
      )}
      <h2 className="mt-2 font-display text-3xl font-medium text-ink sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 font-body text-base leading-relaxed text-ink-soft">
          {description}
        </p>
      )}
    </div>
  );
}
