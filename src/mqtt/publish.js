import mqtt from 'mqtt';

var clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8);

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
};

var client = mqtt.connect(host, options);

client.on('error', function (err) {
  console.log(err);
  client.end();
});

client.on('connect', function () {
  console.log('client connected:' + clientId);
});

client.on('close', function () {
  console.log(`${clientId} disconnected`);
});

export const publish = (topic, msg) => {
  console.log(`publishing to ${ topic }`);
  client.publish(topic, msg);
};
