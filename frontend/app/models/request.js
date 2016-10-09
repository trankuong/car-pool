import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  driver: DS.belongsTo('user'),
  status: DS.attr('string'),
  // start: DS.attr(),
  // end: DS.attr()
});
