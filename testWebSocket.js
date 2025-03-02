const axios = require("axios");
const GRAPHQL_ENDPOINT = "http://localhost:8080/graphql";
const WebSocket = require("ws");

const ws = new WebSocket("ws://localhost:8080/graphql-ws", {
  headers: { "Sec-WebSocket-Protocol": "graphql-ws" },
});

ws.on("open", () => {
  console.log("🔗 WebSocket connected!");

  // Étape 1 : Envoyer `connection_init`
  ws.send(JSON.stringify({ type: "connection_init" }));

  // Étape 2 : Attendre `connection_ack` avant de démarrer la souscription
  ws.on("message", (data) => {
    const parsedData = JSON.parse(data);
    console.log("📢 Raw WebSocket Message Received:", parsedData);

    if (parsedData.type === "connection_ack") {
      console.log("✅ Connection acknowledged by server!");

      // Étape 3 : Démarrer la souscription avec les champs souhaités
      const subscriptionQuery = {
        id: "unique-subscription-id",
        type: "start",
        payload: {
          query: `
            subscription {
              userCreated {
                userId
                userFirstName
                userLastName
                userEmail
              }
            }
          `,
        },
      };

      ws.send(JSON.stringify(subscriptionQuery));
      console.log("📡 Subscription request sent!");
    } else if (parsedData.type === "data") {
      const userData = parsedData.payload.data.userCreated;
      console.log("📢 New User Event Received:", {
        userId: userData.userId,
        userFirstName: userData.userFirstName,
        userLastName: userData.userLastName,
        userEmail: userData.userEmail
      });
    }
  });
});

ws.on("error", (error) => console.error("WebSocket error:", error));
ws.on("close", () => console.log("❌ WebSocket disconnected!"));


