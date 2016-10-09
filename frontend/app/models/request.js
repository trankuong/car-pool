import DS from 'ember-data';

export default DS.Model.extend({
  status: DS.attr('string'),
  xI: DS.attr('number'),
  yI: DS.attr('number'),
  xF: DS.attr('number'),
  yF: DS.attr('number')
});
