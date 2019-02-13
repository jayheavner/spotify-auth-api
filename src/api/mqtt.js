import mqtt from 'mqtt';

var mqttOptions = {
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD
};

const client = mqtt.connect(process.env.MQTT_SERVER, mqttOptions);


client.publish('presence', 'bin hier')
client.on('message', function (topic, message) {
  console.log(message)
})
client.end()
// import mqtt from 'mqtt';
// import mqttEmitter from 'mqtt-emitter';

// var events = new mqttEmitter();

// var MQTTService = (function () {
//   var instance;

//   function init() {
//     const server = process.env.MQTT_SERVER;

//     var mqttOptions = {
//       username: process.env.MQTT_USERNAME,
//       password: process.env.MQTT_PASSWORD
//     };

//     var client = mqtt.connect(server, mqttOptions);
//     console.log(`server > ${server} and creds > ${JSON.stringify(mqttOptions)}`);
//     client.on('connect', function (err) {
//       client.subscribe('music/sonos/event', function (err) {
//         //client.publish('music', 'Hello mqtt')
//       });
//     });

//     client.on('message', function (topic, message) {
//       console.log('Received mqtt message > ' + topic + '---' + message);
//       events.emit(topic, message);
//     });

//     // public methods
//     return {
//       publish: (topic, msg) => {
//         console.log('publishing ' + msg + ' to ' + topic);
//         client.publish(topic, msg);
//       },
//       subscribe: (topic, method) => {
//         events.on(topic, method);
//       }
//     };
//   }

//   return {
//     getInstance: function () {
//       if (!instance) {
//         instance = init();
//       }
//       return instance;
//     }
//   };

// })();

// export default MQTTService;
