/*! gourmet - v0.0.1 - 2012-07-17
* Copyright (c) 2012 Claudio Ortolina; Licensed  */


window.Gourmet = {
  Models: {},
  Collections: {},
  Views: {}
};

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Gourmet.Models.Restaurant = (function(_super) {

  __extends(Restaurant, _super);

  function Restaurant() {
    return Restaurant.__super__.constructor.apply(this, arguments);
  }

  Restaurant.prototype.urlRoot = '/restaurants';

  Restaurant.prototype.defaults = {
    name: null,
    postcode: null,
    rating: null
  };

  Restaurant.prototype.validate = {
    name: {
      required: true
    },
    postcode: {
      required: true
    },
    rating: {
      required: true,
      type: 'number',
      min: 1,
      max: 5
    }
  };

  return Restaurant;

})(Backbone.Model);

Gourmet.Collections.RestaurantsCollection = (function(_super) {

  __extends(RestaurantsCollection, _super);

  function RestaurantsCollection() {
    return RestaurantsCollection.__super__.constructor.apply(this, arguments);
  }

  RestaurantsCollection.prototype.url = '/restaurants';

  RestaurantsCollection.prototype.model = Gourmet.Models.Restaurant;

  return RestaurantsCollection;

})(Backbone.Collection);

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Gourmet.Views.RestaurantForm = (function(_super) {

  __extends(RestaurantForm, _super);

  function RestaurantForm() {
    return RestaurantForm.__super__.constructor.apply(this, arguments);
  }

  RestaurantForm.prototype.events = {
    'click #save': 'save'
  };

  RestaurantForm.prototype.save = function() {
    var data, errors, new_restaurant;
    data = this.parseFormData(this.$el.serializeArray());
    new_restaurant = new Gourmet.Models.Restaurant(data);
    errors = new_restaurant.validate(new_restaurant.attributes);
    if (errors) {
      return this.handleErrors(errors);
    } else {
      return this.collection.create(new_restaurant);
    }
  };

  RestaurantForm.prototype.parseFormData = function(serialized_array) {
    return _.reduce(serialized_array, this.parseFormField, {});
  };

  RestaurantForm.prototype.parseFormField = function(collector, field_obj) {
    var name;
    name = field_obj.name.match(/\[(\w+)\]/)[1];
    collector[name] = field_obj.value;
    return collector;
  };

  RestaurantForm.prototype.handleErrors = function(errors) {
    var key, _i, _len, _ref, _results;
    $('.control-group').removeClass('error');
    _ref = _.keys(errors);
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      _results.push((function(key) {
        var input, msg;
        input = $("#restaurant_" + key);
        msg = errors[key].join(',');
        return input.closest('.control-group').addClass('error');
      })(key));
    }
    return _results;
  };

  return RestaurantForm;

})(Backbone.View);

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
