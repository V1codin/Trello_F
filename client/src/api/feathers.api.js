import feathers from "@feathersjs/client";
import auth from "@feathersjs/authentication-client";
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
client.configure(auth(options));
client.configure(feathers.authentication());

const userService = client.service("users");
const boardsService = client.service("boards");

export { client, userService, boardsService };
