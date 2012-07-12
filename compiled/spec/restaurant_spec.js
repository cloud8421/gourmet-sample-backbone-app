
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
