import React, {useState} from 'react';
import './App.css';



const App = () => {

  const [mocoData,setMocoData] = useState([
      {id:1,order:2},
      {id:2,order:1},
      {id:3,order:3},
      {id:4,order:4},
      {id:5,order:6},
      {id:6,order:7},
      {id:7,order:5}
      ])

  function dragStartHandler(e, item) {
    console.log('drag', item)
    setCurrentCard(item);
  }

  function dragEndHandler(e) {

      e.target.style.border = "3px solid transparent";
      e.target.style.background = "white";
  }

  function dragOverHandler(e) {
    e.preventDefault()
    e.target.style.border = "3px solid green";
    e.target.style.background = "lightgray";
  }

  function dropHandler(e, image) {
    e.preventDefault()
    e.target.style.border = "3px solid transparent";
    e.target.style.background = "white";




      setMocoData(mocoData.map(c => {
      if(c.id === image.id) {
        return({...c, order: currentCard.order})
      }
      if(c.id === currentCard.id) {
        return ({...c, order: image.order})
      }
      return c;
    }))
  }

  const sortCards = (a,b) => {
    if(a.order > b.order){
      return 1;
    } else {
      return -1;
    }
  }

  const [currentCard,setCurrentCard] = useState(null);

  return (
      <div className={"app_container"}>
        <div  className="mpt_item_wrapper">
          {
            mocoData.length ?
                mocoData.sort(sortCards).map((item,index) => {

                  return(
                      <div
                          onDragStart={ e => dragStartHandler(e, item)} // Начало перетаскивания, срабатывает в момент, когда взяли карточку
                          onDragLeave={e => dragEndHandler(e)} // Если вышли за пределы другой карточки
                          onDragEnd={e => dragEndHandler(e)} // Если отпустили кнопку мыши (завершили перетягивание)
                          onDragOver={e => dragOverHandler(e)} // Если находимся над каким-либо другим обьектом
                          onDrop={e => dropHandler(e,item)} // Если мы отпустили карточку (картинку) и хотим запустить какое-либо действие
                          draggable={true}
                          key={index} className={"mpt_item"}
                          >
                            {item.id}
                     </div>);
                 }) : ""
          }
        </div>

      </div>
  );
};

export default App;
