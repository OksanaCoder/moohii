import React, { Component } from 'react'
import { Container, Col, Row, Card, Button } from 'react-bootstrap'
import { useParams , useHistory, useLocation} from "react-router-dom";

const DetailsPage = ({films}) => {

    const history = useHistory();
    const location = useLocation();

    const { imdbID } = useParams()
    console.log('props', films, 'params', imdbID  )
    const filtered = films.filter(i => i.imdbID === imdbID)
    return (
        <Container className='mb-3'>
            <Row>
            {filtered.map(item => {
                    return (
                        <>   
                <Col>
                    <Card style={{ width: '100%' }} className='mt-4'>
                    <Card.Img style={{width: '200px', padding :'20px'}} src={item["Poster"]}></Card.Img>
                    <Card.Body>
                    <Card.Title>Movie Title: <h3>{item["Title"]}</h3></Card.Title>
                    <Card.Text>
                    <h6>Year:</h6>    
                    <h5>{item["Year"]}</h5>
                    </Card.Text>
                    <Button style={{background: '#CE0A03', border: 'none' }} variant="primary" onClick={() => history.goBack() }>Go on main page</Button>
                    </Card.Body>
                    </Card>
                 </Col>
                </>
                )
                })}
        
            </Row>
        </Container>
    )
}


export default DetailsPage