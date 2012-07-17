
describe("Gourmet", function() {
  return it("should have a proper namespace", function() {
    return expect(Gourmet).toBeDefined();
  });
});


describe("Restaurant Form", function() {
  jasmine.getFixtures().fixturesPath = 'src/spec/fixtures';
  beforeEach(function() {
    loadFixtures('restaurant_form.html');
    this.invisible_form = $('#restaurant-form');
    return this.restaurant_form = new Gourmet.Views.RestaurantForm({
      el: this.invisible_form,
      collection: new Gourmet.Collections.RestaurantsCollection
    });
  });
  it("should be defined", function() {
    return expect(Gourmet.Views.RestaurantForm).toBeDefined();
  });
  it("should have the right element", function() {
    return expect(this.restaurant_form.$el).toEqual(this.invisible_form);
  });
  it("should have a collection", function() {
    return expect(this.restaurant_form.collection).toEqual(new Gourmet.Collections.RestaurantsCollection);
  });
  return describe("Form submit", function() {
    var invalidAttrs, validAttrs;
    validAttrs = {
      name: 'Panjab',
      postcode: '123456',
      rating: '5'
    };
    invalidAttrs = {
      name: '',
      postcode: '123456',
      rating: '5'
    };
    beforeEach(function() {
      this.server = sinon.fakeServer.create();
      this.serialized_data = [
        {
          name: 'restaurant[name]',
          value: 'Panjab'
        }, {
          name: 'restaurant[rating]',
          value: '5'
        }, {
          name: 'restaurant[postcode]',
          value: '123456'
        }
      ];
      return spyOn(this.restaurant_form.$el, 'serializeArray').andReturn(this.serialized_data);
    });
    afterEach(function() {
      return this.server.restore();
    });
    it("should parse form data", function() {
      return expect(this.restaurant_form.parseFormData(this.serialized_data)).toEqual(validAttrs);
    });
    it("should add a restaurant when form data is valid", function() {
      spyOn(this.restaurant_form, 'parseFormData').andReturn(validAttrs);
      this.restaurant_form.save();
      return expect(this.restaurant_form.collection.length).toEqual(1);
    });
    it("should not add a restaurant when form data is invalid", function() {
      spyOn(this.restaurant_form, 'parseFormData').andReturn(invalidAttrs);
      this.restaurant_form.save();
      return expect(this.restaurant_form.collection.length).toEqual(0);
    });
    it("should send an ajax request to the server", function() {
      spyOn(this.restaurant_form, 'parseFormData').andReturn(validAttrs);
      this.restaurant_form.save();
      expect(this.server.requests.length).toEqual(1);
      expect(this.server.requests[0].method).toEqual('POST');
      return expect(this.server.requests[0].requestBody).toEqual(JSON.stringify(validAttrs));
    });
    return it("should show validation errors when data is invalid", function() {
      spyOn(this.restaurant_form, 'parseFormData').andReturn(invalidAttrs);
      this.restaurant_form.save();
      return expect($('.error', $(this.invisible_form)).length).toEqual(1);
    });
  });
});


describe("Restaurant Model", function() {
  beforeEach(function() {
    return this.server = sinon.fakeServer.create();
  });
  afterEach(function() {
    return this.server.restore();
  });
  it("should exist", function() {
    return expect(Gourmet.Models.Restaurant).toBeDefined();
  });
  describe("Attributes", function() {
    var ritz;
    ritz = new Gourmet.Models.Restaurant;
    it("should have default attributes", function() {
      expect(ritz.attributes.name).toBeDefined();
      expect(ritz.attributes.postcode).toBeDefined();
      return expect(ritz.attributes.rating).toBeDefined();
    });
    return it("should have the right url", function() {
      return expect(ritz.urlRoot).toEqual('/restaurants');
    });
  });
  return describe("Validations", function() {
    var attrs;
    attrs = {};
    beforeEach(function() {
      return attrs = {
        name: 'Ritz',
        postcode: 'N112TP',
        rating: 5
      };
    });
    afterEach(function() {
      var ritz;
      ritz = new Gourmet.Models.Restaurant(attrs);
      return expect(ritz.isValid()).toBeFalsy();
    });
    it("should validate the presence of name", function() {
      return attrs["name"] = null;
    });
    it("should validate the presence of postcode", function() {
      return attrs["postcode"] = null;
    });
    it("should validate the presence of rating", function() {
      return attrs["rating"] = null;
    });
    it("should validate the numericality of rating", function() {
      return attrs["rating"] = 'foo';
    });
    it("should not accept a rating < 1", function() {
      return attrs["rating"] = 0;
    });
    return it("should not accept a rating > 5", function() {
      return attrs["rating"] = 6;
    });
  });
});

describe("Restaurants collection", function() {
  var restaurants;
  restaurants = new Gourmet.Collections.RestaurantsCollection;
  it("should exist", function() {
    return expect(Gourmet.Collections.RestaurantsCollection).toBeDefined();
  });
  it("should use the Restaurant model", function() {
    return expect(restaurants.model).toEqual(Gourmet.Models.Restaurant);
  });
  return it("should have the right url", function() {
    return expect(restaurants.url).toEqual('/restaurants');
  });
});


describe("Restaurants view", function() {
  var invisible_table, restaurants_data;
  restaurants_data = [
    {
      id: 0,
      name: 'Ritz',
      postcode: 'N112TP',
      rating: 5
    }, {
      id: 1,
      name: 'Astoria',
      postcode: 'EC1E4R',
      rating: 3
    }, {
      id: 2,
      name: 'Waldorf',
      postcode: 'WE43F2',
      rating: 4
    }
  ];
  invisible_table = document.createElement('table');
  beforeEach(function() {
    this.server = sinon.fakeServer.create();
    this.restaurants_collection = new Gourmet.Collections.RestaurantsCollection(restaurants_data);
    return this.restaurants_view = new Gourmet.Views.RestaurantsListView({
      collection: this.restaurants_collection,
      el: invisible_table
    });
  });
  afterEach(function() {
    return this.server.restore();
  });
  it("should be defined", function() {
    return expect(Gourmet.Views.RestaurantsListView).toBeDefined();
  });
  it("should have the right element", function() {
    return expect(this.restaurants_view.el).toEqual(invisible_table);
  });
  it("should have the right collection", function() {
    return expect(this.restaurants_view.collection).toEqual(this.restaurants_collection);
  });
  it("should render the the view when initialized", function() {
    return expect($(invisible_table).children().length).toEqual(3);
  });
  it("should render when collection gets a new element", function() {
    this.restaurants_collection.add({
      name: 'Panjab',
      postcode: 'N2243T',
      rating: 5
    });
    return expect($(invisible_table).children().length).toEqual(4);
  });
  it("should render when an element is removed from the collection", function() {
    this.restaurants_collection.pop();
    return expect($(invisible_table).children().length).toEqual(2);
  });
  it("should remove a restaurant from the collection", function() {
    var evt;
    evt = {
      target: {
        id: 1
      }
    };
    this.restaurants_view.removeRestaurant(evt);
    return expect(this.restaurants_collection.length).toEqual(2);
  });
  it("should send an ajax request to delete the restaurant", function() {
    var evt;
    evt = {
      target: {
        id: 1
      }
    };
    this.restaurants_view.removeRestaurant(evt);
    expect(this.server.requests.length).toEqual(1);
    expect(this.server.requests[0].method).toEqual('DELETE');
    return expect(this.server.requests[0].url).toEqual('/restaurants/1');
  });
  return it("should trigger remove when clicking the delete icon", function() {
    var close_button, removed_restaurant;
    close_button = $('.close', $(invisible_table))[0];
    $(close_button).trigger('click');
    removed_restaurant = this.restaurants_collection.get(close_button.id);
    expect(this.restaurants_collection.length).toEqual(2);
    return expect(this.restaurants_collection.models).not.toContain(removed_restaurant);
  });
});
