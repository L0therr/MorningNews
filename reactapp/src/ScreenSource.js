import React, { useState, useEffect } from 'react';
//REDUX
import {connect} from 'react-redux';

import './App.css';
import { List, Avatar, Select, Spin, Icon } from 'antd';
import {Link} from 'react-router-dom';
import Nav from './Nav'

function ScreenSource(props) {

  const [sourceList, setSourceList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    var fetchData = async () => {
      setIsLoading(true)
      var rawResponse = await fetch(`https://newsapi.org/v2/sources?&language=${props.getLanguage}&apiKey=29a762499850467ebfa763f8c8b6da4c`);
      var response = await rawResponse.json();
      setSourceList(response.sources);
      setIsLoading(false);
    }
    fetchData();
  }, [props.getLanguage]);

  //SELECT LANG
  const { Option } = Select;
  function onChange(value) {
    props.upCurrentLanguage(value);
  }
  //SELECT LANG END

  //spinner
  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

  return (
    <div>
        <Nav/>
       
       <div className="Banner"/>
       <div className="HomeThemes">
        <img style={{ width: 18, marginRight: "1em" }} src={`/images/${props.getLanguage}.png`} alt="language flag" />
       <Select
          style={{ width: 200 }}
          defaultValue={props.getLanguage}
          onChange={onChange}
        >
          <Option value="en">English</Option>
          <Option value="fr">Français</Option>
          <Option value="ar">العربية</Option>
          <Option value="de">Deutsch</Option>
          <Option value="es">Español</Option>
          <Option value="he">עברית</Option>
          <Option value="it">Italiano</Option>
          <Option value="nl">Nederlands, Vlaams</Option>
          <Option value="no">Norsk</Option>
          <Option value="pt">Português</Option>
          <Option value="ru">русский</Option>
          <Option value="se">Davvisámegiella</Option>
          <Option value="ud">(ud)</Option>
          <Option value="zh">中文 (Zhōngwén), 汉语, 漢語</Option>
        </Select>
        </div>

        <Spin indicator={antIcon} size="large" spinning={isLoading}>
        <div className="HomeThemes">
              <List
                  itemLayout="horizontal"
                  dataSource={sourceList}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src="images/general.png" />}
                        title={<Link to={`/articles-by-source/${item.id}`} >{item.name}</Link>}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
          </div>
      </Spin>
      </div>
  );
}

function getlanguageFromStore(state) {
  return { getLanguage: state.currentLanguage }
}

function changeCurrentLanguage(dispatch) {
  return {
    upCurrentLanguage: function(lang) {
        dispatch( {type: 'change', toChange: lang} )
    }
  }
}

export default connect(
  getlanguageFromStore, 
  changeCurrentLanguage
)(ScreenSource);
