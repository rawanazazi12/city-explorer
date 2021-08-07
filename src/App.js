import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';

require('dotenv').config();
// import Weather from './Weather';


export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationData: {},
      // locationLatitude: '',
      // locationLongitude: '',
      viewMapImage: false,
      viewError: false,
      errorMessage: 'ERROR: INVALID INPUT ',
      weatherDataArr: [],
      viewWeatherData: false,
      forecastData: [],
      moviesDataArr: [],


    }
  }

  submittingForm = async (e) => {
    e.preventDefault();
    const location = e.target.locationName.value;
    try {
      const response = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_TOKEN}&q=${location}&format=json`);


      const locationIqData = response.data[0];
      // const locationName = locationIqData.display_name.split(',')[0];


      const weatherResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/weather?lat=${locationIqData.lat}&lon=${locationIqData.lon}`);

      this.setState({
        locationData: locationIqData,
        viewMapImage: !false,
        viewError: false,
        forecastData: weatherResponse.data,
        // weatherDataArr: weatherResponse,

        viewWeatherData: true,
        // viewError: false,

      })
      const movieUrl = `${process.env.REACT_APP_SERVER_URL}/movies?query=${location}`;
      const moviesGet = await axios.get(movieUrl);
      console.log(moviesGet);

      this.setState({
        moviesDataArr: moviesGet.data,
        show: true,
        viewError: false,
      });

    }
    catch (error) {
      this.setState(
        {
          viewError: true,
        }
      )
    }

  }

  render() {
    return (
      <div>
        <Header />
        <div style={{ textAlign: 'center' }}>
          <form onSubmit={this.submittingForm}>
            <h4 style={{ marginTop: '5%', marginBottom: '2%', textAlign: 'center', color: 'gray' }}>Enter a location you want to search about</h4>
            <label style={{ color: 'brown', fontSize: '18px', marginRight: '1%', fontWeight: 'bold' }}>
              Location Name
            </label>
            <input class='input' style={{ borderBlockStyle: 'dashed', backgroundColor: 'rgb(255, 247, 236)' }} name='locationName' type='text' >
            </input>
            <input type='submit' value='Explore!' style={{ fontWeight: 'bold', color: 'brown', marginLeft: '1%' }}>
            </input>
          </form>

          {this.state.locationData.display_name &&
            <div>
              <Container>
                <Row>
                  <Col Col lg={12} xs="auto">
                    <Card style={{ width: '19rem', height: '29rem', marginLeft: '26.5rem', marginBlock: '2rem', textAlign: 'center' }}>
                      <Card.Img variant='top' src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_TOKEN}&center=${this.state.locationData.lat},${this.state.locationData.lon}`} alt='Map' style={{ width: '19rem', height: '29rem' }} />
                      <Card.Body>
                        <Card.Title>Location Data</Card.Title>

                        <Card.Text>
                          {this.state.locationData.display_name}
                          <br />
                          Latitude: {this.state.locationData.lat}
                          <br />
                          Longitude: {this.state.locationData.lon}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>
              <h4 style={{ marginTop: '2%', marginBottom: '2%',marginLeft:'3rem', textAlign: 'center', color: 'gray' }}>
                Weather Forecast Data
              </h4>


            </div>


          }
          <div style={{ textAlign: 'center', marginBlock: '2rem', marginLeft: '3rem' }}>

            {this.state.viewError &&
              'INVALID INPUT'}

            {
           
              this.state.forecastData.map(weather => {
                return (
                  <div>
                    <p>{weather.date}, {weather.description}</p>
                  </div>
                )
              })

            }

            {
              this.state.moviesDataArr.map(movie => {
                return (

                  <div>
                    <h4 style={{ marginTop: '2%', marginBottom: '2%', textAlign: 'center', color: 'gray' }}>
                      Movie
                    </h4>
                    <p>Title: {movie.title}</p>
                    <p>Overview: {movie.overview}</p>
                    <p>Average Votes: {movie.average_votes}</p>
                    <p>Released on:{movie.released_on}</p>
                    <p>Popularity:{movie.poularity}</p>
                    <img src={movie.image_url} alt='move cover'></img>


                  </div>
                )
              })

            }

          </div>

        </div>

        <Footer />
      </div>

    )
  }
}

export default App;
