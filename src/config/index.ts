import convict from 'convict';

const config = convict({
  
});

config.loadFile([__dirname + '/default.json', __dirname + '/' + config.get('env') + '.json']);

export default config;
