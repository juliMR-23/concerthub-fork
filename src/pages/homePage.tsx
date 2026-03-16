import { useState, useMemo, useEffect } from 'react'
import ConcertList from '../components/concerts/ConcertList'
// import { concerts } from '../data/concert'
import FilterBar from '../components/concerts/FilterBar'
import type { CartItem, Concert } from '../types'
import CartPanel from '../components/cart/CartPanel'
import StateMessage from '../components/ui/StateMessage'
import { getConcerts } from '../services/concertService'

type Props = {
  cart: CartItem[];
  onAddToCart: (concert: Concert) => void;
  onRemove: (concertId: number) => void;
  onQtyChange: (concertId: number, qty: number) => void;
  onClearCart: () => void;
}
export default function HomePage({ cart, onAddToCart, onRemove, onQtyChange, onClearCart }: Props) {
  /* =============================== Estados UX simulados =============================== */
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>("");

  //  ---------------- CLASE SERVICIOS -----------------
  const [concerts, setConcerts] = useState<Concert[]>([]);
  async function loadConcerts() {
    try {
      setLoading(true);
      setError(null);
      const data = await getConcerts();
      setConcerts(data);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unknown error";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadConcerts();
  }, [])

  /* =============================== CLASE FILTROS =============================== */
  // Estado para el texto de búsqueda que escribe el usuario
  const [searchTerm, setSearchTerm] = useState<string>("");
  // Estado para el género musical seleccionado en el filtro ("ALL" = todos los géneros)
  const [selectedGenre, setSelectedGenre] = useState<string>("ALL");
  // Estado para la ciudad seleccionada en el filtro ("ALL" = todas las ciudades)
  const [selectedCity, setSelectedCity] = useState<string>("ALL");
  // Estado booleano para mostrar solo conciertos disponibles (no agotados)
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false)

  // useMemo extrae los géneros únicos del arreglo de conciertos y los ordena alfabéticamente.
  // El arreglo vacío [] como dependencia significa que solo se calcula una vez al montar el componente.
  const genres = useMemo(() => {
    return Array.from(new Set(concerts.map((c) => c.genre).sort()))
  }, [concerts]);

  // Igual que arriba, pero para las ciudades únicas
  const cities = useMemo(() => {
    return Array.from(new Set(concerts.map((c) => c.city).sort()))
  }, [concerts]);

  // useMemo filtra los conciertos cada vez que cambia alguno de los filtros.
  // Se recalcula automáticamente cuando cambian las dependencias del arreglo [searchTerm, selectedCity, ...].
  const filteredConcerts = useMemo(() => {
    // Limpiamos el término de búsqueda: quitamos espacios y lo convertimos a minúsculas
    const term = searchTerm.trim().toLowerCase();
    console.log('the term in input is:', term);

    // Filtramos el arreglo de conciertos aplicando TODOS los filtros a la vez
    const results = concerts.filter((c) => {
      // Verifica si el término coincide con el título, lugar o ciudad
      const matchesSearch = c.title.toLowerCase().includes(term) ||
        c.venue.toLowerCase().includes(term) ||
        c.city.toLowerCase().includes(term);
      // Verifica si la ciudad coincide con la seleccionada (o si es "ALL", pasan todas)
      const matchedCity = selectedCity === 'ALL' || c.city === selectedCity;
      // Verifica si el género coincide con el seleccionado
      const matchedGenre = selectedGenre === 'ALL' || c.genre === selectedGenre;
      // Si onlyAvailable es true, solo pasan los conciertos con estado "AVAILABLE"
      const matchesAvailability = !onlyAvailable || c.status === "AVAILABLE";

      // El concierto solo se incluye si cumple TODOS los filtros
      return matchesSearch && matchedCity && matchedGenre && matchesAvailability
    });
    return results;
    // se ejecuta cada vez que cambia el estado de los filtros
  }, [concerts, searchTerm, selectedCity, selectedGenre, onlyAvailable]);

  // Función para reiniciar todos los filtros a sus valores por defecto
  function handleReset() {
    setSearchTerm("");
    setSelectedCity("ALL");
    setSelectedGenre("ALL");
    setOnlyAvailable(false);
  }

  // ====== Vista principal con estados ======
  const showEmpty = !loading && !error && filteredConcerts.length === 0;

  return (
    <main className='mx-auto max-w-6xl px-6 py-6'>
      <div className="flex flex-col gap-2">
        <h1 className="m-0 text-2xl font-semibold">Upcoming Concerts...</h1>

        {/* Solo para demo docente (puedes quitarlo luego) */}
        {/* <div className="mt-2 flex items-center gap-2">
          <Button variant="secondary" onClick={() => setForceError((v) => !v)}>
            <FiAlertOctagon />
            Toggle error (demo)
          </Button>
        </div> */}
      </div>

      {/* Barra de filtros: recibe los estados y las funciones para actualizarlos (props) */}
      <FilterBar
        searchTerm={searchTerm}
        onSearchTerm={setSearchTerm}
        genres={genres}
        selectedGenre={selectedGenre}
        onSelectedGenre={setSelectedGenre}
        cities={cities}
        selectedCity={selectedCity}
        onSelectedCity={setSelectedCity}
        onlyAvailable={onlyAvailable}
        onSetOnlyAvailable={setOnlyAvailable}
        onReset={handleReset}
      />
      <div className="mt-3 flex justify-end">
        <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted shadow-card">
          Results: {filteredConcerts.length}
        </span>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[2fr,1fr]">
        <section>
          {loading ? (
            <StateMessage type="loading" title="Loading concerts..." description="Please wait a moment." />
          ) : error ? (
            <StateMessage
              type="error"
              title="Failed to load concerts"
              description={error}
              actionText="Try again"
              onAction={() => loadConcerts()}
            />
          ) : showEmpty ? (
            <StateMessage
              type="empty"
              title="No results"
              description="Try changing the filters or resetting them."
              actionText="Reset filters"
              onAction={handleReset}
            />
          ) : (
            <ConcertList concerts={filteredConcerts} onAddToCart={onAddToCart} />
          )}
        </section>

        <CartPanel items={cart} onRemove={onRemove} onQtyChange={onQtyChange} onClear={onClearCart} />
      </div>
    </main>
  );
}
