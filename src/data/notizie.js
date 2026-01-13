import newsImg from "../assets/news.jpg";
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
    description: "Announcement dei nuovi incarichi della Giunta di Campo",
    image: newsImg,
    content:
      "È con gioia che annunciamo l'insediamento del nuovo Presidente della Giunta di Campo: Eli Tenorio. Un leader dedicato che porterà avanti la missione della nostra comunità con dedizione e visione spirituale.",
    category: "Leadership",
    publishedAt: new Date().toISOString(),
    autore: "Team media",
    views: 156,
  },
  {
    id: 2,
    title: "Nuovo 1° Vice Presidente della GC",
    sottoTitolo: "David Zic",
    description: "Announcement dei nuovi incarichi della Giunta di Campo",
    image: newsImg,
    content:
      "David Zic è stato eletto come primo Vice Presidente della Giunta di Campo. La sua esperienza e dedizione contribuiranno significativamente alla guida della nostra comunità italiana.",
    category: "Leadership",
    publishedAt: new Date().toISOString(),
    autore: "Team media",
    views: 142,
  },
  {
    id: 3,
    title: "Nuovo 2° Vice Presidente della GC",
    sottoTitolo: "Rolly Damaguit",
    description: "Announcement dei nuovi incarichi della Giunta di Campo",
    image: damanguitImg,
    content:
      "Rolly Damaguit è stato eletto come secondo Vice Presidente. La sua passione per il servizio e la comunità lo rendono una scelta eccellente per questo ruolo importante.",
    category: "Leadership",
    publishedAt: new Date().toISOString(),
    autore: "Team media",
    views: 138,
  },
  {
    id: 4,
    title: "Nuovo Segretario della GC",
    sottoTitolo: "Liviu Tudoroiu",
    description: "Announcement dei nuovi incarichi della Giunta di Campo",
    image: liviuImg,
    content:
      "Liviu Tudoroiu assume il ruolo di Segretario della Giunta di Campo. Con la sua organizzazione e dedizione, continuerà a servire la comunità con eccellenza.",
    category: "Leadership",
    publishedAt: new Date().toISOString(),
    autore: "Team media",
    views: 161,
  },
  {
    id: 5,
    title: "Gesù la roccia vivente",
    sottoTitolo: "Conferenza annuale del Campo Italiano - Belluno",
    description: "Conferenza annuale in Belluno - 20-22 giugno 2025",
    image: confAnnualeImg,
    content:
      "L evento si terrà dal 20 al 22 giugno 2025 presso la Casa per ferie Giralba, in via Giralba 6, ad Auronzo di Cadore (Belluno), a 1000 metri di altitudine." +
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
    category: "Eventi",
    publishedAt: new Date().toISOString(),
    autore: "Team media",
    views: 198,
  },
  {
    id: 6,
    title: "Famiglia: Oasi di pace o incubo",
    sottoTitolo: "Conferenza autunnale del Campo Italiano - Roma",
    description: "Conferenza autunnale a Velletri (Roma) - 17-19 ottobre 2025",
    image: confAutunnaleImg,
    content:
      "Cari fratelli ed amici in Cristo, Il Campo Italiano vi invita alla Conferenza Autunnale 2025" +
      "che si terrà a Velletri, comune della città metropolitana di Roma. L’evento si terrà dal 17 al 19 ottobre 2025" +
      "presso il Centro Ecumene a Velletri (Roma), in via del cigliolo 141. " +
      "Il motto di questa Conferenza sarà: “Famiglia: oasi di pace o incubo?”. Felice la casa dove il nome di Gesù è dolce per ogni orecchio;" +
      " dove i figli balbettano presto la Sua fama e i genitori Lo consideranoprezioso. " +
      "Vedendo che i segni dei tempi si stanno rapidamente realizzando, dovremmo conservare la nostra energia e" +
      " usarla il meno possibile per obiettivi temporali Sebbene c’è bisogno di denaro per sopravvivere," +
      "molte famiglie hanno commesso un grande errore nel credere che il denaro sia tutto ciò di cui hanno bisogno per essere felici. " +
      "Sì, il denaro può comprare un letto, ma non il sonno. Il denaro può comprare medicine,ma non la guarigione. Il denaro può comprare il pane, " +
      "ma non la soddisfazione. Il denaro può comprare una casa, ma non un focolare. Il denaro può comprare quasi tutto, ma non la felicità eterna. ",
    category: "Eventi",
    publishedAt: new Date().toISOString(),
    autore: "Team media",
    views: 167,
  },
  {
    id: 7,
    description: "Concerto di musica sacra con il Coro Viva Speranza",
    title: "Concerto di musica sacra - Roma",
    sottoTitolo: "Coro viva speranza",
    image: concertoRomaImg,
    category: "Musica",
    publishedAt: new Date().toISOString(),
    autore: "Team media",
    views: 142,
  },
];

export default notizie;
