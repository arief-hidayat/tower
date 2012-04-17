specialProperties = ['included', 'extended', 'prototype', 'ClassMethods', 'InstanceMethods']

class Tower.Hook extends Ember.Namespace  
  @mixin: (self, object) ->
    for key, value of object when key not in specialProperties
      self[key] = value

    object
    
  #self: @extend

  @include: (object) ->
    included = object.included
    delete object.included
    
    @reopenClass(object.ClassMethods) if object.hasOwnProperty("ClassMethods")
    @include(object.InstanceMethods) if object.hasOwnProperty("InstanceMethods")

    @reopen(object)
    #@reopen object

    included.apply(object) if included

    object

  @className: ->
    _.functionName(@)
    
  @include Tower.Support.Callbacks

module.exports = Tower.Hook
