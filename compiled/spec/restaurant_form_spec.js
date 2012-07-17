
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
