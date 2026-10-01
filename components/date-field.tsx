"use client";
import ResponsiveCopy from "./responsive-copy";
import { useId, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { ja } from "react-day-picker/locale";
import "react-day-picker/style.css";

function parseDate(value: string) {
  if (!/^\d{4}\/\d{2}\/\d{2}$/.test(value)) return undefined;
  const [year, month, day] = value.split("/").map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1
    && date.getDate() === day ? date : undefined;
}
function formatDate(date: Date) {
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0")].join("/");
}

export default function DateField({ name, label, hint, mobileHint }: {
  name: string; label: string; hint?: string; mobileHint?: string;
}) {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<Date>();
  const selected = parseDate(value);

  return <div className="date-field">
    <label htmlFor={id}>{label}<small>任意</small></label>
    <div className="date-input-row">
      <input ref={input} id={id} name={name} value={value}
        type="text" inputMode="numeric" placeholder="YYYY/MM/DD"
        maxLength={10} autoComplete="off" pattern="[0-9]{4}/[0-9]{2}/[0-9]{2}"
        aria-describedby={`${id}-hint`} onChange={event => {
          const next = event.currentTarget.value;
          setValue(next);
          event.currentTarget.setCustomValidity(next && !parseDate(next)
            ? "有効な日付をYYYY/MM/DD形式で入力してください。" : "");
          const date = parseDate(next);
          if (date) setMonth(date);
        }} />
      <button type="button" className="calendar-toggle"
        aria-label={`${label}のカレンダーを${open ? "閉じる" : "開く"}`}
        aria-expanded={open} aria-controls={`${id}-calendar`}
        onClick={() => setOpen(!open)}>カレンダー</button>
    </div>
    <p id={`${id}-hint`} className="field-hint">{mobileHint ? <ResponsiveCopy desktop={hint} mobile={mobileHint} /> : hint || "YYYY/MM/DD（例：2026/11/30）"}</p>
    {open && <div id={`${id}-calendar`} className="date-calendar"
      onKeyDown={event => {
        if (event.key === "Escape") { setOpen(false); input.current?.focus(); }
      }}>
      <DayPicker mode="single" locale={ja} selected={selected}
        month={month} onMonthChange={setMonth} autoFocus
        onSelect={date => {
          setValue(date ? formatDate(date) : "");
          input.current?.setCustomValidity("");
          setOpen(false);
          requestAnimationFrame(() => input.current?.focus());
        }} />
      <button type="button" className="text-link" onClick={() => {
        setValue(""); input.current?.setCustomValidity(""); setOpen(false);
        input.current?.focus();
      }}>日付をクリア</button>
    </div>}
  </div>;
}
