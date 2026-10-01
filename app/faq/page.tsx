import type { Metadata } from "next";
import Header from "../../components/site-header";
import Footer from "../../components/footer";
import ResponsiveCopy from "../../components/responsive-copy";
import { faqGroups, mobileFaqAnswers } from "../../lib/faq";

export const metadata: Metadata = {
  title: "よくある質問",
  description: "制作の進め方、料金・支払い、ドメイン・サーバー、公開後の対応など、Mellow Webへのご依頼前の疑問にお答えします。",
};

export default function FAQ() {
  return <>
    <Header />
    <main id="main" className="section faq faq-page">
      <div className="section-intro">
        <p className="eyebrow">FAQ</p>
        <h1>よくある質問</h1>
        <p>ご依頼の前に気になることを、<br />こちらにまとめました。</p>
        <a className="text-link" href="/#contact">相談する</a>
      </div>
      <div className="faq-groups">
        {faqGroups.map(group => <section className="faq-group" key={group.title}>
          <h2>{group.title}</h2>
          {group.items.map(([question, answer]) => <details key={question} name="mellow-faq">
            <summary>{question}</summary>
            <p><ResponsiveCopy desktop={answer} mobile={mobileFaqAnswers[question] || answer} /></p>
          </details>)}
        </section>)}
      </div>
    </main>
    <Footer />
  </>;
}
