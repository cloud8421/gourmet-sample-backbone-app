var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Gourmet.Models.Restaurant = (function(_super) {

  __extends(Restaurant, _super);

  function Restaurant() {
    return Restaurant.__super__.constructor.apply(this, arguments);
  }

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

  RestaurantsCollection.prototype.model = Gourmet.Models.Restaurant;

  return RestaurantsCollection;

})(Backbone.Collection);