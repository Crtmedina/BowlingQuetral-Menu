type MenuStructurePositionSelectProps = {
  value: number;
  total: number;
  title: string;
  disabled: boolean;
  className?: string;
  label?: string;
  onChange: (oneBased: number) => void;
};

export function MenuStructurePositionSelect({
  value,
  total,
  title,
  disabled,
  className = "h-8 w-14 rounded-md border border-input bg-background px-1 text-center text-xs tabular-nums shadow-sm",
  label,
  onChange,
}: MenuStructurePositionSelectProps) {
  return (
    <label className={label ? "flex items-center gap-2 text-xs text-muted-foreground" : undefined}>
      {label ? <span className="font-medium">{label}</span> : null}
      <select
        className={className}
        value={String(value)}
        disabled={disabled || total === 0}
        title={title}
        aria-label={title}
        onChange={(e) => {
          const next = Number(e.target.value);
          if (next !== value) onChange(next);
        }}
      >
        {Array.from({ length: total }, (_, i) => (
          <option key={i + 1} value={String(i + 1)}>
            {i + 1}/{total}
          </option>
        ))}
      </select>
    </label>
  );
}
