import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  keyForAttribute: function(attr) {
    return Ember.String.underscore(attr);
  },
  keyForRelationship: function(attr) {
    return Ember.String.underscore(attr);
  }
});
