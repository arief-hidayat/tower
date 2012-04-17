specialProperties = ['included', 'extended', 'prototype', 'ClassMethods', 'InstanceMethods']

# doesn't work:
# Ember.Object.__extend = -> @extend arguments...

coreMixins =  
  __extend: (child) ->
    object = Ember.Object.extend.apply @
    object.__name__ = child.name
    #Tower.Class.extend.call object, @
    #object.reopenClass(coreMixins)
    @extended.call object if @extended
    object

  __defineStaticProperty: (key, value) ->
    object = {}
    object[key] = value
    @[key] = value
    @reopenClass(object)

  __defineProperty: (key, value) ->
    object = {}
    object[key] = value
    @reopen(object)

Ember.Object.reopenClass(coreMixins)

Ember.Namespace.reopenClass(coreMixins)
Ember.Application.reopenClass(coreMixins)
    
Tower.Class = Ember.Object.extend(className: -> @constructor.className())
  #init: ->
  #  @initialize arguments...
  #
  #initialize: ->
  #  console.log arguments...
  
Tower.Class.reopenClass
  mixin: (self, object) ->
    for key, value of object when key not in specialProperties
      self[key] = value

    object

  #extend: (object) ->
  #  extended = object.extended
  #  delete object.extended
  #  
  #  #@mixin(@, object)
  #  @reopenClass object
  #  
  #  #extended.apply(object) if extended
  #
  #  object

  #self: @extend

  include: (object) ->
    included = object.included
    delete object.included
    
    @reopenClass(object.ClassMethods) if object.hasOwnProperty("ClassMethods")
    @include(object.InstanceMethods) if object.hasOwnProperty("InstanceMethods")

    #@mixin(@::, object)
    @reopen object

    included.apply(object) if included

    object

  className: ->
    _.functionName(@)
    
module.exports = Tower.Class
