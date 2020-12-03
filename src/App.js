import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import axios from 'axios';

function App() {

  const [searchText, setSearchText] = useState('')
  const [films, setFilms] = useState([])
 
  const url = `http://www.omdbapi.com/?i=tt7286456&apikey=34fd8839&s=${searchText}`


   const onTextChange = async (e) => {
     setSearchText(e.target.value)
     const res = await axios.get(url)
   
     setFilms(res.data.Search)
     console.log(films)
   }
   

  return (
    <>
        <Container>
            <h1 className='mt-4'>MovieStore</h1>
            <Row>
          
            <input 
                   style={{width: '90%', margin: '0 auto'}}
                   type='text'
                   placeholder='Try look for harry... or whatever film you like...'
                   name="searchText"
                   onChange={onTextChange}
                   value={searchText}
                   className='mt-4 mb-4'
                 
            />
           
              
            </Row>
            <Row style={{color: "#000"}}>
              { films?.map(item => {
                return (
                  <Col lg={3} md={3} sm={12} key={item.imdbID} >
                        
                          <Card style={{height: 'calc(100% - 10px)' }}>
                          <Card.Img variant="top" src={item["Poster"]} style={{ objectFit: 'cover' }}/>
                          <Card.Body>
                            <Card.Title>{item["Title"]}</Card.Title>
                            <Card.Text>
                            {item["Year"]}
                            </Card.Text>
                            <Button variant="primary">Details</Button>
                          </Card.Body>
                        </Card>
                  </Col>

                )
              })}
        
            </Row>
        </Container>
      
    </>
  );
}

export default App;
