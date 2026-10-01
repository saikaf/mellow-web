# Mellow Web

個人店・小規模事業向けWeb制作サービスのポートフォリオサイト。
Next.js App Router互換のTypeScript / React / Tailwind CSS構成です。
このプレビューはSites対応のVinextで配信します。ページとコンポーネントは標準Next.jsでも利用できます。

## ページ
- `/` トップページ
- `/#contact` お問い合わせ（入力・検証・確認表示）
- `/faq` カテゴリ別のよくある質問
- `/contact` 旧URLからトップのお問い合わせへ転送
- `/privacy` プライバシーポリシー
- `/samples/komorebi` 飲食店
- `/samples/nene` 美容室
- `/samples/morinosora` 個人相談サービス
- `/robots.txt` / `/sitemap.xml`
- 不明なURLはカスタム404

## Vercelでの公開
VercelのFramework PresetをNext.jsにし、Build Commandを `next build` に設定します。
Install Commandは `pnpm install --frozen-lockfile` 。Output Directoryはデフォルトの `.next`。
ローカルで標準Next.jsを使う場合は `pnpm exec next dev`、ビルドは `pnpm exec next build`。
`NEXT_PUBLIC_SITE_URL` を実際の公開URLに変更し、canonical・サイトマップを揃えてください。
Sites用のvite.config.tsとbuild/は、Next.jsでの配信では使用しません。

## お問い合わせ送信
初期状態では、入力・確認後にメールアプリを開きます。
宛先は yukimain29@gmail.com。相談内容をmailtoに渡し、利用者がメールアプリで送信します。
サイトから送信完了とは表示しません。メールアプリが未設定の場合や長文には、宛先・本文のコピー操作があります。
送信処理は components/contact-form.tsx に集約。
将来直接送信する場合は、NEXT_PUBLIC_CONTACT_ENDPOINT にJSONのPOSTを受け付けるHTTPSエンドポイントを設定し再ビルドします。
受付先サーバーで入力検証・送信制限・スパム対策・メール配信を設定してください。秘密鍵は公開環境変数に入れないでください。
メールアドレスは初期HTMLに直接掲載せず、確認後の操作で宛先を案内します。公開クライアントのため完全な秘匿ではありません。

## 運営情報
app/legal/page.tsx の事業者氏名・所在地・電話番号は「設定が必要」です。
修正回数・キャンセル精算・納品データの扱いはご依頼確定前に見積もりで合意する方針。
実際の運用開始前に情報と取引条件を設定してください。

## 写真
public/images/ の3枚は、このサイト向けに生成した架空の店舗イメージで、外部の写真素材は使っていません。
同名のWebPを差し替えると反映されます。差し替え時はaltも更新してください。
3つのサンプルの店名、料金、プロフィールは架空。実際の予約・問い合わせは受け付けません。
SEOのサンプルページはnoindexで、サイトマップからも除外しています。

## 表示
スマートフォン・タブレット・PCの各ブレークポイントを設定。
カードの大量配置、グラデーション、影、強いアニメーションは使用していません。

問い合わせ先は `lib/contact.ts` または `NEXT_PUBLIC_CONTACT_EMAIL` で変更可能。相談希望時間の選択肢も `lib/contact.ts` で管理。日付は YYYY/MM/DD 形式で、手入力とカレンダー選択に対応。
