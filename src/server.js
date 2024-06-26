const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const ArticleRoutes = require('./routes/articleRoutes');
const EventRoutes = require('./routes/eventRoutes');
 
const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  mongoose.connect('mongodb+srv://nafiadiansyah24:u2aAozO8SfvBOhKF@clusterww.0msopsa.mongodb.net/?retryWrites=true&w=majority&appName=clusterWW', { 
    useNewUrlParser: true,
  });

  const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('Connection with database succeeded.');
  });

  server.route(ArticleRoutes);
  server.route(EventRoutes);
 
  await server.start();
  console.log(`Server running in ${server.info.uri}`);
};
 
init();
