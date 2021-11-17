import React, { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import ErrorIndicator from '../error-indicator/error-indicator';
import Spinner from '../spinner/spinner';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { INGREDIENTS_URL, ORDER_DATA } from '../../utils/constants';
import styles from './app.module.css';

const App = () => {

  const [ data, setData ] = useState([]);
  const [ hasError, setError ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  const [ modalData, setModalData ] = 
    useState({ type: null, data: null });
  const [ modalVisible, setModal ] = useState(false);

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
    <div className="App">
      <AppHeader />
      <main className={`${styles.main}`}>
        { hasError ? <ErrorIndicator /> :
          loading ? <Spinner /> : 
          <>
            <BurgerIngredients data={data} onOpen={handleOpenModal} />
            <BurgerConstructor data={data} onOpen={handleOpenModal} />
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