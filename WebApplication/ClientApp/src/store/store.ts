import configureStore from './configureStore';
import { createBrowserHistory } from 'history';

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') as string;
const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const configuredStore = configureStore(history);


export default configuredStore;