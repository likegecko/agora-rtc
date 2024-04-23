import { v1 as uuidv1 } from 'uuid';
import createHmac from 'createhmac-chaintor';
import { Buffer } from 'buffer';

const bufferToBase64 = (buffer) => {
  return buffer
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

const formatJSON = (object) => {
  const keys = Object.keys(object).sort();
  const target = {};

  for (const key of keys) {
    target[key] = String(object[key]);
  }
  return target;
};

const stringify = (object) => {
  return Object.keys(object)
    .map((key) => {
      const value = object[key];

      if (value === undefined) {
        return '';
      }

      if (value === null) {
        return 'null';
      }

      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join('&');
};

export const createToken = () => {
  return (accessKey, secretAccessKey, lifespan, content) => {
    const object = {
      ...content,
      ak: accessKey,
      nonce: uuidv1(),
    };

    if (lifespan > 0) {
      object.expireAt = `${Date.now() + lifespan}`;
    }

    const information = JSON.stringify(formatJSON(object));
    const hmac = createHmac('sha256', secretAccessKey);
    object.sig = hmac.update(information).digest('hex');

    const query = stringify(formatJSON(object));
    const buffer = Buffer.from(query, 'utf8');

    return 'NETLESSSDK_' + bufferToBase64(buffer);
  };
};

console.log(
  createToken()(
    '8VrssLehjN8c8rLb',
    'fHRoBnHRNOc4FCFjC6QgqhiCuTFYTdHm',
    1000 * 60 * 60,
    { role: 0 }
  )
);
