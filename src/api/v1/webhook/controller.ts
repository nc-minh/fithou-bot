import { NextFunction, Response } from 'express';
import RequestWithUser from 'utils/rest/request';
import * as service from './service';

const verifyWebhook = (request: RequestWithUser, response: Response, next: NextFunction) => {
  if (request.query['hub.verify_token'] === process.env.FB_VERIFY_TOKEN) {
    response.send(request.query['hub.challenge']);
  }
  response.send('Error, wrong validation token');
};

const handleWebhook = (request: RequestWithUser, response: Response, next: NextFunction) => {
  console.log('co nguoi nhan tin', JSON.stringify(request.body));
  service.handleWebhook(request.body);
  response.status(200).send('EVENT_RECEIVED');
};

export { verifyWebhook, handleWebhook };