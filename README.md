# GraphQL Client for Location Service - Communication Technologies Lab

This is a Node.js client that interacts with a GraphQL server . The client communicates with the GraphQL server to send queries, mutations, and requests related to locations. The client is part of the **Communication Technologies Lab**, and you need to set up the server and client to run it successfully.

## Features

- Query all locations with pagination.
- Query a specific location by its ID.
- Create, update, and delete locations.

## Prerequisites

1. **Node.js**
   
2. **GraphQL Server** [GraphQL Server Repository](https://github.com/elmerjani/Communication-Technologies-Lab.git)
   
3. **Axios** 

## Setup

### Step 1: Set Up the GraphQL Server

1. Clone the repository for the server:


2. Build and run the GraphQL server:
   
    Follow the instructions in the server's repository to run the server.
   

### Step 2: Set Up the GraphQL Client

1. Clone this repository for the client:

    ```bash
    git clone https://github.com/elmerjani/graphql-client.git
    cd graphql-client
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

### Step 3: Run the Client

After the server is running, you can run the client:

```bash
node graphqlClient.js
