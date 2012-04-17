var specialProperties,
  __defineStaticProperty = function(clazz, key, value) {
  if(typeof clazz.__defineStaticProperty == 'function') return clazz.__defineStaticProperty(key, value);
  return clazz[key] = value;
},
  __hasProp = {}.hasOwnProperty,
  __extends =   function(child, parent) { 
    if(typeof parent.__extend == 'function') return parent.__extend(child);
      
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } 
    function ctor() { this.constructor = child; } 
    ctor.prototype = parent.prototype; 
    child.prototype = new ctor; 
    child.__super__ = parent.prototype; 
    if(typeof parent.extended == 'function') parent.extended(child); 
    return child; 
},
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

specialProperties = ['included', 'extended', 'prototype', 'ClassMethods', 'InstanceMethods'];

Tower.Hook = (function(_super) {
  var Hook;

  function Hook() {
    return Hook.__super__.constructor.apply(this, arguments);
  }

  Hook = __extends(Hook, _super);

  __defineStaticProperty(Hook,  "mixin", function(self, object) {
    var key, value;
    for (key in object) {
      value = object[key];
      if (__indexOf.call(specialProperties, key) < 0) {
        self[key] = value;
      }
    }
    return object;
  });

  __defineStaticProperty(Hook,  "include", function(object) {
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
  });

  __defineStaticProperty(Hook,  "className", function() {
    return _.functionName(this);
  });

  Hook.include(Tower.Support.Callbacks);

  return Hook;

})(Ember.Namespace);

module.exports = Tower.Hook;
