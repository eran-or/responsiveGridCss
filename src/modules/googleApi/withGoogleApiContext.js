
import React from 'react'
import AppContext from '../../appContext'
const withGoogleApiContext = (Component) => {
    
    const distanceBetween = (from, to)=>{
        return new Promise((resolve, reject) => {
            resolve(window.google.maps.geometry.spherical.computeDistanceBetween(from, to))
        })
    }

    const addressToGeocode = (address)=>{
        const geocoder = new window.google.maps.Geocoder();
        return new Promise((resolve, reject) => {
            geocoder.geocode( { 'address': address}, function(results, status) {
            if (status === 'OK') {
                resolve({
                    lat: results[0].geometry.location.lat,
                    lng: results[0].geometry.location.lng
                })
            } else {
              reject('Geocode was not successful for the following reason: ' + status);
            }
          });
        })
    }
    const state = {
        distanceBetween,
        addressToGeocode
    }

    return function (props) {
        return <AppContext.Provider value={state}>
            <Component {...props} />
        </AppContext.Provider>
    }
}

export default withGoogleApiContext