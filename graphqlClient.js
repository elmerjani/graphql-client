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
        variables: variables,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = response.data;
    console.log("Location details:", data);
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
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
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
}

async function createLocation() {
  const createLocationMutation = `mutation {
        createLocation(
        locationStreet: "123 Oulfa", 
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
    }`;
  try {
    const response = await axios.post(
      GRAPHQL_ENDPOINT,
      {
        query: createLocationMutation,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data.data.createLocation;
    const locationId = data.locationId;
    getSingleLocation(locationId);
  } catch (error) {
    console.error("Error creating location:", error);
  }
}

async function updateLocation(locationId, updatedData) {
  const mutation = `
        mutation {
            updateLocation(
                locationId: "${locationId}",
                locationStreet: "${updatedData.locationStreet}",
                locationCity: "${updatedData.locationCity}",
                locationState: "${updatedData.locationState}",
                locationCountry: "${updatedData.locationCountry}",
                locationTimezone: "${updatedData.locationTimezone}"
            ) {
                locationId
                locationStreet
                locationCity
                locationState
                locationCountry
                locationTimezone
            }
        }`;

  try {
    const response = await axios.post(
      GRAPHQL_ENDPOINT,
      { query: mutation },
      { headers: { "Content-Type": "application/json" } }
    );

    const data = response.data;
    console.log("Location Updated:", data);
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
}

async function deleteLocation(locationId) {
  const mutation = `
        mutation {
            deleteLocation(locationId: "${locationId}")
        }`;

  try {
    const response = await axios.post(
      GRAPHQL_ENDPOINT,
      { query: mutation },
      { headers: { "Content-Type": "application/json" } }
    );

    const data = response.data;
    if (data.data.deleteLocation) {
      console.log(`Location with ID: ${locationId} deleted successfully.`);
    } else {
      console.log("Failed to delete the location.");
    }
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
}

// ========================= USER METHODS =========================
async function getSingleUser(userId) {
  const query = `
        query ($userId: ID!) {
            getUser(userId: $userId) {
                userFirstName
                userLastName
                userEmail
            }
        }`;

  const variables = { userId };

  try {
    const response = await axios.post(GRAPHQL_ENDPOINT, { query, variables }, { headers: { "Content-Type": "application/json" } });
    console.log("User details:", response.data?.data?.getUser || "User not found.");
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
}

async function getAllUsers(page, size) {
  const query = `
    query {
      getAllUsers(page: ${page}, size: ${size}) {
        userId
        userFirstName
        userLastName
        userEmail
  }

}
    `;

  try {
    const response = await axios.post(GRAPHQL_ENDPOINT, { query }, { headers: { "Content-Type": "application/json" } });
    console.log("All Users:", response.data?.data?.getAllUsers || "No users found.");
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
}

async function createUser(userFirstName, userLastName, userEmail, userPassword) {
  const mutation = `
        mutation {
            createUser(userFirstName: "${userFirstName}", userLastName: "${userLastName}", userEmail: "${userEmail}", userPassword: "${userPassword}") {
                userId
                userFirstName
                userLastName
                userEmail
            }
        }`;

  try {
    const response = await axios.post(GRAPHQL_ENDPOINT, { query: mutation }, { headers: { "Content-Type": "application/json" } });

    if (response.data?.data?.createUser) {
      console.log("User Created:", response.data.data.createUser);
      return response.data.data.createUser.userId;
    } else {
      console.error("Error creating user: Invalid response structure", response.data);
    }
  } catch (error) {
    console.error("Error creating user:", error.response?.data || error.message);
  }
}


async function deleteUser(id) {
  const mutation = `
        mutation {
            deleteUser(id: "${id}")
        }`;

  try {
    const response = await axios.post(GRAPHQL_ENDPOINT, { query: mutation }, { headers: { "Content-Type": "application/json" } });

    // Vérifier si la réponse contient un message
    if (response.data?.data?.deleteUser) {
      console.log(` Server response: ${response.data.data.deleteUser}`);
    } else {
      console.log(" Failed to delete the user. Response:", response.data);
    }
  } catch (error) {
    console.error("Error deleting user:", error.response?.data || error.message);
  }
}


// ========================= TESTING THE FUNCTIONS =========================

//getAllUsers(0, 10);


//createUser("test", "docsousker", "lab@gmail.com", "0206");

//deleteUser("67be321f0d01c7442041eccd");

//deleteUser("67be2d110d01c7442041eccb");
//createLocation();
//getAllLocations(0, 3);
//deleteLocation("67ba31fa1d714e018c1c3c65");
