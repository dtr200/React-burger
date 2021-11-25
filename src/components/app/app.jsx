import React, { useState, useEffect, useReducer } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import ErrorIndicator from '../error-indicator/error-indicator';
import Spinner from '../spinner/spinner';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { INGREDIENTS_URL, ORDER_DATA, DEFAULT_CART, DEFAULT_PRODUCTS_CART } from 
  '../../utils/constants';
import { DataContext } from '../../services/data-context';
import { BunContext } from '../../services/bun-context';
import { TotalPriceContext } from '../../services/total-price-context';
import { CurrentItemsContext } from '../../services/current-items-context';
import styles from './app.module.css';

const App = () => {

  const [ data, setData ] = useState([]);
  const [ cart, setCart ] = useState([]);
  const [ hasError, setError ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  const [ modalData, setModalData ] = 
    useState({ type: null, data: null });
  const [ modalVisible, setModal ] = useState(false);
  const [ currentBun, setCurrentBun ] = useState({});
  const [ currentItems, setCurrentItems ] = useState([]);
  const [ totalPrice, dispatchTotalPrice ] = useReducer();

  const handleOpenModal = ({ type, id }) => {  
    let title, currentData;

    if(type === 'ingredient' && id){
      title = 'Детали ингредиента';
      currentData = data.find(item => item._id === id);
    }
    else{
      title = '';
      currentData = ORDER_DATA;
    }
    setModalData({ type, title, data: currentData });
    setModal(true);
  }

  const handleCloseModal = () =>
    setModal(false);

  useEffect(() => {
    const getData = async () => {
      try{
        const res = await fetch(INGREDIENTS_URL);
        const json = await res.json();
        setData(json.data);
        setCart(DEFAULT_CART);
        setLoading(false);        
      }
      catch(err){
        setError(true);
        setLoading(false);
      }      
    }

    getData();
  }, []);

  useEffect(() => {
    const bun = data.find(item => 
      item.name === 'Краторная булка N-200i');
      setCurrentBun(bun);

    const products = [];
    data.forEach(item => {
      const amount = DEFAULT_PRODUCTS_CART[item.name];
      if(amount)
        products.push({ item, amount });
    });

    setCurrentItems(products);
  }, [data]);
  
  return (
    <div className="App">
      <AppHeader />
      <main className={`${styles.main}`}>
        { hasError ? <ErrorIndicator /> :
          loading ? <Spinner /> : 
          <>
            <BurgerIngredients 
              data={data}
              cart={cart} 
              onOpen={handleOpenModal} />
            <DataContext.Provider value={data}>
              <BunContext.Provider value={currentBun}>
                <TotalPriceContext.Provider value={{totalPrice, dispatchTotalPrice}}>
                  <CurrentItemsContext.Provider value={currentItems}>
                    <BurgerConstructor onOpen={handleOpenModal} />
                  </CurrentItemsContext.Provider>
                </TotalPriceContext.Provider>
              </BunContext.Provider>
            </DataContext.Provider>
            { modalVisible &&
            <Modal title={modalData.title} onClose={handleCloseModal}>
              { 
                modalData.type === 'ingredient' ? 
                <IngredientDetails { ...modalData.data } /> : 
                <OrderDetails { ...modalData.data }/> 
              }
            </Modal> }
          </>
        }
      </main>
    </div>
  ); 
}

export default App;