import React, { useState, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import { getIngredients } from '../../services/reducers/reducer';
import styles from './app.module.css';

const App = () => {
  const dispatch = useDispatch();
  const { 
    ingredientsData, 
    ingredientsRequest, 
    ingredientsFailed,
    constructorIngredients 
  } = useSelector(store => store.ingredients);

  const { modal } = useSelector(store => store);
  console.log(modal)
  const {
    modalVisible,
    modalMode,
    modalTitle,
    modalData,
    hasModalError
  } = useSelector(store => store.modal);

  const [ hasError, setError ] = useState(false);
  const [ loading, setLoading ] = useState(false);
/*   const [ modalData, setModalData ] = 
    useState({ type: null, data: null });
  const [ hasModalError, setModalError ] = useState(false);
  const [ modalVisible, setModal ] = useState(false);  */ 

  /* const handleOpenModal = async ({ type, id }) => {  
    let title, currentData;

    if(type === 'ingredient' && id){
      
      
    }
    else{
      title = '';
      const orderBody = {
        ingredients: constructorIngredients.map(product => product.item._id)
      };
      
      try{
        const res = await fetch(ORDER_URL, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(orderBody)
        });
  
        if(!res.ok)
          throw new Error('');

        const data = await res.json();
        currentData = { ...ORDER_DATA, data };
        setModalData({ type, title, data: currentData });
      }
      catch(err){
        setModalError(true);
      }  
    }    
    setModal(true);   
  } */

 /*  const handleCloseModal = () =>
    setModal(false); */

  useEffect(() => {
    dispatch(getIngredients(INGREDIENTS_URL, DEFAULT_CART));
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main}`}>
        { ingredientsFailed ? <ErrorIndicator /> :
          ingredientsRequest ? <Spinner /> : 
          <>
            <BurgerIngredients />
            <BurgerConstructor /* onOpen={handleOpenModal} */ />
            { modalVisible &&
              <Modal title={modalTitle}>
                { 
                  hasModalError ?
                  <ErrorIndicator /> :             
                  (modalMode === 'ingredient' ? 
                  <IngredientDetails { ...modalData } /> : 
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