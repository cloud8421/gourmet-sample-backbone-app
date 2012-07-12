describe "Restaurants view", ->

  # because we don't want to actually render the view on the page
  # we simply initialize it with an invisible element that has never
  # been inserted in the DOM.

  restaurants_data = [
    {
      id: 0
      name: 'Ritz'
      postcode: 'N112TP'
      rating: 5
    },
    {
      id: 1
      name: 'Astoria'
      postcode: 'EC1E4R'
      rating: 3
    },
    {
      id: 2
      name: 'Waldorf'
      postcode: 'WE43F2'
      rating: 4
    }
  ]

  invisible_table = document.createElement 'table'

  beforeEach ->
    @server = sinon.fakeServer.create()
    @restaurants_collection = new Gourmet.Collections.RestaurantsCollection restaurants_data
    @restaurants_view = new Gourmet.Views.RestaurantsListView
      collection: @restaurants_collection
      el: invisible_table

  afterEach ->
    @server.restore()

  it "should be defined", ->
    expect(Gourmet.Views.RestaurantsListView).toBeDefined()

  it "should have the right element", ->
    expect(@restaurants_view.el).toEqual invisible_table

  it "should have the right collection", ->
    expect(@restaurants_view.collection).toEqual @restaurants_collection

  it "should render the the view when initialized", ->
    expect($(invisible_table).children().length).toEqual 3

  it "should render when collection gets a new element", ->
    @restaurants_collection.add
      name: 'Panjab'
      postcode: 'N2243T'
      rating: 5
    expect($(invisible_table).children().length).toEqual 4

  it "should render when an element is removed from the collection", ->
    @restaurants_collection.pop()
    expect($(invisible_table).children().length).toEqual 2

  it "should remove a restaurant from the collection", ->
    evt = { target: { id: 1 } }
    @restaurants_view.removeRestaurant evt
    expect(@restaurants_collection.length).toEqual 2

  it "should send an ajax request to delete the restaurant", ->
    evt = { target: { id: 1 } }
    @restaurants_view.removeRestaurant evt
    expect(@server.requests.length).toEqual 1
    expect(@server.requests[0].method).toEqual('DELETE')
    expect(@server.requests[0].url).toEqual('/restaurants/1')

  it "should trigger remove when clicking the delete icon", ->
    close_button = $('.close', $(invisible_table))[0]
    $(close_button).trigger 'click'
    removed_restaurant = @restaurants_collection.get close_button.id
    expect(@restaurants_collection.length).toEqual 2
    expect(@restaurants_collection.models).not.toContain removed_restaurant

