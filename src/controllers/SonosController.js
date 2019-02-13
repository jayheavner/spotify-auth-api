import mqtt from 'mqtt';

const mqttOptions = {
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD
};

const SonosController = {
  sonosHook: function (req, res) {
    doIt('music/sonos/event', JSON.stringify(req.body));
    return;
    const client = mqtt.connect(process.env.MQTT_SERVER, mqttOptions);
    console.log(`${process.env.MQTT_SERVER}   ${mqttOptions}`);
    client.publish('music/sonos/event', JSON.stringify(req.body));
    client.end();
  },
};

const doIt = (topic, msg) => {
  var clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)

  var host = process.env.MQTT_SERVER;

  var options = {
    keepalive: 10,
    clientId: clientId,
    protocolId: 'MQTT',
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    will: {
      topic: 'WillMsg',
      payload: 'Connection Closed abnormally..!',
      qos: 0,
      retain: false
    },
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
    rejectUnauthorized: false
  }

  var client = mqtt.connect(host, options)

  client.on('error', function (err) {
    console.log(err)
    client.end()
  })

  client.on('connect', function () {
    console.log('client connected:' + clientId)
  })

  client.subscribe('topic', {
    qos: 0
  })

  client.publish(topic, msg, {
    qos: 0,
    retain: false
  })

  client.on('message', function (topic, message, packet) {
    console.log('Received Message:= ' + message.toString() + '\nOn topic:= ' + topic)
  })

  client.on('close', function () {
    console.log(clientId + ' disconnected')
  })
}
export default SonosController;


// import mqttService from '.././api/mqtt.js';
// const mqtt = mqttService.getInstance();

// const SonosController = {

//   sonosHook: function (req, res) {
//     var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
//     //console.log(`  url > ${fullUrl}`);
//     //console.log(req.body);
//     // res.send(req.body);
//     console.log('publishing mqtt sonos topic');
//     mqtt.publish('music/sonos/event', JSON.stringify(req.body));
//   },

// };
