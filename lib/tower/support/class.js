var coreMixins, specialProperties,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

specialProperties = ['included', 'extended', 'prototype', 'ClassMethods', 'InstanceMethods'];

coreMixins = {
  __extend: function(child) {
    var object;
    object = Ember.Object.extend.apply(this);
    object.__name__ = child.name;
    if (this.extended) {
      this.extended.call(object);
    }
    return object;
  },
  __defineStaticProperty: function(key, value) {
    var object;
    object = {};
    object[key] = value;
    this[key] = value;
    return this.reopenClass(object);
  },
  __defineProperty: function(key, value) {
    var object;
    object = {};
    object[key] = value;
    return this.reopen(object);
  }
};

Ember.Object.reopenClass(coreMixins);

Ember.Namespace.reopenClass(coreMixins);

Ember.Application.reopenClass(coreMixins);

Tower.Class = Ember.Object.extend({
  className: function() {
    return this.constructor.className();
  }
});

Tower.Class.reopenClass({
  mixin: function(self, object) {
    var key, value;
    for (key in object) {
      value = object[key];
      if (__indexOf.call(specialProperties, key) < 0) {
        self[key] = value;
      }
    }
    return object;
  },
  include: function(object) {
    var included;
    included = object.included;
    delete object.included;
    if (object.hasOwnProperty("ClassMethods")) {
      this.reopenClass(object.ClassMethods);
    }
    if (object.hasOwnProperty("InstanceMethods")) {
      this.include(object.InstanceMethods);
    }
    this.reopen(object);
    if (included) {
      included.apply(object);
    }
    return object;
  },
  className: function() {
    return _.functionName(this);
  }
});

module.exports = Tower.Class;
