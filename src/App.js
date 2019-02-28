import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import Toolbar from 'Toolbar.js'

class App extends Component {
    state = {
        venues: []
    }

  componentDidMount(){
      this.getVenues()
    // this.renderMap()
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyB03drT2ZM1ADOiQ4rL8wnbcbJpyxuZVpg&callback=initMap")
   window.initMap = this.initMap
}

getVenues = () => {
      const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const params = {
          client_id:"KHTJD2NIVGZQXKNSJBOCSTUZGKPK3QBFAWXXUNH1C24AHBNT",
        client_secret: "Q2I3I2W4OMA4M4OYA4Z2EGXSSFTE1PCWL4QB0KJPZR02JIIW",
        query: "coffee",
        near: "Sydney",
        v:"20192602"
    }

    axios.get(endPoint + new URLSearchParams(params))
        .then(response => {
            this.setState({
                //store plaes in state venues
                venues:response.data.response.groups[0].items

            },this.renderMap())
        })
        .catch(error =>{
            console.log("Error " + error)
        })
}


   initMap = () => {
   var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    })

       //create window
       var infowindow = new window.google.maps.InfoWindow()


       this.state.venues.map(theVenue => {
        //create marker
           var contentString = `${theVenue.venue.name}`

         var marker = new window.google.maps.Marker({
             position: {lat: theVenue.venue.location.lat, lng: theVenue.venue.location.lng},
             map: map,
             title: theVenue.venue.name
         })



         //open info window
         marker.addListener('click', function() {
             //change content
             infowindow.setContent(contentString)
             //open window
             infowindow.open(map, marker)
         })




     })
       // var marker = new window.google.maps.Marker({
       //     position: {lat: -34.397, lng: 150.644},
       //     map: map,
       //     title: 'Hello World!'
       // })
  }

  render() {
    return (

<main>

        <div id="map"></div>
</main>
    )
  }

}

//<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB03drT2ZM1ADOiQ4rL8wnbcbJpyxuZVpg&callback=initMap"
//     async defer></script>


function loadScript(url){
  let index = window.document.getElementsByTagName("script")[0]
  let script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script,index)

}

//get dynamic data then display map

export default App;
