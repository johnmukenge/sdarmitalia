import newsImg from "../assets/news.jpg";
import sorinImg from "../assets/sorin.jpg";
import liviuImg from "../assets/liviu.jpg";
import damanguitImg from "../assets/damanguit.jpg";

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
    title: "Nuovo segretario della regione Europa",
    sottoTitolo: "Sorin Suceava",
    image: sorinImg,
    content: "Ipsum lorem dolor sit amet, consectetur adipiscing elit.",
    publishedAt: new Date().toISOString(),
    autore: "Team media",
  },
  {
    id: 6,
    title: "Delegati della regione Europa",
    sottoTitolo: "rappresentanti Europa",
    image: newsImg,
    content: "Ipsum lorem dolor sit amet, consectetur adipiscing elit.",
    publishedAt: new Date().toISOString(),
    autore: "Team media",
  },
];

export default notizie;