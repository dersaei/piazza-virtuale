// app/note-legali/page.tsx
import Link from "next/link";
import styles from "@/styles/LegalPage.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Note Legali | Piazza Virtuale",
  description:
    "Note legali e informazioni sul sito Piazza Virtuale - Catalogo degli e-shop dei produttori italiani",
};

export default function NoteLegaliPage() {
  return (
    <div className={styles.legalPage}>
      <article className={styles.legalContent}>
        <header className={styles.header}>
          <h1>Note Legali</h1>
          <p className={styles.subtitle}>
            Informazioni legali sul sito Piazza Virtuale
            <br />
            ai sensi dell&rsquo;art. 7 del D.Lgs. 70/2003
          </p>
          <p className={styles.lastUpdate}>
            Ultimo aggiornamento: 29 ottobre 2025
          </p>
        </header>

        <section className={styles.section}>
          <h2>1. Informazioni Generali sul Sito</h2>
          <p>
            Il presente sito web è di proprietà e viene gestito da:
            <br />
            <br />
            <strong>Spiżarnia Regio</strong>
            <br />
            Titolare: Bogusław Siemiątkowski
            <br />
            Impresa individuale
            <br />
            ul. Napoleońska 49
            <br />
            06-500 Mława, Polonia
            <br />
            P. IVA EU: PL5691729538
            <br />
            <br />
            Email:{" "}
            <a href="mailto:info@piazzavirtuale.it">info@piazzavirtuale.it</a>
            <br />
            Email questioni legali:{" "}
            <a href="mailto:privacy@piazzavirtuale.it">
              privacy@piazzavirtuale.it
            </a>
            <br />
            Sito web:{" "}
            <a
              href="https://www.piazzavirtuale.it"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.piazzavirtuale.it
            </a>
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Oggetto e Finalità del Sito</h2>
          <p>
            <strong>Piazza Virtuale</strong> è un catalogo informativo che
            raccoglie e presenta gli e-shop ufficiali dei produttori italiani di
            alimenti e bevande che offrono la vendita diretta online ai
            consumatori.
          </p>
          <p>Il sito ha le seguenti finalità:</p>
          <ul>
            <li>
              <strong>Catalogo informativo:</strong> fornire informazioni sugli
              e-shop dei produttori italiani, facilitando ai consumatori la
              scoperta di prodotti artigianali e tradizionali del Made in Italy
            </li>
            <li>
              <strong>Servizi premium per produttori:</strong> offrire servizi
              aggiuntivi a pagamento per i produttori che desiderano una
              maggiore visibilità sul catalogo. Per maggiori informazioni sui
              servizi disponibili, consultare la pagina{" "}
              <Link href="/come-funziona">Come Funziona</Link>
            </li>
            <li>
              <strong>Facilitazione del contatto:</strong> mettere in contatto i
              produttori interessati con il gestore del catalogo attraverso
              moduli di contatto
            </li>
          </ul>
          <p className={styles.highlight}>
            <strong>Importante:</strong> Piazza Virtuale NON effettua vendita
            diretta di prodotti alimentari o bevande. Il sito funge
            esclusivamente da catalogo informativo e punto di collegamento verso
            gli e-shop gestiti autonomamente dai produttori.
          </p>
        </section>

        <section className={styles.section}>
          <h2>3. Proprietà del Dominio</h2>
          <p>
            Il nome di dominio <strong>piazzavirtuale.it</strong> è di proprietà
            di:
            <br />
            <strong>Spiżarnia Regio</strong>
          </p>
          <p>
            Il dominio è registrato presso:
            <br />
            <strong>Ergonet.it</strong>
            <br />
            <a
              href="https://www.ergonet.it"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.ergonet.it
            </a>
          </p>
        </section>

        <section className={styles.section}>
          <h2>4. Diritti di Proprietà Intellettuale</h2>

          <h3>Contenuti di proprietà di Piazza Virtuale</h3>
          <p>
            Tutti i contenuti presenti sul sito Piazza Virtuale, inclusi ma non
            limitati a:
          </p>
          <ul>
            <li>Testi e descrizioni</li>
            <li>
              Logo e identità visiva di Piazza Virtuale (esclusi i logo dei
              produttori)
            </li>
            <li>Codice sorgente del sito web</li>
            <li>Grafica e layout</li>
            <li>Struttura e organizzazione dei contenuti</li>
          </ul>
          <p>
            sono di esclusiva proprietà di{" "}
            <strong>Bogusław Siemiątkowski - Spiżarnia Regio</strong> e sono
            protetti dalle leggi italiane ed internazionali sul diritto
            d&rsquo;autore e sulla proprietà intellettuale.
          </p>

          <h3>Contenuti di terze parti (produttori)</h3>
          <p>
            I loghi, i marchi, le denominazioni commerciali e altri contenuti
            distintivi dei produttori presenti nel catalogo rimangono di
            esclusiva proprietà dei rispettivi titolari. Piazza Virtuale non
            rivendica alcun diritto su tali contenuti, che vengono utilizzati
            esclusivamente per finalità informative e con il consenso dei
            produttori stessi.
          </p>

          <h3>Utilizzo dei contenuti</h3>
          <p>È consentito agli utenti:</p>
          <ul>
            <li>
              <strong>Copiare e citare i contenuti</strong> presenti sul sito,
              purché venga chiaramente indicata la fonte e l&rsquo;autore:
              &ldquo;Piazza Virtuale - www.piazzavirtuale.it&rdquo;
            </li>
            <li>
              <strong>Utilizzare il logo di Piazza Virtuale</strong> in contesti
              informativi, purché non venga alterato e sia accompagnato da un
              link al sito
            </li>
            <li>
              <strong>Creare link</strong> verso qualsiasi pagina del sito senza
              necessità di autorizzazione preventiva
            </li>
          </ul>

          <p>
            <strong>È vietato:</strong>
          </p>
          <ul>
            <li>
              Utilizzare i contenuti del sito per scopi commerciali senza
              espressa autorizzazione scritta
            </li>
            <li>
              Modificare, alterare o creare opere derivate dai contenuti senza
              autorizzazione
            </li>
            <li>
              Rimuovere o modificare eventuali indicazioni di copyright, marchio
              o altre note di proprietà
            </li>
            <li>
              Utilizzare tecniche di web scraping automatizzato o bot per
              estrarre massivamente dati dal sito
            </li>
            <li>
              Riprodurre, distribuire o rendere disponibile il codice sorgente
              del sito
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>5. Responsabilità sui Contenuti</h2>

          <h3>Contenuti editoriali</h3>
          <p>
            I contenuti editoriali del sito (descrizioni generali, testi
            informativi, struttura del catalogo) sono redatti e gestiti
            direttamente da{" "}
            <strong>Bogusław Siemiątkowski - Spiżarnia Regio</strong>, che si
            assume la piena responsabilità della loro accuratezza e legittimità.
          </p>

          <h3>Informazioni sui produttori</h3>
          <p>
            Le informazioni specifiche sui singoli produttori presenti nel
            catalogo possono provenire da due fonti:
          </p>
          <ul>
            <li>
              <strong>Informazioni raccolte direttamente:</strong> quando le
              informazioni sono state raccolte e verificate dal gestore del
              sito, Piazza Virtuale si assume la responsabilità della loro
              accuratezza
            </li>
            <li>
              <strong>Informazioni fornite dai produttori:</strong> quando le
              informazioni sono state inviate direttamente dai produttori
              attraverso i moduli di contatto o altre comunicazioni, la
              responsabilità dell&rsquo;accuratezza e della legittimità di tali
              informazioni ricade sui produttori stessi
            </li>
          </ul>

          <h3>Link esterni</h3>
          <p>
            Il sito contiene link verso i siti web e gli e-shop dei produttori
            presenti nel catalogo. La responsabilità sui contenuti, sulla
            disponibilità e sul funzionamento di tali siti esterni è
            esclusivamente dei rispettivi proprietari.
          </p>
          <p>Piazza Virtuale non può essere ritenuta responsabile per:</p>
          <ul>
            <li>
              Contenuti, informazioni, prodotti o servizi offerti sui siti
              esterni linkati
            </li>
            <li>
              Disponibilità o funzionamento dei siti esterni e degli e-shop dei
              produttori
            </li>
            <li>
              Eventuali danni o perdite derivanti dall&rsquo;utilizzo dei siti
              esterni
            </li>
            <li>Pratiche di privacy e sicurezza adottate dai siti esterni</li>
          </ul>

          <p>
            I link verso i siti esterni sono forniti esclusivamente per comodità
            degli utenti. La presenza di un link non implica approvazione o
            raccomandazione da parte di Piazza Virtuale.
          </p>
        </section>

        <section className={styles.section}>
          <h2>6. Limitazione di Responsabilità</h2>
          <p>
            Piazza Virtuale si impegna a mantenere le informazioni presenti sul
            sito accurate e aggiornate, tuttavia non può garantire la
            completezza, l&rsquo;accuratezza o l&rsquo;attualità di tutte le
            informazioni in ogni momento.
          </p>
          <p>Il gestore del sito non si assume alcuna responsabilità per:</p>
          <ul>
            <li>
              Eventuali errori, omissioni o imprecisioni presenti nelle
              informazioni pubblicate
            </li>
            <li>
              Interruzioni temporanee del servizio dovute a manutenzione
              tecnica, problemi di connettività o altre cause
            </li>
            <li>
              Danni diretti o indiretti derivanti dall&rsquo;utilizzo o
              dall&rsquo;impossibilità di utilizzare il sito
            </li>
            <li>
              Modifiche o cessazione dei servizi offerti dai produttori presenti
              nel catalogo
            </li>
            <li>
              Perdite economiche, danni commerciali o altri pregiudizi derivanti
              dall&rsquo;utilizzo delle informazioni presenti sul sito
            </li>
          </ul>

          <p className={styles.highlight}>
            L&rsquo;utilizzo del sito Piazza Virtuale e delle informazioni in
            esso contenute avviene sotto la piena responsabilità
            dell&rsquo;utente.
          </p>
        </section>

        <section className={styles.section}>
          <h2>7. Servizi Premium e Condizioni Commerciali</h2>
          <p>
            Piazza Virtuale offre servizi premium a pagamento per i produttori
            che desiderano ottenere una maggiore visibilità all&rsquo;interno
            del catalogo.
          </p>
          <p>
            Per informazioni dettagliate sui servizi disponibili, le
            caratteristiche e le modalità di adesione, si rimanda alla pagina
            dedicata: <Link href="/come-funziona">Come Funziona</Link>
          </p>

          <h3>Modalità di pagamento</h3>
          <p>
            I pagamenti per i servizi premium{" "}
            <strong>NON avvengono direttamente sul sito</strong> Piazza
            Virtuale. Le transazioni economiche vengono gestite attraverso
            modalità concordate direttamente con i produttori (bonifico
            bancario, fatturazione, o altri metodi concordati).
          </p>
          <p>
            Non essendoci elaborazione di pagamenti online sul sito, Piazza
            Virtuale non gestisce né memorizza informazioni relative a carte di
            credito, conti bancari o altri dati finanziari degli utenti.
          </p>

          <h3>Fatturazione</h3>
          <p>
            Per ogni servizio a pagamento erogato, Spiżarnia Regio emetterà
            regolare fattura nel rispetto della normativa fiscale italiana e
            polacca applicabile.
          </p>
        </section>

        <section className={styles.section}>
          <h2>8. Obblighi degli Utenti</h2>
          <p>Gli utenti del sito si impegnano a:</p>
          <ul>
            <li>
              Utilizzare il sito in modo lecito e nel rispetto delle presenti
              Note Legali
            </li>
            <li>Non utilizzare il sito per scopi illegali o non autorizzati</li>
            <li>
              Non interferire con il funzionamento del sito o compromettere la
              sicurezza dello stesso
            </li>
            <li>
              Non utilizzare bot, spider, scraper o altri strumenti
              automatizzati per accedere o estrarre dati dal sito senza
              autorizzazione
            </li>
            <li>
              Fornire informazioni veritiere e accurate quando utilizzano i
              moduli di contatto
            </li>
            <li>
              Rispettare i diritti di proprietà intellettuale di Piazza Virtuale
              e dei terzi
            </li>
          </ul>
          <p>
            Il mancato rispetto di questi obblighi può comportare la sospensione
            o la terminazione dell&rsquo;accesso al sito e, nei casi più gravi,
            azioni legali.
          </p>
        </section>

        <section className={styles.section}>
          <h2>9. Privacy e Protezione dei Dati Personali</h2>
          <p>
            Il trattamento dei dati personali degli utenti avviene nel rispetto
            del Regolamento (UE) 2016/679 (GDPR) e della normativa italiana
            applicabile.
          </p>
          <p>
            Per informazioni dettagliate su come vengono raccolti, utilizzati e
            protetti i dati personali, consultare la nostra{" "}
            <Link href="/informativa-privacy">Informativa Privacy</Link>.
          </p>
          <p>
            Per informazioni sull&rsquo;utilizzo dei cookie e tecnologie
            similari, consultare la nostra{" "}
            <Link href="/informativa-cookie">Informativa Cookie</Link>.
          </p>
        </section>

        <section className={styles.section}>
          <h2>10. Modifiche al Sito e alle Note Legali</h2>
          <p>Piazza Virtuale si riserva il diritto di:</p>
          <ul>
            <li>
              Modificare, sospendere o interrompere, in qualsiasi momento e
              senza preavviso, qualsiasi aspetto o funzionalità del sito
            </li>
            <li>
              Modificare o aggiornare le presenti Note Legali in qualsiasi
              momento
            </li>
            <li>
              Modificare o cessare i servizi offerti, inclusi i servizi premium
            </li>
          </ul>
          <p>
            Le modifiche alle Note Legali saranno pubblicate su questa pagina
            con l&rsquo;indicazione della data di ultimo aggiornamento.
            L&rsquo;utilizzo continuato del sito dopo la pubblicazione delle
            modifiche costituisce accettazione delle nuove condizioni.
          </p>
          <p>
            Si consiglia agli utenti di consultare periodicamente questa pagina
            per prendere visione di eventuali aggiornamenti.
          </p>
        </section>

        <section className={styles.section}>
          <h2>11. Legge Applicabile e Foro Competente</h2>

          <h3>Legge applicabile</h3>
          <p>
            Le presenti Note Legali e l&rsquo;utilizzo del sito Piazza Virtuale
            sono regolati dalla <strong>legge italiana</strong>, in conformità
            con le normative dell&rsquo;Unione Europea applicabili, in
            particolare:
          </p>
          <ul>
            <li>
              Regolamento (UE) 2016/679 (GDPR) per la protezione dei dati
              personali
            </li>
            <li>
              Decreto Legislativo 30 giugno 2003, n. 196 (Codice Privacy) come
              modificato dal D.Lgs. 101/2018
            </li>
            <li>
              Decreto Legislativo 9 aprile 2003, n. 70 (Commercio elettronico)
            </li>
            <li>Codice del Consumo (D.Lgs. 206/2005)</li>
            <li>Legge 633/1941 sul diritto d&rsquo;autore</li>
          </ul>

          <h3>Foro competente</h3>
          <p>
            Per qualsiasi controversia relativa all&rsquo;interpretazione,
            esecuzione o validità delle presenti Note Legali o
            all&rsquo;utilizzo del sito, sarà esclusivamente competente il Foro
            di <strong>Mława, Polonia</strong>, salvo quanto diversamente
            previsto da norme imperative di legge.
          </p>
          <p>
            <strong>Per i consumatori:</strong> Fermo restando quanto sopra, i
            consumatori (persone fisiche che agiscono per scopi estranei
            all&rsquo;attività imprenditoriale, commerciale, artigianale o
            professionale eventualmente svolta) mantengono i diritti previsti
            dalle norme imperative di tutela dei consumatori, inclusa la
            possibilità di adire il foro del proprio luogo di residenza o
            domicilio per determinate controversie.
          </p>
        </section>

        <section className={styles.section}>
          <h2>12. Risoluzione Alternativa delle Controversie (ADR/ODR)</h2>

          <h3>Risoluzione alternativa delle controversie (ADR)</h3>
          <p>
            In caso di controversie con i consumatori, prima di adire
            l&rsquo;autorità giudiziaria, le parti possono avvalersi di
            organismi di risoluzione alternativa delle controversie (ADR -
            Alternative Dispute Resolution).
          </p>

          <h3>Piattaforma ODR europea</h3>
          <p>
            Ai sensi del Regolamento (UE) n. 524/2013, si informa che la
            Commissione Europea ha istituito una piattaforma online per la
            risoluzione delle controversie (ODR - Online Dispute Resolution)
            accessibile al seguente indirizzo:
          </p>
          <p>
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://ec.europa.eu/consumers/odr
            </a>
          </p>
          <p>
            La piattaforma ODR può essere utilizzata dai consumatori residenti
            nell&rsquo;Unione Europea per la risoluzione extragiudiziale delle
            controversie relative a obbligazioni contrattuali derivanti da
            contratti di vendita o di servizi online.
          </p>
          <p>
            <strong>Nota:</strong> Dato che Piazza Virtuale opera principalmente
            come catalogo informativo e non effettua vendite dirette di
            prodotti, l&rsquo;utilizzo della piattaforma ODR potrebbe non essere
            applicabile in molti casi. Tuttavia, l&rsquo;informazione viene
            fornita in conformità agli obblighi di legge.
          </p>
        </section>

        <section className={styles.section}>
          <h2>13. Segnalazioni e Reclami</h2>

          <h3>Contenuti illeciti o violazione di diritti</h3>
          <p>
            Se ritieni che sul sito Piazza Virtuale siano presenti contenuti
            illeciti, diffamatori, che violino diritti di terzi o che siano in
            altro modo inappropriati, ti invitiamo a segnalarcelo immediatamente
            inviando una comunicazione dettagliata a:
          </p>
          <p>
            Email:{" "}
            <a href="mailto:privacy@piazzavirtuale.it">
              privacy@piazzavirtuale.it
            </a>
          </p>
          <p>La segnalazione deve contenere:</p>
          <ul>
            <li>I tuoi dati identificativi completi</li>
            <li>
              Indicazione precisa del contenuto oggetto della segnalazione (URL
              della pagina)
            </li>
            <li>
              Motivazione dettagliata della segnalazione e indicazione dei
              diritti presumibilmente violati
            </li>
            <li>Eventuale documentazione a supporto della richiesta</li>
          </ul>
          <p>
            Esamineremo tempestivamente ogni segnalazione ricevuta e, qualora
            fossero riscontrate effettive violazioni, adotteremo le misure
            appropriate, inclusa la rimozione dei contenuti illeciti.
          </p>

          <h3>Reclami generali</h3>
          <p>
            Per qualsiasi altro reclamo o richiesta di chiarimento relativo al
            funzionamento del sito o ai servizi offerti, è possibile contattarci
            a:
          </p>
          <p>
            Email:{" "}
            <a href="mailto:info@piazzavirtuale.it">info@piazzavirtuale.it</a>
          </p>
        </section>

        <section className={styles.section}>
          <h2>14. Clausola di Salvaguardia</h2>
          <p>
            Qualora una o più disposizioni delle presenti Note Legali fossero
            ritenute invalide, illegali o inapplicabili, la validità, la
            legalità e l&rsquo;applicabilità delle restanti disposizioni non
            saranno in alcun modo pregiudicate o compromesse.
          </p>
          <p>
            Le disposizioni invalide, illegali o inapplicabili saranno
            sostituite da disposizioni valide, legali e applicabili che si
            avvicinino il più possibile all&rsquo;intento economico e giuridico
            della disposizione originaria.
          </p>
        </section>

        <section className={styles.section}>
          <h2>15. Contatti</h2>
          <p>
            Per qualsiasi domanda, chiarimento o comunicazione relativa alle
            presenti Note Legali o al sito Piazza Virtuale, è possibile
            contattare:
          </p>
          <p>
            <strong>Spiżarnia Regio</strong>
            <br />
            Titolare: Bogusław Siemiątkowski
            <br />
            ul. Napoleońska 49
            <br />
            06-500 Mława, Polonia
            <br />
            P. IVA EU: PL5691729538
            <br />
            <br />
            Email generale:{" "}
            <a href="mailto:info@piazzavirtuale.it">info@piazzavirtuale.it</a>
            <br />
            Email questioni legali:{" "}
            <a href="mailto:privacy@piazzavirtuale.it">
              privacy@piazzavirtuale.it
            </a>
            <br />
            Email privacy:{" "}
            <a href="mailto:privacy@piazzavirtuale.it">
              privacy@piazzavirtuale.it
            </a>
          </p>
        </section>

        <section className={styles.section}>
          <h2>16. Accettazione delle Note Legali</h2>
          <p>
            L&rsquo;accesso e l&rsquo;utilizzo del sito Piazza Virtuale
            costituiscono accettazione incondizionata delle presenti Note Legali
            e di tutte le condizioni qui contenute.
          </p>
          <p>
            Se non accetti in toto le presenti Note Legali, ti preghiamo di non
            utilizzare questo sito.
          </p>
          <p>
            Per informazioni complete sul trattamento dei dati personali,
            consulta la nostra{" "}
            <Link href="/informativa-privacy">Informativa Privacy</Link>. Per
            informazioni sull&rsquo;utilizzo dei cookie, consulta la nostra{" "}
            <Link href="/informativa-cookie">Informativa Cookie</Link>.
          </p>
        </section>
      </article>
    </div>
  );
}
