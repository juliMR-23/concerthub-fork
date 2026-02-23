import type { Concert } from "../../types";
import ConcertCard from "./ConcertCard";

// Tipo de las props: recibe un arreglo de conciertos
type Props = {
    concerts: Concert[];
    onAddToCart: (concert:Concert)=>void;
}

// Componente que renderiza la lista (grid) de tarjetas de conciertos.
// Usa .map() para recorrer el arreglo y crear un ConcertCard por cada concierto.
// La prop "key" es necesaria en React para identificar cada elemento de la lista de forma única.
export default function ConcertList({ concerts, onAddToCart }: Props) {
    return (
        <section className="grid">
            {concerts.map((c) => (
                <ConcertCard key={c.id} concert={c} onAddToCart={onAddToCart}></ConcertCard>
            ))}
        </section>
    );
}
