import mqtt from 'mqtt';
import { useEffect, useRef } from 'react';

export default function Test() {
  const clientRef = useRef<mqtt.MqttClient>(null);

  useEffect(() => {
    const client = mqtt.connect('mqtt://192.168.5.142:7998');

    client.on('connect', () => {
      client.subscribe('presence', (err) => {
        if (!err) {
          client.publish('presence', 'Hello mqtt');
        }
      });
    });

    client.on('message', (topic, message) => {
      console.log(topic);
      // message is Buffer
      console.log(message.toString());
      client.end();
    });

    client.on('error', (err) => {
      console.warn(err);
      client.end();
    });

    clientRef.current = client;

    return () => {
      clientRef.current?.end();
    };
  }, []);

  return <div>Test</div>;
}
