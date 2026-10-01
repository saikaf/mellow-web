export default function Footer() {
  return (
    <footer className="footer">
      <a className="brand" href="/">Mellow Web</a>
      <nav aria-label="フッターナビゲーション">
        <a href="/#contact">お問い合わせ</a>
        <a href="/faq">FAQ</a>
        <a href="/terms">制作について / 利用条件</a>
        <a href="/privacy">プライバシーポリシー</a>
        <a href="/legal">特定商取引法に基づく表記</a>
      </nav>
      <small>© {new Date().getFullYear()} Mellow Web</small>
    </footer>
  );
}
