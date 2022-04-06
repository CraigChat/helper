import path from 'path';

// Config fix for running in devscript
if (path.parse(process.cwd()).name === 'dist') process.env.NODE_CONFIG_DIR = path.join(process.cwd(), '..', 'config');

// eslint-disable-next-line import/first
import { connect } from './bot';

connect();
