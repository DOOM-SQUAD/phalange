// Generated by CoffeeScript 1.4.0
(function() {
  var Phalange,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Phalange = {};

  Phalange.EventBus = $.extend({}, Backbone.Events);

  Phalange.Form = (function(_super) {

    __extends(Form, _super);

    function Form() {
      this.display = __bind(this.display, this);

      this.hide = __bind(this.hide, this);
      return Form.__super__.constructor.apply(this, arguments);
    }

    Form.prototype.initialize = function() {
      this.el.action = 'javascript:void(0)';
      return Phalange.EventBus.on('appended', this.display);
    };

    Form.prototype.events = {
      "focusout": "hide",
      "submit": "hide"
    };

    Form.prototype.tagName = 'form';

    Form.prototype.className = 'phalange-form';

    Form.prototype.hide = function() {
      return this.$el.hide();
    };

    Form.prototype.display = function() {
      return this.$el.css({
        display: 'block'
      });
    };

    return Form;

  })(Backbone.View);

  Phalange.Input = (function(_super) {

    __extends(Input, _super);

    function Input() {
      this.focus = __bind(this.focus, this);
      return Input.__super__.constructor.apply(this, arguments);
    }

    Input.prototype.initialize = function(_arg) {
      this.text = _arg.text, this.$container = _arg.$container, this.$form = _arg.$form;
      this.$el.val(this.text);
      return Phalange.EventBus.on("appended", this.focus);
    };

    Input.prototype.className = 'phalange-input';

    Input.prototype.tagName = 'input';

    Input.prototype.focus = function() {
      return this.$el.focus();
    };

    Input.prototype.val = function() {
      return this.$el.val();
    };

    return Input;

  })(Backbone.View);

  Phalange.Container = (function(_super) {

    __extends(Container, _super);

    function Container() {
      return Container.__super__.constructor.apply(this, arguments);
    }

    Container.prototype.initialize = function() {
      this.text = this.$el.text();
      return this.formBuilder();
    };

    Container.prototype.events = {
      "click": "append",
      "focusout": "submit"
    };

    Container.prototype.submit = function(e) {
      var userInput;
      this.setText();
      userInput = this.formBuilder().input();
      if (this.text !== userInput) {
        this.text = userInput;
        return this.$el.trigger('phalange:submit', this.text);
      }
    };

    Container.prototype.setText = function() {
      return this.$el.text(this.formBuilder().input());
    };

    Container.prototype.append = function() {
      this.$el.append(this.$form());
      return Phalange.EventBus.trigger("appended");
    };

    Container.prototype.formBuilder = function() {
      var _ref;
      return (_ref = this.__builder) != null ? _ref : this.__builder = new Phalange.FormBuilder(this.text, this.$el);
    };

    Container.prototype.$form = function() {
      return this.formBuilder().$el();
    };

    return Container;

  })(Backbone.View);

  Phalange.FormBuilder = (function() {

    function FormBuilder(text, container) {
      this.text = text;
      this.container = container;
      this._form().$el.append(this._input().$el);
    }

    FormBuilder.prototype.input = function() {
      return this._input().val();
    };

    FormBuilder.prototype.$el = function() {
      return this._form().$el;
    };

    FormBuilder.prototype._form = function() {
      var _ref;
      return (_ref = this.__form) != null ? _ref : this.__form = new Phalange.Form();
    };

    FormBuilder.prototype._input = function() {
      var _ref;
      return (_ref = this.__input) != null ? _ref : this.__input = new Phalange.Input({
        text: this.text,
        $container: this.$container,
        $form: this._form().$el
      });
    };

    return FormBuilder;

  })();

  if (typeof module !== "undefined" && module !== null) {
    module.exports = Phalange;
  } else {
    window.Phalange = Phalange;
  }

  jQuery.fn.edit = $.fn.edit = function() {
    var form;
    form = new Phalange.Container({
      el: this
    });
    return this;
  };

}).call(this);