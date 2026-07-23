interface CautionNoticeProps {
  text: string;
}

export default function CautionNotice({ text }: CautionNoticeProps) {
  return (
    <div className="bg-surface-muted rounded-lg p-4 border border-border">
      <p className="text-[10px] tracking-[0.2em] uppercase text-foreground-muted mb-2">
        Caution
      </p>
      <p className="text-xs text-foreground-muted leading-relaxed">{text}</p>
    </div>
  );
}
