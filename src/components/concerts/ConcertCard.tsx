import { Link } from "react-router-dom";
import type { Concert } from "../../types";
import { ConcertStatusEnum } from "../../types";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { FiShoppingCart } from "react-icons/fi";
import { formatCOP } from "../../utils/format";
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
    <article className="rounded-card border border-border bg-surface p-4 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          {/* Título del concierto */}
          <h3 className="m-0 text-base font-semibold text-text">{concert.title}</h3>
          {/* Género musical */}
          <span className="mt-1 text-xs text-muted">{concert.genre}</span>
        </div>
        {/* Muestra el estado: "SOLD_OUT" si está agotado, "AVAILABLE" si hay entradas */}
        <Badge variant={isSold ? "danger" : "success"}>
          {isSold ? ConcertStatusEnum.sold_out : ConcertStatusEnum.available}
        </Badge>
      </div>
      <div className="mt-3 space-y-2 text-sm text-text">
        <p className="m-0">
          <span className="font-semibold">Date:</span>{" "}
          <span className="text-muted">{concert.date}</span>
        </p>
        <p className="m-0">
          <span className="font-semibold">Venue:</span>{" "}
          <span className="text-muted">
            {concert.venue} — {concert.city}
          </span>
        </p>
      </div>

      <div className="my-3 rounded-btn  bg-surface px-1 py-2 text-sm font-medium shadow-card hover:bg-gray-50">
        <Link to={`/concerts/${concert.id}`}>
          Details
        </Link>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="m-0 font-semibold text-text">{formatCOP(concert.price)}</p>
        <Button variant="primary" disabled={isSold} onClick={() => onAddToCart(concert)}>
          <FiShoppingCart />
          {isSold ? "Unavailable" : "Add"}
        </Button>
      </div>
    </article>
  );
}