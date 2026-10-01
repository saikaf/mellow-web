import type { Metadata } from "next";
import Header from "../../components/site-header";
import Footer from "../../components/footer";
export const metadata: Metadata = { title: "特定商取引法に基づく表記" };
const rows = [
  [
    "屋号",
    "Mellow Web"
  ],
  [
    "事業者氏名 / 運営責任者",
    "設定が必要（実際の運営者情報を入力してください）"
  ],
  [
    "所在地",
    "設定が必要"
  ],
  [
    "電話番号",
    "設定が必要"
  ],
  [
    "お問い合わせ",
    "お問い合わせフォームからメールでご連絡ください。"
  ],
  [
    "サービス料金",
    "ライト15,000円〜、スタンダード30,000円〜。正式な金額と税の扱いはお見積もり時にご案内します。"
  ],
  [
    "料金以外の費用",
    "振込手数料、ドメイン・サーバー・有料素材・外部サービス等の費用が必要な場合は別途ご案内します。"
  ],
  [
    "支払い方法",
    "銀行振込"
  ],
  [
    "支払い時期",
    "正式なお見積もり確定後、制作開始前に50％、公開前に残り50％。少額案件は全額前払いの場合があります。期限と振込先は個別にご案内します。"
  ],
  [
    "サービス提供時期",
    "1ページ2〜3週間、3〜5ページ3〜5週間が目安。正式な予定はご依頼確定前にご案内します。"
  ],
  [
    "キャンセル・返金",
    "着手前・着手後の精算条件は、ご依頼確定前にご案内します。着手後は進行済み作業や購入済み素材等を踏まえて精算します。詳細は制作について / 利用条件をご確認ください。"
  ],
  [
    "動作環境",
    "スマートフォン・タブレット・PCの主要なブラウザーを想定。個別の対応環境は制作範囲に合わせて確認します。"
  ]
];
export default function Legal() { return <><Header/><main id="main" className="legal"><p className="eyebrow">Commercial disclosure</p><h1>特定商取引法に基づく表記</h1><p className="form-notice">運営情報の一部は設定が必要です。このページは準備中の表記です。正式な依頼の受付前に、実際の氏名・所在地・電話番号等を設定します。</p><dl className="legal-table">{rows.map(([label,value]) => <div key={label}><dt>{label}</dt><dd className={value.startsWith("設定が必要") ? "needs-setting" : ""}>{value}</dd></div>)}</dl><p><a href="/#contact">お問い合わせ</a> / <a href="/terms">制作について / 利用条件</a></p></main><Footer/></>; }
