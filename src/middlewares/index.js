import bot from './botMD'
import { apiMiddleware } from 'redux-api-middleware';

export default [apiMiddleware, bot]