import React, { useState, useEffect, useReducer } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import ErrorIndicator from '../error-indicator/error-indicator';
import Spinner from '../spinner/spinner';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { INGREDIENTS_URL, ORDER_DATA, DEFAULT_CART, ORDER_URL } from 
  '../../utils/constants';
import { TotalPriceContext } from '../../services/total-price-context';
import { CartContext } from '../../services/cart-context';
import styles from './app.module.css';

const App = () => {

  const [ data, setData ] = useState([]);
  const [ cart, setCart ] = useState([]);
  const [ hasError, setError ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  const [ modalData, setModalData ] = 
    useState({ type: null, data: null });
  const [ hasModalError, setModalError ] = useState(false);
  const [ modalVisible, setModal ] = useState(false);  

  const handleOpenModal = async ({ type, id }) => {  
    let title, currentData;

    if(type === 'ingredient' && id){
      title = 'Детали ингредиента';
      currentData = data.find(item => item._id === id);
      setModalData({ type, title, data: currentData });
    }
    else{
      title = '';
      const orderBody = {
        ingredients: cart.map(product => product.item._id)
      };
      
      try{
        const res = await fetch(ORDER_URL, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(orderBody)
        });
  
        if(!res.ok)
          throw new Error('');

        const data = String(await res.json());
        currentData = { ...ORDER_DATA, data };
        setModalData({ type, title, data: currentData });
      }
      catch(err){
        setModalError(true);
      }  
    }    
    setModal(true);   
  }

  const handleCloseModal = () =>
    setModal(false);

  useEffect(() => {
    const getData = async () => {
      try{
        const res = await fetch(INGREDIENTS_URL);
        const json = await res.json();
        
        const products = [];
        json.data.forEach(item => {
          for(let i = 0; i < DEFAULT_CART.length; i++){
            if(DEFAULT_CART[i].id === item._id)
              products.push(
                { item, pcs: DEFAULT_CART[i].pcs }
              );
          }
        });

        setData(json.data);
        setCart(products);
        setLoading(false); 
      }
      catch(err){
        setError(true);
        setLoading(false);
      }      
    }

    getData();
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main}`}>
        { hasError ? <ErrorIndicator /> :
          loading ? <Spinner /> : 
          <>
            <BurgerIngredients 
              data={data}
              cart={cart} 
              onOpen={handleOpenModal} />
            <CartContext.Provider value={cart}>
              <BurgerConstructor onOpen={handleOpenModal} />
            </CartContext.Provider>
            { modalVisible &&
              <Modal title={modalData.title} onClose={handleCloseModal}>
                { 
                  hasModalError ?
                  <ErrorIndicator /> :             
                  (modalData.type === 'ingredient' ? 
                  <IngredientDetails { ...modalData.data } /> : 
                  <OrderDetails { ...modalData.data }/>)
                }
              </Modal> }
          </>
        }
      </main>
    </div>
  );
}

export default App;