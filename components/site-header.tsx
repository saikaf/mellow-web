"use client";
import { useState } from "react";
const links = [["サンプル制作", "/#samples"], ["サービス", "/#service"], ["料金", "/#price"], ["自己紹介", "/#about"], ["FAQ", "/faq"], ["お問い合わせ", "/#contact"]];
export default function Header() {
 const [open, setOpen] = useState(false);
 return <header className="site-header"><a className="brand" href="/">Mellow Web</a>
 <button className="menu-toggle" aria-label={open ? "メニューを閉じる" : "メニューを開く"} aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}><span></span><span></span></button>
 <nav id="main-nav" className={open ? "open" : ""} aria-label="メインナビゲーション">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}</nav></header>;
}
