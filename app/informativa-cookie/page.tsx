// app/cookie-policy/page.tsx
import styles from "@/styles/LegalPage.module.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy | Piazza Virtuale",
  description:
    "Informativa sull'utilizzo dei cookie e tecnologie similari ai sensi del Regolamento UE 2016/679 e delle Linee Guida del Garante Privacy",
};

export default function CookiePolicyPage() {
  return (
    <div className={styles.legalPage}>
      <article className={styles.legalContent}>
        <header className={styles.header}>
          <h1>Cookie Policy</h1>
          <p className={styles.subtitle}>
            Informativa sull&rsquo;utilizzo dei cookie e tecnologie similari
            <br />
            ai sensi del Regolamento (UE) 2016/679 e delle Linee Guida del
            Garante Privacy
          </p>
          <p className={styles.lastUpdate}>
            Ultimo aggiornamento: 29 ottobre 2025
          </p>
        </header>

        <section className={styles.section}>
          <h2>1. Cosa sono i Cookie</h2>
          <p>
            I cookie sono piccoli file di testo che i siti web visitati
            dall&rsquo;utente inviano e registrano sul suo computer o
            dispositivo mobile, per essere poi ritrasmessi agli stessi siti alla
            visita successiva. I cookie sono utilizzati per diverse finalità,
            hanno caratteristiche diverse e possono essere utilizzati sia dal
            titolare del sito che si sta visitando, sia da terze parti.
          </p>
          <p>
            Oltre ai cookie, esistono altre tecnologie similari che possono
            essere utilizzate per memorizzare informazioni sul browser o sul
            dispositivo dell&rsquo;utente, come ad esempio il local storage e il
            session storage. In questa Cookie Policy, quando parliamo di
            &ldquo;cookie&rdquo; ci riferiamo anche a queste tecnologie
            similari.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Tipologie di Cookie</h2>

          <h3>Cookie Tecnici</h3>
          <p>
            I cookie tecnici sono quelli utilizzati al solo fine di effettuare
            la trasmissione di una comunicazione su una rete di comunicazione
            elettronica, o nella misura strettamente necessaria per fornire un
            servizio esplicitamente richiesto dall&rsquo;utente. Questi cookie
            sono essenziali per il corretto funzionamento del sito e non
            richiedono il consenso dell&rsquo;utente.
          </p>

          <h3>Cookie Analitici</h3>
          <p>
            I cookie analitici sono utilizzati per raccogliere informazioni, in
            forma aggregata e anonima, sul numero di utenti e su come questi
            visitano il sito. Se i cookie analitici sono configurati in modo da
            rendere gli utenti anonimi e non consentire di risalire
            all&rsquo;identità degli stessi, possono essere considerati come
            cookie tecnici e non richiedono il consenso preventivo.
          </p>

          <h3>Cookie di Profilazione</h3>
          <p>
            I cookie di profilazione sono volti a creare profili relativi
            all&rsquo;utente e vengono utilizzati al fine di inviare messaggi
            pubblicitari in linea con le preferenze manifestate dallo stesso
            nell&rsquo;ambito della navigazione in rete. Questi cookie
            richiedono il consenso preventivo dell&rsquo;utente.
          </p>

          <h3>Cookie di Terze Parti</h3>
          <p>
            I cookie di terze parti sono impostati da un dominio diverso da
            quello del sito visitato dall&rsquo;utente. Se un utente visita un
            sito web e una società diversa invia un cookie attraverso quel sito,
            questo è un cookie di terze parti.
          </p>
        </section>

        <section className={styles.section}>
          <h2>3. Cookie Utilizzati su Questo Sito</h2>
          <p>
            Attualmente, il sito <strong>Piazza Virtuale</strong> utilizza
            esclusivamente tecnologie di analisi statistica che rispettano
            pienamente la privacy degli utenti e non richiedono il consenso
            preventivo.
          </p>

          <h3>Ackee Analytics</h3>
          <p>
            Per ottenere informazioni sul comportamento dei visitatori,
            utilizziamo{" "}
            <a
              href="https://ackee.electerious.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ackee
            </a>
            . Questo software di analisi ci fornisce informazioni sui visitatori
            solo in generale, ma non sui singoli individui.
          </p>

          <div className={styles.highlight}>
            <strong>Importante:</strong> Ackee non traccia i visitatori e non
            memorizza alcuna informazione personale identificabile. Tutti i dati
            vengono anonimizzati immediatamente e in modo irreversibile.
          </div>

          <div className={styles.table}>
            <table>
              <thead>
                <tr>
                  <th>Caratteristica</th>
                  <th>Dettaglio</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Nome del servizio</strong>
                  </td>
                  <td>Ackee Analytics</td>
                </tr>
                <tr>
                  <td>
                    <strong>Tipologia</strong>
                  </td>
                  <td>Cookie tecnici/analitici anonimi</td>
                </tr>
                <tr>
                  <td>
                    <strong>Finalità</strong>
                  </td>
                  <td>
                    Analisi statistiche aggregate sul traffico del sito web
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Dati raccolti</strong>
                  </td>
                  <td>
                    Dati aggregati e anonimizzati: pagine visitate, durata della
                    sessione, sorgente del traffico, dispositivo utilizzato
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Durata</strong>
                  </td>
                  <td>7 giorni (forma anonimizzata)</td>
                </tr>
                <tr>
                  <td>
                    <strong>Consenso richiesto</strong>
                  </td>
                  <td>
                    <strong style={{ color: "#7a8471" }}>NO</strong> - Non
                    richiede consenso preventivo in quanto rispetta pienamente
                    la privacy
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Informazioni</strong>
                  </td>
                  <td>
                    <a
                      href="https://docs.ackee.electerious.com/#/docs/Anonymization"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Documentazione Ackee sull&rsquo;anonimizzazione
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className={styles.highlight}>
            <strong>Nessun cookie di profilazione:</strong> Questo sito NON
            utilizza cookie di profilazione o cookie per scopi pubblicitari. Non
            tracciamo il comportamento individuale degli utenti per finalità di
            marketing.
          </p>
        </section>

        <section className={styles.section}>
          <h2>4. Cookie che Potrebbero Essere Utilizzati in Futuro</h2>
          <p>
            In futuro, potremmo integrare servizi aggiuntivi che utilizzano
            cookie o tecnologie similari. Eventuali modifiche saranno comunicate
            attraverso l&rsquo;aggiornamento di questa Cookie Policy. I servizi
            che potremmo integrare includono:
          </p>

          <h3>Servizi Video (Mux)</h3>
          <p>
            Potremmo utilizzare{" "}
            <a
              href="https://www.mux.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mux
            </a>{" "}
            per l&rsquo;hosting e la distribuzione di contenuti video. Mux
            potrebbe utilizzare cookie tecnici per garantire la corretta
            riproduzione dei video e cookie analitici per migliorare la qualità
            del servizio.
          </p>
          <ul>
            <li>
              <strong>Finalità:</strong> Riproduzione video, analisi delle
              prestazioni
            </li>
            <li>
              <strong>Tipologia:</strong> Cookie tecnici e analitici
            </li>
            <li>
              <strong>Informazioni:</strong>{" "}
              <a
                href="https://www.mux.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy Mux
              </a>
            </li>
          </ul>

          <h3>Google Analytics</h3>
          <p>
            Potremmo utilizzare Google Analytics per ottenere statistiche più
            dettagliate sull&rsquo;utilizzo del sito. In tal caso, configureremo
            Google Analytics in modalità privacy-friendly (anonimizzazione IP,
            disabilitazione della condivisione dati con Google) e richiederemo
            il consenso degli utenti prima dell&rsquo;attivazione.
          </p>
          <ul>
            <li>
              <strong>Finalità:</strong> Analisi statistiche del traffico web
            </li>
            <li>
              <strong>Tipologia:</strong> Cookie analitici di terze parti
            </li>
            <li>
              <strong>Durata:</strong> Fino a 26 mesi
            </li>
            <li>
              <strong>Consenso richiesto:</strong> Sì
            </li>
            <li>
              <strong>Informazioni:</strong>{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy Google
              </a>
            </li>
          </ul>

          <p>
            <strong>Nota importante:</strong> Qualora decidessimo di integrare
            questi o altri servizi che richiedono il consenso preventivo,
            implementeremo un banner per la gestione delle preferenze sui cookie
            e aggiorneremo questa informativa.
          </p>
        </section>

        <section className={styles.section}>
          <h2>5. Base Giuridica</h2>
          <p>
            La base giuridica per l&rsquo;utilizzo delle tecnologie di analisi
            attualmente impiegate sul sito è il{" "}
            <strong>legittimo interesse</strong> del Titolare del trattamento
            (art. 6.1.f del GDPR), in quanto:
          </p>
          <ul>
            <li>
              I dati raccolti sono completamente anonimi e non permettono
              l&rsquo;identificazione degli utenti
            </li>
            <li>
              Non vi è alcun tracciamento individuale o profilazione degli
              utenti
            </li>
            <li>
              Le informazioni sono utilizzate esclusivamente per migliorare
              l&rsquo;esperienza di navigazione e ottimizzare i contenuti del
              sito
            </li>
            <li>
              La privacy degli utenti è pienamente rispettata senza necessità di
              consenso preventivo
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>6. Come Gestire i Cookie</h2>
          <p>
            Attualmente, dato che il sito utilizza esclusivamente tecnologie di
            analisi anonime che non richiedono consenso, non è presente un
            banner per la gestione dei cookie.
          </p>
          <p>
            Tuttavia, l&rsquo;utente può sempre gestire le preferenze relative
            ai cookie attraverso le impostazioni del proprio browser. La maggior
            parte dei browser permette di:
          </p>
          <ul>
            <li>Visualizzare i cookie memorizzati</li>
            <li>Bloccare tutti o alcuni cookie</li>
            <li>Cancellare i cookie dal dispositivo</li>
            <li>
              Bloccare i cookie di terze parti mantenendo quelli del sito
              visitato
            </li>
          </ul>

          <h3>Guide per la Gestione dei Cookie nei Browser Principali</h3>
          <ul>
            <li>
              <strong>Vivaldi:</strong>{" "}
              <a
                href="https://help.vivaldi.com/desktop/privacy/cookies/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Guida Cookie Vivaldi
              </a>
            </li>
            <li>
              <strong>Google Chrome:</strong>{" "}
              <a
                href="https://support.google.com/chrome/answer/95647"
                target="_blank"
                rel="noopener noreferrer"
              >
                Guida Cookie Chrome
              </a>
            </li>
            <li>
              <strong>Mozilla Firefox:</strong>{" "}
              <a
                href="https://support.mozilla.org/it/kb/Attivare%20e%20disattivare%20i%20cookie"
                target="_blank"
                rel="noopener noreferrer"
              >
                Guida Cookie Firefox
              </a>
            </li>
            <li>
              <strong>Safari:</strong>{" "}
              <a
                href="https://support.apple.com/it-it/guide/safari/sfri11471/mac"
                target="_blank"
                rel="noopener noreferrer"
              >
                Guida Cookie Safari
              </a>
            </li>
            <li>
              <strong>Microsoft Edge:</strong>{" "}
              <a
                href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                target="_blank"
                rel="noopener noreferrer"
              >
                Guida Cookie Edge
              </a>
            </li>
            <li>
              <strong>Opera:</strong>{" "}
              <a
                href="https://help.opera.com/en/latest/web-preferences/#cookies"
                target="_blank"
                rel="noopener noreferrer"
              >
                Guida Cookie Opera
              </a>
            </li>
            <li>
              <strong>Brave:</strong>{" "}
              <a
                href="https://brave.com/glossary/cookie/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Guida Cookie Brave
              </a>
            </li>
          </ul>

          <p>
            <strong>Attenzione:</strong> La disabilitazione totale dei cookie
            tecnici potrebbe compromettere il corretto funzionamento del sito e
            l&rsquo;accesso ad alcune sue funzionalità.
          </p>
        </section>

        <section className={styles.section}>
          <h2>7. Cookie di Terze Parti</h2>
          <p>
            Attualmente, questo sito{" "}
            <strong>NON utilizza cookie di terze parti</strong> per finalità di
            marketing, profilazione o pubblicità comportamentale.
          </p>
          <p>
            Qualora in futuro venissero integrati servizi di terze parti che
            utilizzano cookie (ad esempio, per l&rsquo;incorporamento di video,
            mappe o social media), questa Cookie Policy sarà aggiornata di
            conseguenza e, ove richiesto dalla normativa, sarà implementato un
            sistema per richiedere il consenso preventivo degli utenti.
          </p>
        </section>

        <section className={styles.section}>
          <h2>8. Diritti dell&rsquo;Utente</h2>
          <p>
            L&rsquo;utente ha il diritto di esercitare i diritti previsti dal
            GDPR in relazione ai dati personali eventualmente raccolti
            attraverso cookie o tecnologie similari. Per maggiori informazioni
            sui diritti dell&rsquo;utente e su come esercitarli, si rimanda alla
            nostra <Link href="/informativa-privacy">Informativa Privacy</Link>.
          </p>
          <p>
            Per qualsiasi domanda o richiesta relativa all&rsquo;utilizzo dei
            cookie, è possibile contattare il Titolare del trattamento
            all&rsquo;indirizzo:{" "}
            <a href="mailto:privacy@piazzavirtuale.it">
              privacy@piazzavirtuale.it
            </a>
          </p>
        </section>

        <section className={styles.section}>
          <h2>9. Aggiornamenti della Cookie Policy</h2>
          <p>
            Questa Cookie Policy può essere aggiornata periodicamente per
            riflettere modifiche nelle tecnologie utilizzate sul sito o nelle
            normative applicabili. L&rsquo;utente è invitato a consultare
            regolarmente questa pagina per prendere visione della versione più
            aggiornata della Cookie Policy.
          </p>
          <p>
            La data di &ldquo;Ultimo aggiornamento&rdquo; riportata
            all&rsquo;inizio del documento indica quando la Cookie Policy è
            stata modificata per l&rsquo;ultima volta.
          </p>
          <p>
            In caso di modifiche sostanziali che richiedano un nuovo consenso da
            parte degli utenti, il Titolare adotterà le misure appropriate per
            informare gli utenti e, se necessario, richiedere nuovamente il
            consenso.
          </p>
        </section>

        <section className={styles.section}>
          <h2>10. Riferimenti Normativi</h2>
          <p>Questa Cookie Policy è redatta in conformità con:</p>
          <ul>
            <li>
              Regolamento (UE) 2016/679 del Parlamento europeo e del Consiglio
              del 27 aprile 2016 (GDPR)
            </li>
            <li>
              Decreto Legislativo 30 giugno 2003, n. 196 (Codice in materia di
              protezione dei dati personali) come modificato dal D.Lgs. 101/2018
            </li>
            <li>
              Linee guida cookie e altri strumenti di tracciamento - 10 giugno
              2021, Garante per la protezione dei dati personali
            </li>
            <li>
              Direttiva 2002/58/CE (ePrivacy Directive) come modificata dalla
              Direttiva 2009/136/CE
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>11. Contatti</h2>
          <p>
            Per qualsiasi domanda, dubbio o richiesta di chiarimento in merito
            alla presente Cookie Policy o all&rsquo;utilizzo dei cookie sul
            sito, è possibile contattare:
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
          <p>
            Per ulteriori informazioni sul trattamento dei dati personali,
            consultare la nostra{" "}
            <Link href="/informativa-privacy">
              Informativa Privacy completa
            </Link>
            .
          </p>
        </section>
      </article>
    </div>
  );
}
