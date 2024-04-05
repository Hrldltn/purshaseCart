import {useEffect, useState} from 'react'

import { db } from './data/data'
import Header from "./components/Header"
import Footer from "./components/Footer"
import Guitar from "./components/Guitar"


function App() {

  const initialCart = () =>{
    const localStorageCart = localStorage.getItem('cart')

    return localStorageCart ? JSON.parse(localStorageCart) : []
  }
  

  const [data] = useState(db)
  const [cart, setCart] = useState(initialCart)


  useEffect(() =>{
    localStorage.setItem('cart', JSON.stringify(cart))
   
  },[cart])

  function addToCart(item){
    const itemExist = cart.findIndex((guitar)=> guitar.id === item.id)

    if(itemExist >= 0){ 
      const newCart = [...cart]
      newCart[itemExist].quantity++
      setCart(newCart)
      return
    }else{
      item.quantity= 1
      setCart([...cart, item])
    }

  }

  function sumar_quantity(id){
    const newCart = cart.map(guitar => {
      if(guitar.id === id){
        guitar.quantity++
      }
      return guitar
    })

    setCart(newCart)
  }


  function restar_quantity(id){
    const newCart = cart.map(guitar => {
      if(guitar.id === id && guitar.quantity > 1){
        guitar.quantity--
      }else {
        guitar.quantity = 0
      }
      return guitar
    })

    setCart(newCart)
  }

  function delete_cart(id){
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  function clear_all(){
    setCart([])
  }


  return (
    <>
        <Header
          cart={cart}
          delete_cart={delete_cart}
          sumar_quantity={sumar_quantity}
          restar_quantity={restar_quantity}
          clear_all={clear_all}
  
        />
        
            <main className="container-xl mt-5">
              <h2 className="text-center">Nuestra Colección</h2>

              <div className="row mt-5">
                {data.map((guitar) => (
                  <Guitar
                    key={guitar.id}
                    guitar={guitar} 
                    addToCart={addToCart}
                  />
                ))}
              </div>
            </main>

        <Footer/>

    </>
  )
}

export default App
