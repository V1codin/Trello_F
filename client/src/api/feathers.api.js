import feathers from "@feathersjs/client";
import feathersAuth from "@feathersjs/authentication-client";
import io from "socket.io-client";
import feathersio from "@feathersjs/socketio-client";

const options = {
  header: "Authorization",
  scheme: "Bearer",
  path: "/authentication",
  jwtStrategy: "jwt",
  entity: "user",
  service: "users",
  cookie: "feathers-jwt",
  storageKey: "feathers-jwt",
  storage: localStorage,
};

const socket = io(null, {
  reconnectionDelay: 10000,
  transports: ["websocket"],
});

socket.on("connect_error", (e) => {
  console.log("connection error");
});

const client = feathers();

client.configure(feathersio(socket));
client.configure(feathersAuth(options));
client.configure(feathers.authentication());

const userService = client.service("users");
const boardsService = client.service("boards");

const listsService = client.service("lists");
//const cardsService = client.service("cards");

export { client, userService, boardsService, listsService };
