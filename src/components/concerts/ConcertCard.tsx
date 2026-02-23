import type { Concert } from "../../types";
import { ConcertStatusEnum } from "../../types";
// Definimos el tipo de las props que recibe este componente.
// Solo necesita un objeto de tipo Concert.
type Props = {
    concert: Concert;
    onAddToCart: (concert: Concert) => void;
}

// Componente que muestra la tarjeta individual de un concierto.
// Recibe un objeto "concert" por destructuración de props.
export default function ConcertCard({ concert, onAddToCart }: Props) {
    // Variable booleana que indica si el concierto está agotado
    const isSold: boolean = concert.status === ConcertStatusEnum.sold_out;

    return (
        <article className="concert-card">
            <div className="concert-card-header">
                {/* Título del concierto */}
                <h3 className="concert-card-title">
                    {concert.title}
                </h3>
                {/* Género musical */}
                <span className="concert-card-genre">
                    {concert.genre}
                </span>
            </div>
            <div className="concert-card-badges">
                {/* Muestra el estado: "SOLD_OUT" si está agotado, "AVAILABLE" si hay entradas */}
                <span className={isSold ? "badge badge--danger" : "badge badge--success"}>
                    {isSold ? ConcertStatusEnum.sold_out : ConcertStatusEnum.available}
                </span>
            </div>
            {/* Información adicional: fecha, precio y ubicación */}
            <p className="concert-card-meta">
                Date: {concert.date}
            </p>
            <p className="concert-card-meta">
                Address: {concert.venue} - City: {concert.city}
            </p>
            <p className="concert-card-price">
                ${concert.price}
            </p>
            <button
                className="concert-card-btn"
                type="button" disabled={isSold}
                onClick={() => onAddToCart(concert)}>
                {isSold ? "Not available" : "Add to cart"}
            </button>
        </article>
    );
}