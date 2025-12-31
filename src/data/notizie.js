import newsImg from "../assets/news.jpg";
import sorinImg from "../assets/sorin.jpg";
import liviuImg from "../assets/liviu.jpg";
import damanguitImg from "../assets/damanguit.jpg";
import confAutunnaleImg from "../assets/conferenza-autunnale.png";
import confAnnualeImg from "../assets/conferenza-annuale.png";
import concertoRomaImg from "../assets/concerto-roma.png";

const notizie = [
  {
    id: 1,
    title: "Nuovo Presidente della GC",
    sottoTitolo: "Eli Tenorio",
    image: newsImg,
    content: "Ipsum lorem dolor sit amet, consectetur adipiscing elit.",
    publishedAt: new Date().toISOString(),
    autore: "Team media",
  },
  {
    id: 2,
    title: "Nuovo 1° Vice Presidente della GC",
    sottoTitolo: "David Zic",
    image: newsImg,
    testo: "Ipsum lorem dolor sit amet, consectetur adipiscing elit.",
    publishedAt: new Date().toISOString(),
    autore: "Team media",
  },
  {
    id: 3,
    title: "Nuovo 2° Vice Presidente della GC",
    sottoTitolo: "Rolly Damaguit",
    image: damanguitImg,
    testo: "Ipsum lorem dolor sit amet, consectetur adipiscing elit.",
    publishedAt: new Date().toISOString(),
    autore: "Team media",
  },
  {
    id: 4,
    title: "Nuovo Segretario della GC",
    sottoTitolo: "Liviu Tudoroiu",
    image: liviuImg,
    content: "Ipsum lorem dolor sit amet, consectetur adipiscing elit.",
    publishedAt: new Date().toISOString(),
    autore: "Team media",
  },
  {
    id: 5,
    title: "Gesù la roccia vivente",
    sottoTitolo: "Conferenza annuale del Campo Italiano - Belluno",
    image: confAnnualeImg,
    content: "L evento si terrà dal 20 al 22 giugno 2025 presso la Casa per ferie Giralba, in via Giralba 6, ad Auronzo di Cadore (Belluno), a 1000 metri di altitudine." +
              "Il motto di questa conferenza sarà: “Gesù, la Roccia vivente”. “Egli è la Roccia, l’opera sua è perfetta, poiché tutte le sue vie sono giustizia." + 
              "E’ un Dio di fedeltà e senza ingiustizia; egli è giusto e retto” - Deuteronomio 32:4. " +
              "Noi stiamo vivendo gli ultimi giorni della storia di questo mondo; il Signore Gesù Cristo sta per ritornare sulle nuvole del cielo. " +
              "Come possiamo vivere in attesa di questo glorioso evento? Chi è Gesù per me nella mia vita? Come posso conoscerlo per poterlo amare " +
              "e per prepararmi per il Suo ritorno che sarà l’evento più grande della storia di questo pianeta? Gesù Cristo è la Parola, " +
              "la Roccia vivente, il Dio Creatore e Redentore. Quando venne la prima volta sulla terra la maggioranza degli uomini " +
              "non Lo riconobbero e non Lo accettarono; perché? Eppure il Suo primo avvento era stato profetizzato e descritto nell’Antico Testamento; " +
              "la Sua venuta era stata simboleggiata dai riti del Santuario terreno e dalla festa della Pasqua. Può succedere anche a noi oggi che non riconosciamo " +
              "i segni dei tempi e quindi non Lo riconosceremo come il nostro Salvatore quando ritornerà? Cosa possiamo fare per riconoscerlo e amarlo nella nostra vita quotidiana, " +
              "aspettando l’adempimento delle profezie? Approfittiamo, quindi, del tempo che ci è stato concesso per conoscere ed amare il nostro Redentore. " +
              "Contemplandolo, saremo trasformati alla Sua immagine e somiglianza e saremo vincitori nella lotta spirituale contro il peccato.",
    publishedAt: new Date().toISOString(),
    autore: "Team media",
  },
  {
    id: 6,
    title: "Famiglia: Oasi di pace o incubo",
    sottoTitolo: "Conferenza autunnale del Campo Italiano - Roma",
    image: confAutunnaleImg,
    content: "Cari fratelli ed amici in Cristo, Il Campo Italiano vi invita alla Conferenza Autunnale 2025" +
              "che si terrà a Velletri, comune della città metropolitana di Roma. L’evento si terrà dal 17 al 19 ottobre 2025" +
              "presso il Centro Ecumene a Velletri (Roma), in via del cigliolo 141. " +
              "Il motto di questa Conferenza sarà: “Famiglia: oasi di pace o incubo?”. Felice la casa dove il nome di Gesù è dolce per ogni orecchio;"+
              " dove i figli balbettano presto la Sua fama e i genitori Lo consideranoprezioso. " +
              "Vedendo che i segni dei tempi si stanno rapidamente realizzando, dovremmo conservare la nostra energia e" +
              " usarla il meno possibile per obiettivi temporali Sebbene c’è bisogno di denaro per sopravvivere," +
              "molte famiglie hanno commesso un grande errore nel credere che il denaro sia tutto ciò di cui hanno bisogno per essere felici. " +
              "Sì, il denaro può comprare un letto, ma non il sonno. Il denaro può comprare medicine,ma non la guarigione. Il denaro può comprare il pane, " +
              "ma non la soddisfazione. Il denaro può comprare una casa, ma non un focolare. Il denaro può comprare quasi tutto, ma non la felicità eterna. " +
              "In questo tempo di crisi, per preparare la nostra famiglia al ritorno di Cristo, dobbiamo concentrarci maggiormente sugli interessi eterni.",
    publishedAt: new Date().toISOString(),
    autore: "Team media",
  },
  {
    id: 7,
    title: "Concerto di musica sacra - Roma",
    sottoTitolo: "Coro viva speranza",
    image: concertoRomaImg,
    content: "Il Coro Viva Speranza si esibirà in un concerto di musica sacra a Roma. Un evento da non perdere per gli amanti della musica e della spiritualità." +
              "Presso la Chiesa Metodista di Roma, in via del Banco di Santo Spirito 3",
    publishedAt: new Date().toISOString(),
    autore: "Team media",
  },
];

export default notizie;