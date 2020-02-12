import React, { useState, useEffect } from 'react';
import './App.css';
import { Card, Icon, Modal, Popover, Spin } from 'antd';
import Nav from './Nav';


const { Meta } = Card;


function Search(props) {

  const [error, setError] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [resultsNb, setResultsNb] = useState(0);
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [modal, setModal] = useState({
    title: 'TEST',
    text:'test'
  })


  useEffect(() => {
    var fetchData = async () => {
      setIsLoading(true);
      var rawResponse = await fetch(`https://newsapi.org/v2/everything?language=fr&q=${props.match.params.word}&pageSize=100&sortBy=popularity&apiKey=29a762499850467ebfa763f8c8b6da4c&page=${page}`);
      var response = await rawResponse.json();
      if (response.totalResults !== 0) {
        setNewsList(response.articles);
        setIsLoading(false);
      } else {
        setError(true);
      }
    }
    fetchData();
  }, [page,]);

var totalResultDis = [];
  if(!newsList){
    totalResultDis.push(<div className="resultsNb">Vous avez atteins la fin...</div>)
  } else {
    totalResultDis.push(<div className="resultsNb">Total Results : {resultsNb} </div>)
    var resultsDis =  newsList.map((article,i) => (

      <div  style={{display:'flex',justifyContent:'center'}}>
        <Card
          style={{width: 300,margin:'15px',display:'flex',flexDirection: 'column',justifyContent:'space-between'}}
          cover={
            <img
              alt="MISSING PIC"
              src={article.urlToImage}
          />
          }
          actions={[
              <Icon type="read" onClick={() => openModal(article.title, article.content, article.url)} key="ellipsis2" />,
              <Popover content={
                `Author : ${article.author}`             
              } 
              title="More Infos" trigger="click">
                 <Icon type="dash" />
              </Popover>,
              <Icon type="like" key="ellipsis" />,
          ]}
          >
          <Meta
            title={article.title}
            description={article.description}
          />
        </Card>
       </div>
  ));
  }

//pagination
var pagination = [];
if(page !== 1) {
  pagination.push(<Icon type="left-circle" onClick={()=>setPage(page-1)} className="paginationIco" />)
  pagination.push(<Icon type="right-circle" onClick={()=>setPage(page+1)} className="paginationIco" />)
} else {
  pagination = [<Icon type="right-circle" onClick={()=>setPage(page+1)} className="paginationIco" />]
} if (!newsList) {
  pagination = [<Icon type="left-circle" onClick={()=>setPage(page-1)} className="paginationIco" />]
}

//modal
var openModal = (toTitle, toText, link) => {
  var toTextDis = [toText];
  setModal({title: toTitle, text: toTextDis, link: link});
  setVisible(true);
}

var handleCancel = () => {
  setVisible(false);
};


//spinner
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;



if(error === true){

  return (
    <div>
      <Nav/>
      <div className="Banner"/>
      <div className="resultsNb">
        Sorry nothing was found with : {props.match.params.word}.
      </div>
    </div>
  )

} else {

  return (
    <div>
      <Nav/>
      <div className="Banner"/>
      <Spin indicator={antIcon} style={{position:"absolute"}} size="large" spinning={isLoading}>
        <div className="Card">
          {resultsDis}
        </div>
      </Spin>

      <Modal style={{}}
          title={modal.title}
          visible={visible}
          onCancel={()=>handleCancel()}
          footer={[
            <a target="_blank" href={modal.link} >
            <Icon type="info-circle" /> Read the full article</a>
          ]}
          >
          <p>{modal.text}</p>
        </Modal>
    </div>
  );
}
}

export default Search;