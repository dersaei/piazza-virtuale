import styles from "@/styles/LegalPage.module.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy | Piazza Virtuale",
  description:
    "Informativa sull'utilizzo dei cookie e tecnologie similari ai sensi del Regolamento UE 2016/679 e delle Linee Guida del Garante Privacy",
  alternates: {
    canonical: "/informativa-cookie",
  },
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
            Il sito <strong>Piazza Virtuale</strong> utilizza cookie tecnici
            necessari per il funzionamento del sito e per garantire il rispetto
            degli obblighi di legge. Questi cookie non richiedono il consenso
            preventivo dell&rsquo;utente.
          </p>

          <h3>Cookie di Verifica dell&rsquo;Età</h3>
          <div className={styles.highlight}>
            <strong>Importante:</strong> In conformità all&rsquo;Art. 689 del
            Codice Penale italiano, è vietata la vendita di bevande alcoliche ai
            minori di 18 anni. Per garantire il rispetto di questo obbligo di
            legge, utilizziamo un cookie tecnico di verifica dell&rsquo;età.
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
                    <strong>Nome del cookie</strong>
                  </td>
                  <td>age_verified</td>
                </tr>
                <tr>
                  <td>
                    <strong>Tipologia</strong>
                  </td>
                  <td>Cookie tecnico necessario</td>
                </tr>
                <tr>
                  <td>
                    <strong>Finalità</strong>
                  </td>
                  <td>
                    Verifica della maggiore età per l&rsquo;accesso a pagine
                    contenenti informazioni su prodotti alcolici, in conformità
                    con l&rsquo;Art. 689 del Codice Penale
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Dati memorizzati</strong>
                  </td>
                  <td>
                    Valore booleano (true/false) che indica se l&rsquo;utente ha
                    confermato di avere almeno 18 anni
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Durata</strong>
                  </td>
                  <td>30 giorni</td>
                </tr>
                <tr>
                  <td>
                    <strong>Consenso richiesto</strong>
                  </td>
                  <td>
                    <strong style={{ color: "#7a8471" }}>NO</strong> - Cookie
                    tecnico necessario per adempiere ad un obbligo di legge
                    (Art. 689 C.P.)
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Categorie interessate</strong>
                  </td>
                  <td>Birre, Vini, Distillati e Liquori</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            <strong>Come funziona:</strong> Quando un utente accede per la prima
            volta a una categoria contenente prodotti alcolici, viene
            visualizzato un messaggio di verifica dell&rsquo;età. Se
            l&rsquo;utente conferma di avere almeno 18 anni, il cookie viene
            memorizzato per 30 giorni, evitando di ripetere la verifica ad ogni
            visita. Se l&rsquo;utente non conferma di avere 18 anni, viene
            reindirizzato alla homepage e non può accedere ai contenuti
            riservati ai maggiorenni.
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
            Per l&rsquo;hosting e lo streaming di contenuti video, potremmo
            utilizzare Mux, una piattaforma di streaming video. Mux potrebbe
            utilizzare cookie tecnici per ottimizzare la qualità dello streaming
            in base alla connessione dell&rsquo;utente.
          </p>

          <h3>Mappe Interattive</h3>
          <p>
            Per visualizzare mappe interattive che mostrino la posizione dei
            produttori, potremmo integrare servizi di mappe (come OpenStreetMap
            o Google Maps). Questi servizi potrebbero utilizzare cookie tecnici
            per il funzionamento delle mappe.
          </p>

          <h3>Condivisione Social Media</h3>
          <p>
            Per facilitare la condivisione dei contenuti sui social media,
            potremmo aggiungere pulsanti di condivisione. Questi pulsanti
            potrebbero generare cookie di terze parti solo quando l&rsquo;utente
            interagisce con essi.
          </p>

          <p>
            <strong>Importante:</strong> Prima di implementare qualsiasi
            servizio che utilizzi cookie non essenziali o cookie di
            profilazione, aggiorneremo questa Cookie Policy e, se necessario,
            implementeremo un sistema di gestione del consenso (cookie banner).
          </p>
        </section>

        <section className={styles.section}>
          <h2>5. Base Giuridica del Trattamento</h2>
          <p>
            I cookie utilizzati su questo sito si basano su diverse basi
            giuridiche:
          </p>

          <h3>Obblighi di Legge (Art. 6, par. 1, lett. c) GDPR)</h3>
          <p>
            Il cookie di verifica dell&rsquo;età è necessario per adempiere
            all&rsquo;obbligo di legge previsto dall&rsquo;Art. 689 del Codice
            Penale, che vieta la vendita di bevande alcoliche ai minori di 18
            anni.
          </p>

          <h3>Legittimo Interesse (Art. 6, par. 1, lett. f) GDPR)</h3>
          <p>
            I cookie analitici anonimi (Ackee) sono basati sul nostro legittimo
            interesse a comprendere come gli utenti utilizzano il sito per
            migliorarne il funzionamento, senza intaccare la privacy degli
            utenti.
          </p>
        </section>

        <section className={styles.section}>
          <h2>6. Come Gestire i Cookie</h2>
          <p>
            L&rsquo;utente può gestire le preferenze relative ai cookie
            direttamente all&rsquo;interno del proprio browser. La maggior parte
            dei browser consente di:
          </p>
          <ul>
            <li>Visualizzare quali cookie sono memorizzati</li>
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

          <div className={styles.highlight}>
            <strong>Attenzione:</strong> La cancellazione del cookie di verifica
            dell&rsquo;età comporterà la necessità di confermare nuovamente di
            avere almeno 18 anni per accedere alle pagine con prodotti alcolici.
            La disabilitazione totale dei cookie tecnici potrebbe compromettere
            il corretto funzionamento del sito e l&rsquo;accesso ad alcune sue
            funzionalità.
          </div>
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
            <li>
              Art. 689 del Codice Penale italiano (divieto di vendita di bevande
              alcoliche ai minori di 18 anni)
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
