import { Link, useParams } from "react-router-dom";
import { ConcertStatusEnum, type Concert } from "../types";
import { concerts } from "../data/concert";
import StateMessage from "../components/ui/StateMessage";
import { SlArrowLeftCircle } from "react-icons/sl";
import { FiShoppingCart } from "react-icons/fi";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { useEffect, useState } from "react";
import { getConcertById } from "../services/concertService";
type Props = {
  onAddToCart: (concert: Concert) => void;
}
export default function ConcertDetails({ onAddToCart }: Props) {
  const { id } = useParams();
  const concertId = Number(id);

  const [concert, setConcert] = useState<Concert | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const concert = concerts.find((c) => c.id === concertId);
  console.log("this is the concerts page", concerts)
  if (!concert) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-6">
        <StateMessage
          type="error"
          title="Concert Not Found"
          description="The concert selected was not found"
          actionText="Go Home"
          onAction={() => window.location.href = "/"}
        />
      </main>
    );
  }

  async function loadConcert() {
    try {
      setLoading(true);
      setError(null);
      const data = await getConcertById(concertId);
      setConcert(data);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unknown Error";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!Number.isFinite(concertId)) {
      setError("ID NOT FOUNDED");
      setLoading(false);
      return;
    }
    void loadConcert();
  }, [concertId])

  console.log("this is the concert details page", concert)
  const isSold = concert.status === ConcertStatusEnum.sold_out;
  if (loading) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-6">
        <StateMessage type="loading" title="Loading Concert..." description="Fetching details from Api..."></StateMessage>
      </main>
    )
  }
  return (
    <main className="mx-auto max-w-3xl px-6 py-6">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-brand-700 hover:underline">
        <SlArrowLeftCircle />
        Back to concerts
      </Link>
      {error ?
        <StateMessage type="error" title="Concert not available" description={error ?? "Error"}></StateMessage>
        :
        <section className="mt-4 rounded-card border border-border bg-surface p-6 shadow-card">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="m-0 text-2xl font-semibold tex-text">{concert.title}</h1>
              <p className="mt-2 text-sm text-muted">{concert.genre}</p>
            </div>

            <Badge variant={isSold ? "danger" : "success"}>{isSold ? "SOLD OUT" : "AVAILABLE"}</Badge>
          </div>

          <div className="mt-5 space-y-2 text-sm">
            <p className="m-0 text-text">
              <span className="font-semibold">Date:</span>{" "}
              <span className="text-muted">{concert.date}</span>
            </p>
            <p className="m-0 text-text">
              <span className="font-semibold">Venue:</span>{" "}
              <span className="text-muted">
                {concert.venue} — {concert.city}
              </span>
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="m-0 text-lg font-semibold text-text">${concert.price}</p>

            <Button variant="primary" disabled={isSold} onClick={() => onAddToCart(concert)}>
              <FiShoppingCart />
              {isSold ? "Unavailable" : "Add to cart"}
            </Button>
          </div>
        </section>
      }
    </main>
  );

}