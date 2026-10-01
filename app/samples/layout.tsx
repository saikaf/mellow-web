export default function SamplesLayout({ children }: { children: React.ReactNode }) {
  return <>
    <div className="sample-bar" aria-label="サンプルサイトのご案内">
      <span className="sample-bar-desktop">Mellow Web / サンプルサイト — 架空の店舗・サービスです</span>
      <span className="sample-bar-mobile">Mellow Web / SAMPLE</span>
      <a href="/#samples">
        <span className="sample-bar-desktop">← サンプル一覧へ戻る</span>
        <span className="sample-bar-mobile">← 一覧へ戻る</span>
      </a>
    </div>
    <div className="sample-content">{children}</div>
  </>;
}
