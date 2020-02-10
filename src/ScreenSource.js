import React, { useState, useEffect } from 'react';
import './App.css';
import { List, Avatar } from 'antd';
import {Link} from 'react-router-dom';
import Nav from './Nav'

function ScreenSource() {

  const [sourceList, setSourceList] = useState([]);

  useEffect(() => {
    var fetchData = async () => {
      var rawResponse = await fetch(`https://newsapi.org/v2/sources?&country=fr&language=fr&apiKey=29a762499850467ebfa763f8c8b6da4c`);
      var response = await rawResponse.json();
      console.log(response)
      setSourceList(response.sources);
    }
    fetchData();
  }, []);

  return (
    <div>
        <Nav/>
       
       <div className="Banner"/>

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
      </div>
  );
}

export default ScreenSource;
