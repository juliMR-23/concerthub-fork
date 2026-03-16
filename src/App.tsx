// Importamos los hooks de React:
// - useState: para manejar el estado local del componente

import { useState } from 'react'
import Navbar from './components/layout/Navbar'
import type { CartItem, Concert } from './types'
import { ConcertStatusEnum } from './types'
import { Route, Routes, HashRouter } from 'react-router-dom'
import HomePage from './pages/homePage'
import CartPage from './pages/cartPage'
import NotFoundPage from './pages/notFoundPage'
import ConcertDetails from './pages/concertDetails'
import LoginPage from './pages/loginPage'
import SignUpPage from './pages/signUpPage'
import Modal from './components/ui/Modal'

function App() {

  /* =============================== CLASE CARRITO =============================== */
  const [cart, setCart] = useState<CartItem[]>([]);

  function addToCart(concert: Concert) {
    if (concert.status === ConcertStatusEnum.sold_out) return;
    const isNewConcert = !cart.some((item) => item.concert.id === concert.id);
    if (isNewConcert) {
      Modal.show("Concert added to cart", "The concert has been added to your cart");
    }

    setCart((prev) => {
      // .find() es un metodo que se usa para buscar un elemento en un array
      // y devuelve el primer elemento que cumple la condicion
      // en este caso, se busca el elemento que tiene el mismo id que el concierto que se pasa por parametro
      // si se encuentra, se actualiza el qty
      // si no, se agrega el concierto al carrito
      const existing = prev.find((i) => i.concert.id === concert.id);
      if (existing) {
        return prev.map((i) => i.concert.id === concert.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { concert, qty: 1 }]
    });
  }
  function removeFromCart(concertId: number) {
    // .filter() es un metodo que se usa para filtrar un array
    // y devuelve un nuevo array con los elementos que cumplen la condicion
    // en este caso, se filtra el array para que no incluya el elemento que tiene el mismo id que el concierto que se pasa por parametro
    // esto hace que se elimine el concierto del carrito
    setCart((prev) => prev.filter((i) => i.concert.id !== concertId));
  }
  function updateQty(concertId: number, qty: number) {
    // .isFinite() es un metodo que se usa para verificar si un numero es finito
    // y devuelve true si es finito, false si no es finito
    // en este caso, se verifica si el qty es un numero finito
    // si no es un numero finito, se retorna
    if (!Number.isFinite(qty)) return;
    console.log('the qty is:', qty);
    setCart((prev) => prev.map((i) => (i.concert.id === concertId ?
      // Habia cometido un error aqui, estaba usando i.qty en lugar de qty
      // esto hacia que no se actualizara el qty correctamente
      // ahora se actualiza el qty correctamente
      { ...i, qty: qty } : i))
    )
  }
  function clearCart() {
    setCart([]);
  }
  return (
    <div className='min-h-screen bg-page'>
      {/* Barra de navegación superior */}
      <Navbar />
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                cart={cart}
                onAddToCart={addToCart}
                onQtyChange={updateQty}
                onClearCart={clearCart}
                onRemove={removeFromCart}
              />
            }
          ></Route>
          <Route path="/concerts/:id" element={<ConcertDetails onAddToCart={addToCart} />}></Route>
          <Route path="/cart" element={
            <CartPage
              onClearCart={clearCart}
              onQtyChange={updateQty}
              onRemoveFromCart={removeFromCart}
              cart={cart}
            />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/signup' element={<SignUpPage />}></Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App
