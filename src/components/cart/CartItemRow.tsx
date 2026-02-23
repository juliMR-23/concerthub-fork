import type { CartItem } from "../../types"

type Props = {
    item: CartItem;
    onRemove: (concertId: number) => void;
    onQtyChange: (concertId: number, qty: number) => void;
}
export default function CartItemRow({ item, onRemove, onQtyChange }: Props) {
    const { concert, qty } = item;
    return (
        <div className="cardCartRow">
            <div className="cardCartRow-info">
                <div className="cardCartRow-title">
                    {concert.title}
                </div>
                <div className="cardCartRow-meta">
                    {concert.city} - ${concert.price}
                </div>
            </div>

            <div className="cardCartRow-actions">
                <input
                    className="cartInput-qty"
                    type="number"
                    min={1}
                    value={qty}
                    onChange={(e) => onQtyChange(concert.id, Number(e.target.value))}
                />
                <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => onRemove(concert.id)}
                >
                    Remove
                </button>
            </div>
        </div>
    )
}