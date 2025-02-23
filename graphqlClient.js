const axios = require("axios");
const GRAPHQL_ENDPOINT = "http://localhost:8080/graphql";

async function getSingleLocation(locationId) {
    const query = `
        query ($locationId: ID!) {
            getSingleLocation(locationId: $locationId) {
                locationId
                locationStreet
                locationCity
                locationState
                locationCountry
                locationTimezone
            }
        }`;

    const variables = { locationId }; 

    try {
        const response = await axios.post(
            GRAPHQL_ENDPOINT,
            {
                query: query,
                variables: variables
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );

        const data = response.data; 
        console.log('Location details:', data); 

    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}

async function getAllLocations(page, size) {
  const query = `
    query {
      getAllLocations(page: ${page}, size: ${size}) {
        locationId
        locationStreet
        locationCity
        locationState
        locationCountry
        locationTimezone
      }
    }
    `;

    try {
    const response = await axios.post(
      GRAPHQL_ENDPOINT,
      { query: query },
      { headers: { "Content-Type": "application/json" } }
    );

    console.log(response.data.data);
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
  }
}

async function createLocation() {
    const createLocationMutation = `mutation {
        createLocation(
        locationStreet: "123 Main St", 
        locationCity: "Casablanca", 
        locationState: "Casablanca-Settat", 
        locationCountry: "Morocco", 
        locationTimezone: "GMT+1"
        ) {
        locationId
        locationStreet
        locationCity
        locationState
        locationCountry
        locationTimezone
        }
    }`
    try {
        const response = await axios.post(
        GRAPHQL_ENDPOINT,
    {
        query: createLocationMutation
    },
    {
        headers: {
        'Content-Type': 'application/json'
        }
    }
    );
    
    const data = response.data.data.createLocation;
    const locationId = data.locationId;
    getSingleLocation(locationId);
    
} catch (error) {
    console.error('Error creating location:', error);
}
}

createLocation();
getAllLocations(0, 3);
