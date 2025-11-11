// app/privacy/page.tsx
import styles from "@/styles/LegalPage.module.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Informativa Privacy | Piazza Virtuale",
  description:
    "Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR)",
  alternates: {
    canonical: "/informativa-privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className={styles.legalPage}>
      <article className={styles.legalContent}>
        <header className={styles.header}>
          <h1>Informativa Privacy</h1>
          <p className={styles.subtitle}>
            Informativa sul trattamento dei dati personali
            <br />
            ai sensi dell&rsquo;art. 13 del Regolamento (UE) 2016/679
          </p>
          <p className={styles.lastUpdate}>
            Ultimo aggiornamento: 29 ottobre 2025
          </p>
        </header>

        <section className={styles.section}>
          <h2>1. Titolare del Trattamento</h2>
          <p>
            Il Titolare del trattamento dei dati personali è:
            <br />
            <br />
            <strong>
              Bogusław Siemiątkowski &ldquo;Spiżarnia Regio&rdquo;
            </strong>
            <br />
            ul. Napoleońska 49
            <br />
            06-500 Mława, Polonia
            <br />
            P. IVA EU: PL5691729538
            <br />
            <br />
            Per questioni relative alla privacy:
            <br />
            Email:{" "}
            <a href="mailto:privacy@piazzavirtuale.it">
              privacy@piazzavirtuale.it
            </a>
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Tipologie di Dati Raccolti</h2>

          <h3>A. Dati di navigazione</h3>
          <p>
            Durante la navigazione sul sito, vengono raccolti automaticamente
            alcuni dati tecnici necessari per il funzionamento del sito. Per
            ottenere informazioni sul comportamento dei visitatori, utilizziamo{" "}
            <a
              href="https://ackee.electerious.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ackee
            </a>
            . Questo software di analisi ci fornisce informazioni sui visitatori
            solo in generale, ma non sui singoli individui, poiché non traccia i
            visitatori e non memorizza alcuna informazione personale
            identificabile.{" "}
            <a
              href="https://docs.ackee.electerious.com/#/docs/Anonymization"
              target="_blank"
              rel="noopener noreferrer"
            >
              Consulta la loro documentazione
            </a>{" "}
            per scoprire quali dati raccoglie Ackee.
          </p>

          <h3>B. Dati forniti volontariamente</h3>
          <p>
            Attraverso i moduli di contatto presenti sul sito, gli utenti
            possono fornire volontariamente i seguenti dati:
          </p>
          <ul>
            <li>Nome e cognome</li>
            <li>Indirizzo email</li>
            <li>Numero di telefono (se fornito)</li>
            <li>Contenuto del messaggio</li>
            <li>Altri dati eventualmente inseriti nel modulo</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>3. Finalità del Trattamento e Base Giuridica</h2>
          <p>I dati personali vengono trattati per le seguenti finalità:</p>

          <div className={styles.table}>
            <table>
              <thead>
                <tr>
                  <th>Finalità</th>
                  <th>Base Giuridica (Art. 6 GDPR)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Rispondere alle richieste di contatto</td>
                  <td>
                    Esecuzione di misure precontrattuali su richiesta
                    dell&rsquo;interessato (art. 6.1.b GDPR)
                  </td>
                </tr>
                <tr>
                  <td>Gestione comunicazioni e rapporti con gli utenti</td>
                  <td>Legittimo interesse del Titolare (art. 6.1.f GDPR)</td>
                </tr>
                <tr>
                  <td>Sicurezza e integrità del sito web</td>
                  <td>Legittimo interesse del Titolare (art. 6.1.f GDPR)</td>
                </tr>
                <tr>
                  <td>
                    Analisi statistiche anonime sul traffico del sito (Ackee)
                  </td>
                  <td>Legittimo interesse del Titolare (art. 6.1.f GDPR)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.section}>
          <h2>4. Modalità di Trattamento</h2>
          <p>
            I dati personali sono trattati con strumenti informatici e
            telematici, con logiche strettamente correlate alle finalità
            indicate e, comunque, in modo da garantire la sicurezza e la
            riservatezza dei dati stessi.
          </p>
          <p>
            Il trattamento viene effettuato dal Titolare e, ove necessario, da
            persone autorizzate dal Titolare stesso, istruite e vincolate a
            norme di riservatezza.
          </p>
        </section>

        <section className={styles.section}>
          <h2>5. Destinatari dei Dati</h2>
          <p>
            I dati personali possono essere comunicati ai seguenti destinatari,
            che agiscono in qualità di responsabili del trattamento:
          </p>

          <h3>Provider di hosting</h3>
          <p>
            <a href="https://webh.pl" target="_blank" rel="noopener noreferrer">
              <strong>Ultimahost.pl Szeliga sp.j.</strong>
            </a>
            <br />
            ul. Piotrkowska 148/150
            <br />
            90-063 Łódź, Polonia
          </p>

          <h3>Servizi email</h3>
          <p>
            Per la gestione delle comunicazioni email utilizziamo:
            <br />-{" "}
            <a href="https://lh.pl" target="_blank" rel="noopener noreferrer">
              <strong>Lh.pl</strong>
            </a>{" "}
            (hosting casella email)
            <br />-{" "}
            <a
              href="https://improvmx.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>ImprovMX</strong>
            </a>{" "}
            (inoltro email per il dominio)
            <br />-{" "}
            <a
              href="https://ergonet.it"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Ergonet.it</strong>
            </a>{" "}
            (servizi per il dominio)
          </p>

          <h3>Sistema di gestione contenuti (CMS)</h3>
          <p>
            <a
              href="https://directus.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Directus CMS</strong>
            </a>{" "}
            - utilizzato per la memorizzazione e gestione dei dati inviati
            tramite moduli di contatto.
          </p>

          <h3>Software di analisi</h3>
          <p>
            <strong>Ackee Analytics</strong> - per analisi statistiche anonime
            del traffico web, senza tracciamento individuale degli utenti.
          </p>

          <p className={styles.highlight}>
            I dati personali NON vengono venduti, affittati o ceduti a terzi per
            finalità commerciali o di marketing.
          </p>
        </section>

        <section className={styles.section}>
          <h2>6. Trasferimento Dati Extra-UE</h2>
          <p>
            Tutti i fornitori di servizi utilizzati hanno sede nell&rsquo;Unione
            Europea o in Polonia. I dati personali sono conservati
            esclusivamente all&rsquo;interno del territorio dell&rsquo;UE.
          </p>
          <p>
            Nel caso in cui alcuni servizi dovessero trasferire dati al di fuori
            dell&rsquo;UE, tale trasferimento avverrà sulla base di una
            Decisione di Adeguatezza della Commissione Europea o tramite
            Standard Contractual Clauses approvate.
          </p>
        </section>

        <section className={styles.section}>
          <h2>7. Durata della Conservazione</h2>
          <p>
            I dati personali vengono conservati per il tempo strettamente
            necessario al conseguimento delle finalità per cui sono stati
            raccolti:
          </p>
          <ul>
            <li>
              <strong>Dati di navigazione (Ackee):</strong> 30 giorni in forma
              anonimizzata
            </li>
            <li>
              <strong>Richieste di contatto:</strong> fino a 24 mesi dalla
              ricezione della richiesta, salvo ulteriori obblighi di legge
            </li>
            <li>
              <strong>Comunicazioni continuative:</strong> fino alla cessazione
              del rapporto o fino a revoca del consenso
            </li>
          </ul>
          <p>
            Decorsi tali termini, i dati saranno cancellati o resi anonimi in
            modo irreversibile, salvo che la loro ulteriore conservazione sia
            necessaria per adempiere a un obbligo di legge o per accertare,
            esercitare o difendere un diritto in sede giudiziaria.
          </p>
        </section>

        <section className={styles.section}>
          <h2>8. Diritti dell&rsquo;Interessato</h2>
          <p>
            In qualità di interessato, hai il diritto di esercitare i seguenti
            diritti nei confronti del Titolare del trattamento, ai sensi degli
            articoli 15-22 del GDPR:
          </p>
          <ul>
            <li>
              <strong>Diritto di accesso (art. 15):</strong> ottenere conferma
              che sia o meno in corso un trattamento dei tuoi dati personali e,
              in tal caso, ottenere l&rsquo;accesso ai dati e alle informazioni
              relative al trattamento
            </li>
            <li>
              <strong>Diritto di rettifica (art. 16):</strong> ottenere la
              rettifica dei dati personali inesatti o l&rsquo;integrazione dei
              dati incompleti
            </li>
            <li>
              <strong>Diritto alla cancellazione (art. 17):</strong> ottenere la
              cancellazione dei dati personali (&ldquo;diritto
              all&rsquo;oblio&rdquo;) quando ricorrono determinate condizioni
            </li>
            <li>
              <strong>Diritto di limitazione (art. 18):</strong> ottenere la
              limitazione del trattamento quando ricorrono determinate
              condizioni
            </li>
            <li>
              <strong>Diritto alla portabilità (art. 20):</strong> ricevere i
              dati personali in un formato strutturato, di uso comune e
              leggibile da dispositivo automatico, e trasmetterli a un altro
              titolare del trattamento
            </li>
            <li>
              <strong>Diritto di opposizione (art. 21):</strong> opporsi in
              qualsiasi momento al trattamento dei dati personali per motivi
              connessi alla tua situazione particolare
            </li>
            <li>
              <strong>Diritto di revoca del consenso:</strong> revocare il
              consenso in qualsiasi momento, senza pregiudicare la liceità del
              trattamento basata sul consenso prima della revoca
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>9. Come Esercitare i Diritti</h2>
          <p>
            Per esercitare i diritti di cui sopra, puoi contattare il Titolare
            del trattamento tramite:
          </p>
          <ul>
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:privacy@piazzavirtuale.it">
                privacy@piazzavirtuale.it
              </a>
            </li>
            <li>
              <strong>Posta ordinaria:</strong>
              <br />
              Bogusław Siemiątkowski &ldquo;Spiżarnia Regio&rdquo;
              <br />
              ul. Napoleońska 49
              <br />
              06-500 Mława, Polonia
            </li>
          </ul>
          <p>
            Il Titolare risponderà alla tua richiesta entro 30 giorni dalla
            ricezione. In caso di richieste complesse o numerose, tale termine
            può essere prorogato di ulteriori 60 giorni, dandotene tempestiva
            comunicazione.
          </p>
        </section>

        <section className={styles.section}>
          <h2>10. Diritto di Reclamo</h2>
          <p>
            Fermo restando ogni altro ricorso amministrativo o giurisdizionale,
            hai il diritto di proporre reclamo all&rsquo;autorità di controllo
            competente qualora ritenga che il trattamento dei tuoi dati
            personali violi il Regolamento (UE) 2016/679.
          </p>
          <p>
            L&rsquo;autorità di controllo italiana è:
            <br />
            <br />
            <strong>Garante per la Protezione dei Dati Personali</strong>
            <br />
            Piazza Venezia n. 11
            <br />
            00187 Roma, Italia
            <br />
            Tel: +39 06.696771
            <br />
            Email: <a href="mailto:garante@gpdp.it">garante@gpdp.it</a>
            <br />
            PEC:{" "}
            <a href="mailto:protocollo@pec.gpdp.it">protocollo@pec.gpdp.it</a>
            <br />
            Sito web:{" "}
            <a
              href="https://www.garanteprivacy.it"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.garanteprivacy.it
            </a>
          </p>
        </section>

        <section className={styles.section}>
          <h2>11. Sicurezza dei Dati</h2>
          <p>
            Il Titolare adotta misure tecniche e organizzative adeguate a
            garantire un livello di sicurezza appropriato al rischio, tra cui:
          </p>
          <ul>
            <li>Connessione protetta HTTPS/SSL per la trasmissione dei dati</li>
            <li>
              Sistemi di protezione firewall e antivirus costantemente
              aggiornati
            </li>
            <li>
              Accesso ai dati personali limitato esclusivamente al personale
              autorizzato
            </li>
            <li>Backup regolari e cifrati dei dati</li>
            <li>
              Procedure di gestione delle violazioni dei dati personali (data
              breach)
            </li>
          </ul>
          <p>
            In caso di violazione dei dati personali che presenti un rischio per
            i diritti e le libertà degli interessati, il Titolare provvederà a
            notificare la violazione all&rsquo;autorità di controllo entro 72
            ore e, se del caso, a comunicarla agli interessati coinvolti.
          </p>
        </section>

        <section className={styles.section}>
          <h2>12. Cookie Policy</h2>
          <p>
            Per informazioni dettagliate sull&rsquo;utilizzo dei cookie e delle
            tecnologie di tracciamento sul presente sito web, si prega di
            consultare la nostra{" "}
            <Link href="/informativa-cookie">Cookie Policy</Link>.
          </p>
        </section>

        <section className={styles.section}>
          <h2>13. Modifiche alla Privacy Policy</h2>
          <p>
            Il Titolare si riserva il diritto di modificare, aggiornare o
            integrare la presente Informativa Privacy in qualsiasi momento. Le
            modifiche saranno pubblicate su questa pagina e, ove richiesto dalla
            normativa applicabile, saranno portate a tua conoscenza attraverso
            comunicazioni dirette o banner informativi sul sito.
          </p>
          <p>
            Ti invitiamo a visitare periodicamente questa pagina per prendere
            visione della versione più aggiornata dell&rsquo;Informativa
            Privacy. La data di &ldquo;Ultimo aggiornamento&rdquo; riportata in
            cima al documento indica quando l&rsquo;Informativa è stata
            modificata per l&rsquo;ultima volta.
          </p>
        </section>

        <section className={styles.section}>
          <h2>14. Informazioni di Contatto</h2>
          <p>
            Per qualsiasi domanda, dubbio o richiesta di chiarimento in merito
            alla presente Informativa Privacy o al trattamento dei tuoi dati
            personali, puoi contattare il Titolare del trattamento:
          </p>
          <p>
            <strong>
              Bogusław Siemiątkowski &ldquo;Spiżarnia Regio&rdquo;
            </strong>
            <br />
            ul. Napoleońska 49
            <br />
            06-500 Mława, Polonia
            <br />
            P. IVA EU: PL5691729538
            <br />
            Email privacy:{" "}
            <a href="mailto:privacy@piazzavirtuale.it">
              privacy@piazzavirtuale.it
            </a>
          </p>
        </section>
      </article>
    </div>
  );
}
