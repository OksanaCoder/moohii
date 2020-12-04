import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import axios from 'axios';
import DetailPage from './components/DetailPage'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { createMemoryHistory } from 'history'

function App() {

  const [searchText, setSearchText] = useState('')
  const [films, setFilms] = useState([])
 
  const url = `http://www.omdbapi.com/?i=tt7286456&apikey=34fd8839&s=${searchText}`


   const onTextChange = async (e) => {
     setSearchText(e.target.value)
  
   }
   useEffect(() => {
   loadData()
   }, [searchText])
   const loadData = async () => {
    const res = await axios.get(url)
   
    setFilms(res.data.Search)
    console.log(films)
   }

   const history = createMemoryHistory()
  return (
    <>
          <Router>
            
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
            <Route exact path='/film/:imdbID' component={(props) => <DetailPage films={films} />}/>

              
            </Row>
            <Row style={{color: "#000"}}>
              { films?.map(item => {
                return (
                  <Col lg={3} md={4} sm={12} key={item.imdbID} >
                        
                          {/* <Card style={{height: 'calc(100% - 10px)' }}>*/}
                           <Card style={{display: 'flex', flexDirection: 'column', height: 'calc(100% - 10px)'}}> 
                          <Card.Img variant="top" src={item["Poster"]} style={{ objectFit: 'cover', flexGrow: 3 , height: '380px'}}/>
                          <Card.Body style={{ flexGrow: 1}}>
                            <Card.Title>{item["Title"]}</Card.Title>
                            <Card.Text>
                            {item["Year"]}
                            </Card.Text>
                            <Link to={`/film/${item.imdbID}`}><Button variant="primary">Details</Button></Link>
                          </Card.Body>
                        </Card>
                  </Col>

                )
              })}
        
            </Row>
        </Container>
    
   
      </Router>
    </>
  );
}

export default App;
