import React, { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import ErrorIndicator from '../error-indicator/error-indicator';
import Spinner from '../spinner/spinner';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

import styles from './app.module.css';

const url = 'https://norma.nomoreparties.space/api/ingredients';
const orderData = {
  num: '034536',
  image: '../../images/done.png',
  description: 'Ваш заказ начали готовить', 
  extra: 'Дождитесь готовности на орбитальной станции'
}

const App = () => {

  const [ data, setData ] = useState([]);
  const [ hasError, setError ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  const [ modalData, setModalData ] = 
    useState({ type: null, data: null });
  const [ modalVisible, setModal ] = useState(false);

  const handleOpenModal = ({ type, id }) => {    
    if(type === 'ingredient' && id){
      const currentItemData = data.find(item => item._id === id);
      setModalData({ type, title: 'Детали ингредиента', data: currentItemData });
    }
    else{
      setModalData({ type, title: '', data: orderData });
    }
    setModal(true);
  }

  const handleCloseModal = () => {
    setModal(false);
  }

  useEffect(() => {
    const getData = async () => {
      try{
        const res = await fetch(url);
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

  const modalChildren = modalData.type === 'ingredient' ? 
    <IngredientDetails { ...modalData.data } /> : 
    <OrderDetails { ...modalData.data }/>;

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
              { modalChildren }
            </Modal> }
          </>
        }
      </main>
    </div>
  ); 
}

export default App;