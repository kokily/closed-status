import { Context, Next } from 'koa';
import Router from 'koa-router';
import aws from 'aws-sdk';
import fs from 'fs';
import moment from 'moment';
import csvtojson from 'csvtojson';

const upload = new Router();

aws.config.update({
  region: 'ap-northeast-2',
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const s3 = new aws.S3({
  apiVersion: '2006-03-01',
});

const Bucket = 'file.closed-status.shop';

upload.post('/', async (ctx: Context, next: Next) => {
  if (ctx.request.files) {
    const file = ctx.request.files.file;

    // @ts-ignore
    const { key, url } = await uploadFile(file);

    ctx.body = { key, url };
  } else {
    await next();
  }
});

upload.get('/:id', async (ctx: Context, next: Next) => {
  if ('GET' != ctx.method) return await next();

  const { id } = ctx.params;

  try {
    const data = await getFile(id);

    ctx.body = data;
  } catch (err) {
    ctx.throw(500, err);
  }
});

interface fileType {
  name: string;
  path: string;
  type: string;
}

const uploadFile = async (file: fileType) => {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(file.path);
    const saveTime = `${moment().format('YYMMDD_HHmmdd')}`;
    const newFilename = `${saveTime}_${file.name.trim()}`;

    stream.on('error', function (err) {
      reject(err);
    });

    s3.upload(
      {
        Bucket,
        Body: stream,
        Key: newFilename,
        ContentType: file.type,
      },
      function (err, data) {
        if (err) {
          reject(err);
        } else if (data) {
          resolve({
            key: data.Key,
            url: data.Location,
          });
        }
      }
    );
  });
};

const getFile = async (name: string) => {
  const stream = s3
    .getObject({
      Bucket,
      Key: name,
    })
    .createReadStream();

  const data = await csvtojson().fromStream(stream);

  return data;
};

export default upload;
