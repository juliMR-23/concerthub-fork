// Tipo literal que solo permite dos valores posibles para el estado de un concierto
export type ConcertStatus = "AVAILABLE" | "SOLD_OUT";

// Enum que mapea los estados del concierto a sus valores de texto.
// Usar un enum hace el código más legible y evita errores al escribir los strings manualmente.
export enum ConcertStatusEnum {
    available = "AVAILABLE",
    sold_out = "SOLD_OUT"
  }
  
// Interfaz que define la estructura de un objeto Concierto.
// Cada propiedad representa un dato del concierto que se mostrará en la app.
export interface Concert {
    id: number;
    title: string;
    date: string;
    venue: string;
    city: string;
    price: number;
    genre: string
    status: ConcertStatus;
}

export interface CartItem{
    concert:Concert;
    qty: number;
}