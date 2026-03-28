export default function Home() {
  return (
    <main className="flex flex-1 items-center">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-24 sm:px-10 lg:px-12">
        <div className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm tracking-[0.22em] text-stone-300 uppercase">
          Repo przygotowane pod wdrozenie na Vercel
        </div>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-end">
          <div className="space-y-6">
            <p className="text-sm tracking-[0.3em] text-amber-200/80 uppercase">
              SPOKO DOMEK • Mikaszowka
            </p>
            <h1 className="max-w-4xl text-5xl leading-none font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Szkielet projektu jest gotowy na budowę strony obiektu.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-stone-300 sm:text-lg">
              Przeniosłem projekt na Next.js, przygotowałem metadane, zachowałem
              materiały źródłowe i udostępniłem zdjęcia jako publiczne assety.
              Następny krok to złożenie pełnej strony sprzedażowej dla SPOKO
              DOMEK.
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur">
            <p className="text-sm tracking-[0.26em] text-stone-400 uppercase">
              Dostępne dane startowe
            </p>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-stone-200 sm:text-base">
              <li>Nazwa: SPOKO DOMEK</li>
              <li>Lokalizacja: Mikaszówka, ul. Wczasowa 7</li>
              <li>Pojemność: do 8 osób</li>
              <li>Materiały: zdjęcia domku i logo w publicznych assetach</li>
              <li>Kontakt: tel. 780 146 021, anetatrocki@wp.pl</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
