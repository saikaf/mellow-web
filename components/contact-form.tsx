"use client";
import { useRef, useState } from "react";
import ResponsiveCopy from "./responsive-copy";
import DateField from "./date-field";
import { contactRecipient, consultationTimes } from "../lib/contact";

const labels: Record<string, string> = {
  name: "お名前", email: "メールアドレス", business: "店舗名・サービス名",
  publicationDate: "希望公開日（納期）", consultationDate: "相談希望日", consultationTime: "相談希望時間（日本時間）", site: "希望するサイト", budget: "ご予算", message: "相談内容",
};
const fields = [
  ["name", "お名前", true], ["email", "メールアドレス", true],
] as const;

export default function ContactForm() {
  const [review, setReview] = useState<Record<string, string> | null>(null);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [emailOpened, setEmailOpened] = useState(false);
  const reviewHeading = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const optionalRef = useRef<HTMLDetailsElement>(null);
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
  const recipient = contactRecipient;
  const body = review ? [
    "Mellow Webへのホームページ制作のご相談", "",
    ...Object.entries(review)
      .filter(([key]) => key !== "consent")
      .map(([key, value]) => `${labels[key]}：${value || "未入力"}`),
    "", "プライバシーポリシーを確認し、同意しました。",
  ].join("\n\n") : "";

  async function send() {
    if (!endpoint || !review) return;
    setBusy(true);
    setStatus("");
    try {
      const response = await fetch(endpoint, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      });
      if (!response.ok) throw new Error();
      setStatus("お問い合わせを送信しました。内容を確認してメールでご連絡します。");
      setReview(null);
      formRef.current?.reset();
    } catch {
      setStatus("送信できませんでした。時間をおいてもう一度お試しください。");
    } finally { setBusy(false); }
  }

  function openEmail() {
    const subject = `【Mellow Web】ホームページ制作のご相談 / ${review?.name || ""}`;
    const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setEmailOpened(true);
    setStatus("メールアプリで宛先と内容を確認し、送信してください。このサイトからはまだ送信されていません。");
  }

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(`宛先：${recipient}\n\n${body}`);
      setStatus("宛先と相談内容をコピーしました。メールに貼り付けて送信してください。");
    } catch {
      setEmailOpened(true);
      setStatus("自動コピーができませんでした。下の本文を選択してコピーしてください。");
    }
  }

  return <>
    <p className="form-notice">
      {endpoint ? "必要事項をご入力ください。" :
        "入力内容を確認したあと、お使いのメールアプリから送信できます。相談だけでもお気軽にどうぞ。"}
    </p>
    <form ref={formRef} className={review ? "contact-form hidden" : "contact-form"}
      onSubmit={event => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (data.get("website")) return;
        setReview(Object.fromEntries([...data]
          .filter(([key]) => key !== "website")
          .map(([key, value]) => [key, String(value).trim()])));
        setStatus("");
        setEmailOpened(false);
        requestAnimationFrame(() => reviewHeading.current?.focus());
      }}>
      <div className="contact-trap" aria-hidden="true">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      {fields.map(([name, label, required]) => <label key={name}>
        {label}<small>{required ? "必須" : "任意"}</small>
        <input name={name} type={name === "email" ? "email" : "text"}
          required={required} maxLength={200}
          autoComplete={name === "name" ? "name" : name === "email" ? "email" : "off"} />
      </label>)}
      <label className="full">相談内容<small>必須</small>
        <textarea name="message" required rows={6} maxLength={5000}
          placeholder="お店やサービスのこと、掲載したい内容などを教えてください。" />
      </label>
      <details ref={optionalRef} className="full contact-optional"
        onInvalidCapture={() => {
          if (optionalRef.current) optionalRef.current.open = true;
        }}>
        <summary><span className="optional-symbol" aria-hidden="true" />詳しく伝える（任意）</summary>
        <div className="optional-fields">
          <label>店舗名・サービス名<small>任意</small>
            <input name="business" type="text" maxLength={200} autoComplete="off" />
          </label>
      <label>希望するサイト<small>任意</small>
        <select name="site">
          <option value="">未定・相談して決めたい</option>
          <option>1ページのホームページ</option>
          <option>3〜5ページのホームページ</option>
          <option>まだ決まっていない・相談したい</option><option>その他</option>
        </select>
      </label>
      <label>ご予算<small>任意</small><select name="budget">
        <option>相談して決めたい</option><option>15,000〜30,000円程度</option>
        <option>30,000〜50,000円程度</option><option>50,000円以上</option>
      </select></label>
      <div className="full schedule-field">
        <DateField name="publicationDate" label="希望公開日（納期）"
          hint="※ホームページを公開したい日の目安です。未定の場合は空欄で構いません。"
          mobileHint="※公開希望日の目安です。未定なら空欄で大丈夫です。" />
      </div>
      <fieldset className="full consultation-field">
        <legend>相談希望日時 <small>任意</small></legend>
        <p className="field-hint"><ResponsiveCopy desktop="※ホームページの内容・料金・進め方などを事前に相談したい方のみご入力ください。" mobile="※内容や料金を相談したい方のみご入力ください。" /></p>
        <div className="consultation-inputs">
          <DateField name="consultationDate" label="相談希望日" />
          <label>相談希望時間<small>任意</small>
            <select name="consultationTime" defaultValue="">
              <option value="">時間は未定</option>
              {consultationTimes.map(time => <option key={time}>{time}</option>)}
            </select>
            <span className="field-hint">日本時間 / 日時はメールで調整・確定します。</span>
          </label>
        </div>
      </fieldset>
        </div>
      </details>
      <label className="full consent"><input type="checkbox" name="consent"
        required value="同意する" />
        <span><a href="/privacy">プライバシーポリシー</a>を確認し、同意します。</span>
      </label>
      <div className="full"><button className="button" type="submit">入力内容を確認する</button></div>
    </form>
    {review && <div className="form-review">
      <h3 ref={reviewHeading} tabIndex={-1}>入力内容の確認</h3>
      <dl>{Object.entries(review).filter(([key]) => key !== "consent")
        .map(([key, value]) => <div key={key}>
          <dt>{labels[key]}</dt><dd>{value || "未入力"}</dd>
        </div>)}</dl>
      <p>{endpoint ? "こちらの内容で送信します。" :
        "次にメールアプリを開きます。宛先と内容を確認し、メールアプリの送信ボタンを押してください。ご相談だけで契約や料金は発生しません。"}</p>
      <div className="actions">
        <button className="text-link" type="button" onClick={() => {
          setReview(null); setStatus(""); setEmailOpened(false);
          requestAnimationFrame(() => formRef.current?.querySelector<HTMLInputElement>("input[name=name]")?.focus());
        }}>入力に戻る</button>
        <button className="button" type="button" disabled={busy}
          onClick={endpoint ? send : openEmail}>
          {busy ? "送信中…" : endpoint ? "送信する" : "メールを作成する"}
        </button>
      </div>
      {!endpoint && <div className="mail-fallback">
        <p>メールアプリが開かない場合や、長い本文が反映されない場合は、宛先と相談内容をコピーしてGmailなどに貼り付けてください。</p>
        <button className="text-link" type="button" onClick={copyMessage}>宛先と相談内容をコピー</button>
        {emailOpened && <><p>送信先：{recipient}</p>
          <label>コピー用の本文<textarea readOnly rows={8} value={body}
            onFocus={event => event.currentTarget.select()} /></label>
        </>}
      </div>}
    </div>}
    {status && <p role="status" className="form-notice">{status}</p>}
  </>;
}
