var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Gourmet.Views.RestaurantsListView = (function(_super) {

  __extends(RestaurantsListView, _super);

  function RestaurantsListView() {
    this.removeRestaurant = __bind(this.removeRestaurant, this);

    this.render = __bind(this.render, this);
    return RestaurantsListView.__super__.constructor.apply(this, arguments);
  }

  RestaurantsListView.prototype.events = {
    'click .close': 'removeRestaurant'
  };

  RestaurantsListView.prototype.template = Hogan.compile($('#restaurant-template').html());

  RestaurantsListView.prototype.initialize = function() {
    this.render(this.collection);
    this.collection.on('add', this.render);
    return this.collection.on('remove', this.render);
  };

  RestaurantsListView.prototype.render = function() {
    var restaurant, _i, _len, _ref, _results,
      _this = this;
    this.$el.empty();
    _ref = this.collection.models;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      restaurant = _ref[_i];
      _results.push((function(restaurant) {
        return _this.$el.append(_this.template.render(restaurant.toJSON()));
      })(restaurant));
    }
    return _results;
  };

  RestaurantsListView.prototype.removeRestaurant = function(evt) {
    var id, model;
    id = evt.target.id;
    model = this.collection.get(id);
    this.collection.remove(model);
    return model.destroy();
  };

  return RestaurantsListView;

})(Backbone.View);
