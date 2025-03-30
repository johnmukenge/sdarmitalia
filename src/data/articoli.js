import newsImg from "../assets/news.jpg";
import sorinImg from "../assets/sorin.jpg";
import liviuImg from "../assets/liviu.jpg";
import damanguitImg from "../assets/damanguit.jpg";

const articoli = [
  {
    title: "Cos'è l'uomo?",
    sottoTitolo: "Eli Tenorio",
    image: {newsImg: newsImg},
    testo: "Ipsum lorem dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Nuovo 1° Vice Presidente della GC",
    sottoTitolo: "David Zic",
    image: {newsImg: newsImg},
    testo: "Ipsum lorem dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Nuovo 2° Vice Presidente della GC",
    sottoTitolo: "Rolly Damaguit",
    image: {damanguitImg: damanguitImg},
    testo: "Ipsum lorem dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Nuovo Segretario della GC",
    sottoTitolo: "Liviu Tudoroiu",
    image: {liviuImg: liviuImg},
    testo: "Ipsum lorem dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Nuovo segretario della regione Europa",
    sottoTitolo: "Sorin Suceava",
    image: {sorinImg: sorinImg},
    testo: "Ipsum lorem dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Delegati della regione Europa",
    sottoTitolo: "rappresentanti Europa",
    image: {newsImg: newsImg},
    testo: "Ipsum lorem dolor sit amet, consectetur adipiscing elit.",
  },
];

export default articoli;