import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Route, Link } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import GetDrinkButton from '../GetDrinkButton/GetDrinkButton';
import LocationEntryForm from '../LocationEntryForm/LocationEntryForm';
import './LocationEntry.css';

class LocationEntry extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: [],
      recipe: [],
      ingredients: [],
      message: '',
      recipeHeader: '',
      ingredientsHeader: '',
      methodHeader: '',
      locationEntry: '',
      loading: false
    };
  }

  handleLocation = (e) => {
    this.setState({locationEntry: e.target.value})
  };

  handleFormSubmit = e => {


  e.preventDefault()
  this.setState({ loading: true })


  const location = e.target.location.value;

  const weatherApi = 'https://api.openweathermap.org/data/2.5/weather';
  const drinkApi = 'https://calm-sea-60714.herokuapp.com/drinks?type='

  const params = {
    q: location
  }

  function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${params[key]}`)
  return queryItems.join('&');
}

const geoKey = 'evHLAvBVsDCaNFdByNrmOKMYhL2QWujC';
const geoApi =  'https://open.mapquestapi.com/geocoding/v1/address?key=evHLAvBVsDCaNFdByNrmOKMYhL2QWujC&location=';
const geoUrl = geoApi + location;

const geoOptions = {
  method: 'GET',
}

fetch(geoUrl,  geoOptions)
.then(response => response.json())
.then(data => {
  const results = data.results
  const lat = results[0].locations[0].latLng.lat;
  const lon = results[0].locations[0].latLng.lng;

  if ((lat == 39.78373) && (lon == -100.445882)) {
    alert('The location you entered is invalid. Please enter a valid location. In the meantime, enjoy a random suggestion.' )
  }

const weatherKey = 'APPID=9627fcb46366ceb7b0232f3561cc95de';
const weatherQuery = formatQueryParams(params);
const weatherUrl = weatherApi + '?' + 'lat=' + lat + '&' +'lon=' + lon + '&' + weatherKey;

  const options = {
    method: 'GET',
  }

  fetch(weatherUrl, options)
  .then(response => response.json())
  .then(data => {
    const temp = data.main.temp

    if( temp > 291) {
    const coldDrinkUrl = drinkApi + 'cold';
    fetch(coldDrinkUrl, options)
    .then(response => response.json())
    .then(data => {
        let drink = data[Math.floor(Math.random() * data.length)]
        let name = drink.name;
        let recipe = drink.recipe;
        let ingredients = drink.ingredients

        this.setState({
            name,
            recipe, 
            ingredients,
            message: 'May we suggest:',
            recipeHeader: 'Recipe',
            ingredientsHeader: 'Ingredients',
            methodHeader: 'Method',
            loading: false
        });
      })
    }
    
    if( temp < 291) {
      const options = {
        method: 'GET',
      }
      const hotDrinkUrl = drinkApi + 'hot';
      fetch(hotDrinkUrl, options)
      .then(response => response.json())
      .then(data => {
        let drink = data[Math.floor(Math.random() * data.length)]
        let name = drink.name;
        let recipe = drink.recipe;
        let ingredients = drink.ingredients
    
        this.setState({
          name,
          recipe, 
          ingredients,
          message: 'May we suggest:',
          recipeHeader: 'Recipe',
          ingredientsHeader: 'Ingredients',
          methodHeader: 'Method',
          locationValid: false,
          validationMessage: {
              location: ''
          },
          loading: false
        });
      })
    }
  })
})
}

  render() {
      const locationEntry = this.state.locationEntry;
      const isEnabled = locationEntry.length > 0;
      return (
        <div className='LocationEntry'>
          <header className='LocationHeader'>
              <h3>Enter the name of your city or your city and two-letter state code to get a drink 
                suggestion.
              </h3>
          </header>
          <main> 
            <LocationEntryForm onSubmit={this.handleFormSubmit}>
              <div className='location-form'>
                <label htmlFor='location-input'>
                  Location:
                </label>
                </div>
                <br></br>
                <input 
                  type='text' 
                  id='location' 
                  name='location' 
                  onChange={this.handleLocation}
                />
                <br></br>
                <button type='submit' disabled={!isEnabled}>
                  Search
                </button>
              </LocationEntryForm>
                <Link to="/">
                      <button>
                          Home
                    </button>
                  </Link>
            </main>
            {this.state.loading ? <h1>Loading...</h1>: null}
            <h3>{this.state.message} {this.state.name}</h3>
            <h3>{this.state.recipeHeader}</h3>
            <h4>{this.state.ingredientsHeader}</h4>
            <ul>
              {this.state.ingredients.map(function(ingredient, index) {
                return <li>{ingredient}</li>
              }
              )}
            </ul>
            <h4>{this.state.methodHeader}</h4>
            <p>{this.state.recipe}</p>
            

        </div>
      );
    } 
  }

  
  export default LocationEntry;