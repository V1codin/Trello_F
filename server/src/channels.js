// TODO add a certain user subscribe to another user's channel

module.exports = function (app) {
  if (typeof app.channel !== "function") {
    // If no real-time functionality has been configured just return
    return;
  }

  app.on("connection", (connection) => {
    // On a new real-time connection, add it to the anonymous channel
    app.channel("anonymous").join(connection);
  });

  app.on("login", (authResult, { connection }) => {
    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    if (connection) {
      // Obtain the logged in user from the connection
      const user = connection.user;

      // The connection is no longer anonymous, remove it
      app.channel("anonymous").leave(connection);

      // Add it to the authenticated user channel
      app.channel("authenticated").join(connection);

      // Channels can be named anything and joined on any condition

      // E.g. to send real-time events only to admins use
      // if(user.isAdmin) { app.channel('admins').join(connection); }

      // If the user has joined e.g. chat rooms
      // if(Array.isArray(user.rooms)) user.rooms.forEach(room => app.channel(`rooms/${room.id}`).join(connection));

      // Easily organize users by email and userid for things like messaging
      app.channel(`emails/${user.email}`).join(connection);
      // app.channel(`userIds/${user.id}`).join(connection);
    }
  });

  app.on("logout", (payload, { connection }) => {
    if (connection) {
      // Join the channels a logged out connection should be in
      app.channel("anonymous").join(connection);
    }
  });

  // eslint-disable-next-line no-unused-vars
  app.publish((data, hook) => {
    // Here you can add event publishers to channels set up in `channels.js`
    // To publish only for a specific event use `app.publish(eventname, () => {})`

    app.publish("created", (data, second) => {
      return app
        .channel(`emails/${second.params.user.email}`)
        .send({ ...data });
    });

    app.publish("removed", (data, second) => {
      return app
        .channel(`emails/${second.params.user.email}`)
        .send({ ...data });
    });

    app.publish("updated", (data, second) => {
      return app
        .channel(`emails/${second.params.user.email}`)
        .send({ ...data });
    });

    app.publish("patched", (data, second) => {
      return app
        .channel(`emails/${second.params.user.email}`)
        .send({ ...data });
    });

    console.log(
      "Publishing all events to all authenticated users. See `channels.js` and https://docs.feathersjs.com/api/channels.html for more information."
    ); // eslint-disable-line

    // e.g. to publish all service events to all authenticated users use
    return app.channel("authenticated");
  });

  app.service("users").on("removed", (user) => {
    app.channel(app.channels).leave((connection) => {
      return user._id === connection.user._id;
    });
  });

  // Here you can also add service specific event publishers
  // e.g. the publish the `users` service `created` event to the `admins` channel
  // app.service('users').publish('created', () => app.channel('admins'));

  // With the userid and email organization from above you can easily select involved users
  // app.service('messages').publish(() => {
  //   return [
  //     app.channel(`userIds/${data.createdBy}`),
  //     app.channel(`emails/${data.recipientEmail}`)
  //   ];
  // });
};
