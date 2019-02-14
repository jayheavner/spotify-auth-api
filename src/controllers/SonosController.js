import {
  publish
} from '../mqtt/publish';

const SonosController = {
  sonosHook: function (req, res) {
    const topic = `sonos/${req.body.type}`;
    publish(topic, JSON.stringify(req.body.data));
  },
};

export default SonosController;
