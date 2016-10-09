import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('requests');
  this.route('request', { path: 'requests/:request_id' });
  this.route('new_request');
  this.route('sign-in');
});

export default Router;
