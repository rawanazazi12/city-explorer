import React, { Component } from 'react';
import { Card, Row, Col } from 'react-bootstrap';

export class Weather extends Component {
    render() {
        return (
            <div>
                {
                    
                    this.props.weather.map(element => {

                        return (
                            <Row>
                                <Card>
                                    <Col>
                                        <Card.Header> 
                                            Date {element.date} Description:{element.description}
                                        </Card.Header>
                                    </Col>
                                </Card>
                            </Row>

                        )
                    })
                }

            </div>
        )
    }
}

export default Weather;
