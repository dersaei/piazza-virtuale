// app/condizioni/page.tsx
import Link from "next/link";
import styles from "@/styles/LegalPage.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Condizioni Generali del Servizio Premium",
  description:
    "Condizioni generali del servizio Premium Piazza Virtuale per i produttori italiani",
  alternates: {
    canonical: "https://piazzavirtuale.it/condizioni",
  },
};

export default function CondizioniPage() {
  return (
    <div className={styles.legalPage}>
      <article className={styles.legalContent}>
        <header className={styles.header}>
          <h1>Condizioni Generali del Servizio Premium</h1>
          <p className={styles.subtitle}>
            Condizioni generali del servizio Premium Piazza Virtuale
            <br />
            per i produttori italiani
          </p>
          <p className={styles.lastUpdate}>
            Ultimo aggiornamento: 4 maggio 2026
          </p>
        </header>

        <section className={styles.section}>
          <p>
            Le presenti <strong>Condizioni generali del servizio Premium Piazza Virtuale</strong>{" "}
            disciplinano il rapporto tra Piazza Virtuale e le aziende che desiderano promuovere i
            propri prodotti sulla nostra piattaforma e sulla rivista online Piazza Virtuale &ndash; Magazine.
          </p>
          <p>
            In questa pagina trovi descritte le caratteristiche del servizio Premium (1 categoria o
            categorie illimitate), la durata del contratto (1 anno + 14 giorni gratuiti), il prezzo,
            le modalit&agrave; di pagamento e le condizioni di recesso entro 30 giorni.
          </p>
          <p>
            Prima di acquistare o confermare il servizio Premium, ti invitiamo a leggere con
            attenzione queste Condizioni generali, che si applicano a tutti i contratti conclusi con
            i clienti business (B2B).
          </p>
          <p className={styles.highlight}>
            Proseguendo con l&rsquo;attivazione del servizio o effettuando il pagamento della
            fattura, dichiari di aver letto, compreso e accettato integralmente le presenti
            Condizioni generali del servizio Premium Piazza Virtuale.
          </p>
        </section>

        <section className={styles.section}>
          <h2>1. Parti e definizioni</h2>
          <p>
            <strong>Fornitore</strong>: Spi&#x17C;arnia Regio
            <br />
            Titolare: Bogus&#322;aw Siemi&#261;tkowski
            <br />
            Impresa individuale
            <br />
            ul. Napole&#243;&#324;ska 49
            <br />
            06-500 M&#322;awa, Polonia
            <br />
            P. IVA EU: PL5691729538
          </p>
          <p>
            <strong>Cliente</strong>: produttore che acquista il servizio Premium Piazza Virtuale
            per promuovere i propri prodotti.
          </p>
          <p>
            Fornitore e Cliente sono congiuntamente indicate come le <strong>Parti</strong>.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Oggetto del servizio Premium</h2>
          <p>
            Il servizio Premium Piazza Virtuale consiste in servizi di visibilit&agrave; online e
            promozione commerciale sulla piattaforma &ldquo;Piazza Virtuale&rdquo; e sulla rivista
            online &ldquo;Piazza Virtuale &ndash; Magazine&rdquo;.
          </p>
          <p>Il Cliente pu&ograve; scegliere tra due pacchetti:</p>

          <h3>2.1 Pacchetto &ldquo;Premium 1 categoria&rdquo;</h3>
          <ul>
            <li>
              Esposizione annuale della scheda premium del negozio del Cliente in{" "}
              <strong>una (1) categoria</strong> scelta tra quelle disponibili sul sito (ad es.
              &ldquo;Birre e Sidr&igrave;&rdquo;, &ldquo;Vini&rdquo;, &ldquo;Distillati e
              liquori&rdquo;, &ldquo;Caff&egrave; e T&egrave;&rdquo;, &ldquo;Succhi e
              Infusi&rdquo;, &ldquo;Condimenti Pesto&rdquo;, &ldquo;Condimenti Aceto&rdquo;,
              &ldquo;Condimenti Pomodori&rdquo;, &ldquo;Condimenti Altre&rdquo;,
              &ldquo;Conserve&rdquo;, &ldquo;Miele&rdquo;, &ldquo;Legumi e Cereali&rdquo;,
              &ldquo;Caseificio&rdquo;, &ldquo;Dolci&rdquo;, &ldquo;Olii&rdquo;,
              &ldquo;Pane&rdquo;, &ldquo;Riso&rdquo;, &ldquo;Pasta&rdquo;,
              &ldquo;Farina&rdquo;, &ldquo;Pesce&rdquo;, &ldquo;Salumi&rdquo;,
              &ldquo;Frutta Secca e Fresca&rdquo;).
            </li>
            <li>
              Posizionamento della scheda premium{" "}
              <strong>nella parte superiore</strong> dell&rsquo;elenco dei negozi della categoria
              scelta.
            </li>
            <li>
              Scheda premium con informazioni su: eventuale spedizione gratuita (e relativa soglia),
              premi e riconoscimenti, certificazioni, caratteristiche dei prodotti e metodi di
              produzione.
            </li>
            <li>
              Visualizzazione, sotto la scheda premium, di <strong>un prodotto</strong> del Cliente
              appartenente alla categoria scelta, con foto e link diretto alla pagina del prodotto
              nel negozio online del Cliente (servizio facoltativo).
            </li>
          </ul>

          <h3>2.2 Pacchetto &ldquo;Premium illimitate&rdquo;</h3>
          <ul>
            <li>
              Esposizione annuale della scheda premium del negozio del Cliente in{" "}
              <strong>pi&ugrave; di una categoria</strong> pertinenti ai prodotti del Cliente
              presenti su Piazza Virtuale.
            </li>
            <li>
              Posizionamento della scheda premium nella parte superiore degli elenchi di tutte le
              categorie in cui il Cliente &egrave; inserito.
            </li>
            <li>Scheda premium con le stesse informazioni indicate al punto 2.1.</li>
            <li>
              Visualizzazione, sotto la scheda premium, di{" "}
              <strong>un prodotto per ciascuna categoria</strong> in cui il Cliente &egrave;
              presente, con foto e link diretto alla relativa pagina del prodotto nel negozio online
              (servizio facoltativo).
            </li>
          </ul>

          <h3>2.3 Servizi opzionali inclusi</h3>
          <p>
            Senza costi aggiuntivi, durante l&rsquo;intero periodo del servizio Premium (1 anno +
            14 giorni gratuiti), il Cliente pu&ograve; richiedere:
          </p>
          <ul>
            <li>
              Pubblicazione sulla rivista &ldquo;Piazza Virtuale &ndash; Magazine&rdquo; di un{" "}
              <strong>video promozionale</strong> realizzato dal Cliente (ad esempio sulla
              preparazione dei pacchi per i clienti). Il Fornitore pu&ograve; occuparsi del
              montaggio e dell&rsquo;editing del video.
            </li>
            <li>
              Preparazione e pubblicazione di un <strong>articolo redazionale</strong> sul negozio
              del Cliente, dedicato alla preparazione dei pacchi e alla presentazione dei prodotti,
              accompagnato da fotografie fornite dal Cliente o concordate con il Fornitore.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>3. Procedura di attivazione</h2>
          <p>
            Per attivare il servizio Premium, il Cliente deve fornire al Fornitore, in risposta alla
            richiesta scritta (e-mail o altro canale concordato), i seguenti dati:
          </p>
          <ul>
            <li>Categoria o categorie in cui esporre il negozio.</li>
            <li>
              Indirizzo internet (URL) da mostrare sulla scheda premium (homepage o pagina di
              categoria).
            </li>
            <li>Regione di appartenenza del negozio/azienda.</li>
            <li>Nome del marchio/negozio/azienda da visualizzare sulla scheda premium.</li>
            <li>
              Logo del negozio (file in allegato) oppure autorizzazione al Fornitore a scaricarlo
              dal sito del Cliente.
            </li>
            <li>
              Testo per la sezione &ldquo;In questo negozio troverai&rdquo;, con informazioni su
              servizi speciali, spedizione gratuita, caratteristiche dei prodotti, premi,
              riconoscimenti, certificazioni ecc.
            </li>
            <li>
              Nomi e, ove possibile, file dei loghi relativi a certificazioni, premi e
              riconoscimenti utilizzati dal Cliente.
            </li>
          </ul>

          <h3>3.1 Dati facoltativi</h3>
          <p>Il Cliente pu&ograve; inoltre fornire:</p>
          <ul>
            <li>
              Nome, descrizione breve, foto e URL del prodotto che desidera promuovere sotto la
              scheda premium (uno per la categoria scelta o uno per ciascuna categoria, in caso di
              pacchetto &ldquo;Premium illimitate&rdquo;).
            </li>
            <li>Una breve frase di accompagnamento per la scheda di ciascun prodotto.</li>
            <li>
              La conferma di voler realizzare e pubblicare un video promozionale e/o un reportage
              fotografico sulla preparazione dei pacchi.
            </li>
          </ul>

          <h3>3.2 Bozza e approvazione</h3>
          <p>Dopo aver ricevuto i dati:</p>
          <ul>
            <li>
              Il Fornitore predispone una bozza della scheda premium e, se richiesti, la struttura
              del video e dell&rsquo;articolo.
            </li>
            <li>Il Fornitore invia la bozza al Cliente per approvazione.</li>
            <li>
              Il Cliente pu&ograve; approvare, richiedere modifiche o decidere di posticipare la
              pubblicazione di video e articolo a un momento successivo (sempre entro la durata del
              servizio Premium).
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>4. Durata del contratto e recesso</h2>

          <h3>4.1 Durata</h3>
          <p>
            Il contratto ha la durata di <strong>un (1) anno</strong>, a cui si aggiungono{" "}
            <strong>14 giorni gratuiti</strong>.
            <br />
            La decorrenza del periodo &egrave; definita all&rsquo;articolo 5 (attivazione dopo
            pagamento + 14 giorni gratuiti).
          </p>

          <h3>4.2 Diritto di recesso contrattuale (B2B)</h3>
          <p>
            A partire dalla data di ricezione della fattura e del presente contratto, il Cliente
            dispone di <strong>30 (trenta) giorni</strong> per recedere dal contratto senza penali
            e con rimborso integrale delle somme eventualmente gi&agrave; pagate.
          </p>
          <p>
            Il recesso deve essere esercitato con comunicazione scritta al Fornitore (e-mail, PEC o
            altro canale concordato).
          </p>
          <p>Trascorso il termine di 30 giorni:</p>
          <ul>
            <li>
              il contratto non &egrave; pi&ugrave; liberamente risolvibile senza giusta causa, salvo
              diverso accordo scritto tra le Parti.
            </li>
          </ul>

          <h3>4.3 Scadenza</h3>
          <p>
            Alla scadenza del periodo di un anno + 14 giorni, il servizio Premium termina
            automaticamente, salvo accordo scritto per un nuovo periodo.
          </p>
        </section>

        <section className={styles.section}>
          <h2>5. Prezzi, fatturazione e pagamento</h2>

          <h3>5.1 Prezzi</h3>
          <ul>
            <li>
              Pacchetto <strong>&ldquo;Premium 1 categoria&rdquo;</strong>: 50 &euro; all&rsquo;anno{" "}
              <strong>+ IVA</strong>.
            </li>
            <li>
              Pacchetto <strong>&ldquo;Premium illimitate&rdquo;</strong>: 75 &euro; all&rsquo;anno{" "}
              <strong>+ IVA</strong>.
            </li>
          </ul>

          <h3>5.2 Fatturazione</h3>
          <p>
            Il Fornitore emette fattura dopo aver ricevuto dal Cliente tutti i dati necessari per la
            costruzione della scheda premium e degli eventuali contenuti facoltativi.
          </p>

          <h3>5.3 Pagamento e attivazione</h3>
          <ul>
            <li>
              Il Cliente deve pagare la fattura entro{" "}
              <strong>14 (quattordici) giorni</strong> dalla data di ricezione.
            </li>
            <li>
              Indipendentemente dal giorno in cui il pagamento viene effettuato entro i 14 giorni,
              il Fornitore riconosce al Cliente <strong>14 giorni di servizio gratuiti</strong>.
            </li>
            <li>
              Solo dopo la scadenza dei 14 giorni gratuiti inizia a decorrere il periodo
              contrattuale di 1 anno.
            </li>
          </ul>

          <h3>5.4 Modalit&agrave; di pagamento</h3>
          <p>
            Il pagamento avviene tramite bonifico bancario sul conto indicato in fattura o mediante
            altro metodo concordato per iscritto tra le Parti.
          </p>

          <h3>5.5 Ritardi di pagamento</h3>
          <p>
            In caso di ritardo nel pagamento superiore a 30 giorni rispetto alla scadenza indicata
            in fattura, il Fornitore pu&ograve;:
          </p>
          <ul>
            <li>sospendere temporaneamente l&rsquo;erogazione del servizio.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>6. Responsabilit&agrave; e contenuti</h2>

          <h3>6.1 Obblighi del Fornitore</h3>
          <p>Il Fornitore:</p>
          <ul>
            <li>
              pubblica e mantiene online la scheda premium del Cliente secondo il pacchetto scelto;
            </li>
            <li>
              assicura il posizionamento della scheda nella parte superiore delle liste delle
              categorie pertinenti.
            </li>
          </ul>
          <p>Il Fornitore non garantisce:</p>
          <ul>
            <li>un numero minimo di visite, clic, contatti, n&eacute;</li>
            <li>un incremento delle vendite del Cliente.</li>
          </ul>
          <p>
            La responsabilit&agrave; del Fornitore &egrave; limitata alla corretta pubblicazione e
            visibilit&agrave; dei contenuti secondo le specifiche concordate.
          </p>

          <h3>6.2 Contenuti del Cliente e diritti di terzi</h3>
          <p>Il Cliente dichiara di avere tutti i diritti necessari su:</p>
          <ul>
            <li>loghi e marchi;</li>
            <li>testi, descrizioni, foto e video;</li>
            <li>certificazioni, premi, riconoscimenti e relativi loghi.</li>
          </ul>
          <p>
            Il Cliente si impegna a manlevare e tenere indenne il Fornitore da qualsiasi richiesta o
            pretesa di terzi relativa alla violazione di diritti connessi a tali contenuti.
          </p>

          <h3>6.3 Propriet&agrave; intellettuale</h3>
          <ul>
            <li>I contenuti originali del Cliente restano di propriet&agrave; del Cliente.</li>
            <li>
              Il Cliente concede al Fornitore una licenza non esclusiva, gratuita e limitata alla
              durata del contratto per l&rsquo;utilizzo di tali contenuti ai fini
              dell&rsquo;erogazione del servizio.
            </li>
            <li>
              I testi redazionali, i montaggi video e gli elementi grafici creati dal Fornitore
              restano di propriet&agrave; del Fornitore; il Cliente pu&ograve; utilizzarli per
              autopromozione, citando &ldquo;Piazza Virtuale&rdquo; come fonte, salvo diverso
              accordo scritto.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>7. Trattamento dei dati personali (GDPR)</h2>
          <p>
            Il trattamento dei dati personali avviene nel rispetto del Regolamento (UE) 2016/679
            (&ldquo;GDPR&rdquo;) e della normativa nazionale applicabile.
          </p>

          <h3>7.1 Dati trattati e finalit&agrave;</h3>
          <p>Il Fornitore tratta i dati personali del Cliente (e dei suoi referenti):</p>
          <ul>
            <li>per la gestione del contratto;</li>
            <li>per la fatturazione e gli adempimenti amministrativi/contabili;</li>
            <li>per l&rsquo;erogazione dei servizi di visibilit&agrave; e promozione.</li>
          </ul>
          <p>
            I dati sono conservati per il tempo necessario all&rsquo;esecuzione del servizio e per
            gli obblighi di legge.
          </p>

          <h3>7.2 Ruoli e DPA</h3>
          <p>
            Se, nell&rsquo;ambito dei servizi erogati, il Fornitore dovesse trattare dati personali
            di clienti finali del Cliente, le Parti, ove necessario, stipuleranno un separato{" "}
            <strong>Data Processing Agreement (DPA)</strong> che discipliner&agrave; nel dettaglio
            ruoli e responsabilit&agrave; (titolare/responsabile del trattamento).
          </p>

          <h3>7.3 Informativa privacy</h3>
          <p>
            Il Cliente dichiara di poter consultare in qualsiasi momento l&rsquo;informativa privacy
            aggiornata del Fornitore, disponibile su richiesta o alla pagina{" "}
            <Link href="/informativa-privacy">Informativa Privacy</Link>.
          </p>
        </section>

        <section className={styles.section}>
          <h2>8. Forza maggiore</h2>
          <p>
            Nessuna delle Parti &egrave; responsabile per il mancato o ritardato adempimento delle
            proprie obbligazioni dovuto a eventi di forza maggiore, ossia eventi imprevedibili,
            inevitabili e fuori dal controllo delle Parti (ad esempio guerre, sommosse, atti
            terroristici, calamit&agrave; naturali, pandemie, blackout prolungati, provvedimenti
            normativi che impediscano la prestazione).
          </p>
          <p>La Parte che invoca la forza maggiore deve:</p>
          <ul>
            <li>informare l&rsquo;altra Parte nel pi&ugrave; breve tempo possibile;</li>
            <li>indicare la natura dell&rsquo;evento e la sua durata stimata.</li>
          </ul>
          <p>
            Gli obblighi colpiti da forza maggiore sono sospesi per la durata dell&rsquo;evento.
            <br />
            Se l&rsquo;evento dura pi&ugrave; di 60 giorni consecutivi, ciascuna Parte pu&ograve;
            recedere dal contratto senza penali, mediante comunicazione scritta.
          </p>
        </section>

        <section className={styles.section}>
          <h2>9. Risoluzione per inadempimento</h2>
          <p>
            In caso di inadempimento grave di una delle Parti alle obbligazioni essenziali del
            contratto (in particolare, mancato pagamento del corrispettivo da parte del Cliente
            oppure mancata pubblicazione dei servizi principali da parte del Fornitore), la Parte
            adempiente pu&ograve;:
          </p>
          <ul>
            <li>
              inviare una diffida scritta, concedendo almeno 15 giorni per rimediare;
            </li>
            <li>
              se l&rsquo;inadempimento persiste, dichiarare la risoluzione del contratto, fatto
              salvo il diritto al risarcimento di eventuali maggiori danni.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>10. Legge applicabile e foro competente</h2>
          <p>
            Le presenti Condizioni generali sono regolate dalla <strong>legge italiana</strong>.
          </p>
          <p>
            Per ogni controversia relativa alla validit&agrave;, interpretazione, esecuzione o
            risoluzione del presente contratto, sar&agrave; esclusivamente competente il{" "}
            <strong>Foro di Milano</strong>, in deroga a qualsiasi altro foro eventualmente previsto
            dalla legge, salvo diverso accordo scritto tra le Parti.
          </p>
        </section>
      </article>
    </div>
  );
}
