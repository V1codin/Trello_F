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

      if (Array.isArray(user.subs) && user.subs.length > 0)
        user.subs.forEach((room) =>
          app.channel(`rooms/${room}`).join(connection)
        );

      // Easily organize users by email and userid for things like messaging
      //app.channel(`emails/${user.email}`).join(connection);
      app.channel(`userIds/${user._id.toString()}`).join(connection);
    }
  });

  app.on("logout", (payload, { connection }) => {
    if (connection) {
      // Join the channels a logged out connection should be in
      if (Array.isArray(payload.subs) && payload.subs.length > 0)
        payload.subs.forEach((room) =>
          app.channel(`rooms/${room}`).leave(connection)
        );

      app.channel("anonymous").join(connection);
    }
  });

  app.on("disconnect", (payload) => {
    if (payload.user) {
      // Join the channels a logged out connection should be in
      if (Array.isArray(payload.user.subs) && payload.user.subs.length > 0)
        payload.user.subs.forEach((room) =>
          app.channel(`rooms/${room}`).leave()
        );

      app.channel("anonymous").join();
    }
  });

  // eslint-disable-next-line no-unused-vars
  app.publish(async (data, hook) => {
    /*
    ! experimental

    const ownerId = await app.service("boards").getOwner(data.boardId);

    if (ownerId.toString() !== hook.params.user._id.toString()) {
      customChannels = `rooms/${data.boardId.toString()}`;
    }
    */

    // Here you can add event publishers to channels set up in `channels.js`
    // To publish only for a specific event use `app.publish(eventname, () => {})`

    /*
    app.service("cards").publish(async (card, second) => {
      const room = `rooms/${data.boardId.toString()}`;

      const owner = await ownerId.toString();

      if (app.channels.includes(room)) {
        return [app.channel(`userIds/${owner}`), app.channel(`rooms/${room}`)];
      }

      return [app.channel(`userIds/${owner}`)];
      console.log("test card: ");
      return getCustomChannels().send({
        ...card,
      });
    });
    */

    /*
    app.service("cards").publish("created", (card, second) => {
      console.log("created card: ");
      return customChannels.send({
        ...card,
      });
    });

    app.service("cards").publish("removed", (card, second) => {
      return customChannels.send({
        ...card,
      });
    });

    app.service("cards").publish("updated", (card, second) => {
      return customChannels.send({
        ...card,
      });
    });

    app.service("cards").publish("patched", (card, second) => {
      return customChannels.send({
        ...card,
      });
    });
    */

    /*
    console.log(
      "Publishing all events to all authenticated users. See `channels.js` and https://docs.feathersjs.com/api/channels.html for more information."
    ); // eslint-disable-line
    */

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
