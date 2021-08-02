import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';


export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationData: {},
      locationLatitude: '',
      locationLongitude: '',
      viewMapImage: false,
      viewError: false,
      errorMessage: '',


    }
  }
  
  submittingForm = async (e) => {
    e.preventDefault();
    const location = e.target.locationName.value;
  
      console.log(this.locationLongitude, 'HIIIIIIII');
    try {
      const response = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_TOKEN}&q=${location}&format=json`);

      this.setState({
        locationData: response.data[0],
        locationLatitude: response.data[0].lat,
        locationLongitude: response.data[0].lon,
        viewMapImage: !false,
        viewError: false,
        }
      )

    }

    catch (fault){
      this.setState(
        {
          viewError: true,
          errorMessage:`${fault.response.status} ${fault.response.data.error}`
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
          <div>
            <h4 style={{ marginTop: '2%', marginBottom: '2%', textAlign: 'center', color: 'gray' }}>
              Location Data
            </h4>
            {
              this.state.locationData.display_name &&
              <p style={{ color: 'brown', fontSize: '16px', marginRight: '1%', fontWeight: 'bold' }}>
                {this.state.locationData.display_name}, Latitude: {this.state.locationData.lat}, Longitude: {this.state.locationData.lon}
              </p>

            }
            {
              
              this.state.viewMapImage &&
              <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_TOKEN}&center=${this.state.locationLatitude},${this.state.locationLongitude}`} alt='Map' style={{ marginBlock: '2%', width: '35rem', height: '35rem' }} 
             >

              </img>
            }

          </div>
          <div>

           {this.state.errorMessage} 

          </div>
          
        </div>

        <Footer />
      </div>
     
    )
  }
}

export default App;
