import React, {useState} from 'react';
//REDUX
import {connect} from 'react-redux';
import './App.css';
import { Card, Icon, Modal } from 'antd';
import Nav from './Nav'

const { Meta } = Card;

function ScreenMyArticles(props) {
  
  //modal
  const [visible, setVisible] = useState(false);
  const [modal, setModal] = useState({
    title: 'TEST',
    text:'test'
  })

  var openModal = (toTitle, toText, link) => {
    var toTextDis = [toText];
    setModal({title: toTitle, text: toTextDis, link: link});
    setVisible(true);
  }
  
  var handleCancel = () => {
    setVisible(false);
  };

  var resultsDis =  props.articleToAdd.map((article,i) => (

    <div style={{display:'flex',justifyContent:'center'}}>
  
            <Card
            style={{width: 300, margin:'15px', display:'flex', flexDirection: 'column', justifyContent:'space-between'}}
            cover={<img alt="example" src={article.urlToImage} />}
            actions={[
            <Icon type="read" key="ellipsis2" onClick={() => openModal(article.title, article.content, article.url)} />,
            <Icon type="delete" key="ellipsis" onClick={() => {props.removeFromWishList(i)}} />]}>
  
            <Meta
            title={article.title}
            description={article.description}
            />
  
            </Card>
    </div>
));

  if (!props.articleToAdd[0]) {
    return (
      <div>
        <Nav/>
        <div className="Banner"/>
        <h1>No articles yet.</h1>
      </div>
      );
  } else {
    return (
      <div>
        <Nav/>
        <div className="Banner"/>
        <div className="Card">
          {resultsDis}
        </div>
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

function mapStateToProps(state) {
  return { articleToAdd: state.wishList}
}

function removeArticle(dispatch) {
  return {
    removeFromWishList: function(position) {
      console.log('position ' + position)
      dispatch( {type: 'rmv', pos: position});
    }
  }
 }

export default connect(
  mapStateToProps,
  removeArticle,
)(ScreenMyArticles);
