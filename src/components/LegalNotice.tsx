import { useI18n } from '../i18n/context';

export default function LegalNotice({ onBack }: { onBack: () => void }) {
  const { t } = useI18n();
  return (
    <div className="min-h-full bg-gray-950 text-white flex flex-col">
      <header className="pt-8 pb-4 px-4">
        <button
          onClick={onBack}
          className="text-indigo-400 hover:text-indigo-300 text-sm mb-4 flex items-center gap-1 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          ←
        </button>
        <h1 className="text-3xl font-bold">
          Where<span className="text-indigo-400">To</span>Meet — {t.legalNotice}
        </h1>
      </header>

      <main className="flex-1 px-4 pb-12 max-w-2xl">
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-indigo-400 mb-3">{t.legalPublisher}</h2>
          <div className="text-gray-300 space-y-1 text-sm">
            <p><strong>COMUA</strong> (Conception, Machines et Usinage d'Aucamville)</p>
            <p>SARL unipersonnelle au capital de 10 000 €</p>
            <p>2 route du Burgaud, 82600 Aucamville, France</p>
            <p>SIREN : 914 806 468 — SIRET : 914 806 468 00015</p>
            <p>RCS Tarn-et-Garonne</p>
            <p>TVA : FR65 914 806 468</p>
            <p>Email : <a href="mailto:contact@comua.fr" className="text-indigo-400 hover:underline">contact@comua.fr</a></p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-indigo-400 mb-3">{t.legalDirector}</h2>
          <p className="text-gray-300 text-sm">Régis Portalez</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-indigo-400 mb-3">{t.legalHost}</h2>
          <div className="text-gray-300 space-y-1 text-sm">
            <p><strong>GitHub Pages</strong> — GitHub, Inc.</p>
            <p>88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA</p>
            <p>Microsoft Corporation</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-indigo-400 mb-3">{t.legalData}</h2>
          <div className="text-gray-300 space-y-2 text-sm">
            <p>{t.legalDataDesc}</p>
            <p>{t.legalAnalytics}</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-indigo-400 mb-3">{t.legalIP}</h2>
          <p className="text-gray-300 text-sm">{t.legalIPDesc}</p>
        </section>
      </main>
    </div>
  );
}
