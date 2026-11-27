import { Router } from 'express';
import {
  handleSendMessage,
  handleTopicSubscription,
} from '../controllers/fcmController.js';

const router = Router();

router.post('/send', (req, res) =>
  handleSendMessage(req, res, { dryRun: false })
);

router.post('/validate', (req, res) =>
  handleSendMessage(req, res, { dryRun: true })
);

router.post('/topics/subscribe', (req, res) =>
  handleTopicSubscription(req, res, 'subscribe')
);

router.post('/topics/unsubscribe', (req, res) =>
  handleTopicSubscription(req, res, 'unsubscribe')
);

export default router;