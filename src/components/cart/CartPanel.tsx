import type { CartItem } from "../../types"
import CartItemRow from "./CartItemRow"

type Props = {
    items: CartItem[];
    onRemove: (concertId: number) => void;
    onQtyChange: (concertId: number, qty: number) => void;
    onClear: () => void;
}
export default function CartPanel({ items, onRemove, onQtyChange, onClear }: Props) {
    const totalTickets = items.reduce((acc, item) => acc + item.qty, 0);
    const totalPrice = items.reduce((acc, item) => acc + item.concert.price * item.qty, 0)
    return (
        <aside className="Cart" aria-label="cart">
            <div className="cart-header">
                <h2 className="cart-title">
                    Cart
                </h2>
                <button className="btn" type="button" onClick={() => onClear()} disabled={items.length === 0}>
                    Clear
                </button>
            </div>
            {items.length === 0 ?
                <div className="cart-empty">
                    <p>Your cart is empty</p>
                    <p>Add some ticket from the concerts to see them here</p>
                </div>
                :
                <>
                    {items.map((item) => (
                        <CartItemRow
                            key={item.concert.id}
                            item={item}
                            onQtyChange={onQtyChange}
                            onRemove={onRemove}
                        />
                    ))}
                    <div className="cart-summary">
                        <div className="cart-summary-info">
                            <span>
                                Total Tickets
                            </span>
                            <strong>{totalTickets}</strong>
                        </div>
                        <div className="cart-summary-info">
                            <span>
                                Total Price
                            </span>
                            <strong>{totalPrice}</strong>
                        </div>
                    </div>
                </>
            }
        </aside>
    )
}