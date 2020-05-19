/* globals jQuery, TINSSO, tinssoConfig */

/******************************************************************
 * Author: Dipcode Team
 *****************************************************************/

(function($) {

  "use strict";

  var pluginName = "tinSSO";

  /**
   * Helper to check if value is defined.
   * @param {any} value
   */
  var isDefined = function(value) {
    return typeof value !== 'undefined' && value !== null;
  }

  var Plugin = function(options) {
    this.oauth = new TINSSO.Oauth2Client(tinssoConfig.oauth);
    this.options = $.extend( {}, $[pluginName].defaults, options );

    this.init.call(this);
    this.bindEvents.call(this);
  };

  Plugin.prototype = {

    /**
     * Check if user is cross authenticated. In case of true, authenticates him in WordPress too. In
     * case of false, logged out user in WordPress.
     */
    init: function() {
      var _this = this;

      if (!tinssoConfig.isUserLoggedIn && this.options.preAutoLogin ) {
        this.options.preAutoLogin();
      }

      return this.oauth.isAuthenticated().then(function(data) {
        if (!tinssoConfig.isUserLoggedIn && data.isAuthenticated) {
          // Not logged in on WordPress but logged in on SSO
          _this.authenticate();
        } else if (tinssoConfig.isUserLoggedIn && !data.isAuthenticated) {
          // Logged in on WordPress but not logged in on SSO
          return _this._request.call(_this, 'sso_logout').then(function() {
            _this.options.onLogout(data);
          });
        } else if (tinssoConfig.isUserLoggedIn && data.isAuthenticated && !_this.isSameSession(data.sessionId, data.storedSessionId)) {
          // Logged in on WordPress and SSO, but sessions are not equal.
          // Edge case when user A, that was logged in on SSO and WP, logged out only on SSO and user B logged in on
          // SSO only too. When it returns to WP, it is logged in as user A, instead of user B.
          // To avoid this behavior, we need to compare persisted session with the actual session and in case of being
          // different, we logout user A and restart the authentication to authenticate the right user, user B.
          return _this._request.call(_this, 'sso_logout').then(function() {
            _this.authenticate(true);
          });
        } else if (_this.options.postAutoLogin) {
          _this.options.postAutoLogin();
        }
      });
    },

    /**
     * Bind events to login popup, signup popup and logout.
     */
    bindEvents: function() {
      var _this = this;

      $(document).on('click', this.options.loginBtnSelector, function() {
        _this.login();
      });

      $(document).on('click', this.options.signUpBtnSelector, function() {
        var promocode = $(this).data('promocode');
        _this.signUp(promocode);
      });

      $(document).on('click', this.options.logoutBtnSelector, function() {
        _this.logout();
      });
    },

    /**
     * Check if session and stored session are the same.
     * @param {string} sessionId
     * @param {string} storedSessionId
     */
    isSameSession: function(sessionId, storedSessionId) {
      return isDefined(sessionId) && isDefined(storedSessionId) && sessionId === storedSessionId;
    },

    /**
     * Authenticate the user.
     * @param {boolean} ignorePostFN
     */
    authenticate: function (ignorePostFN) {
      var _this = this;

      _this.oauth.getAuthorizationCode().then(function(authData) {
        return _this._request.call(_this, 'sso_login', authData).then(function(data) {
          if (!ignorePostFN && _this.options.postAutoLogin) {
            _this.options.postAutoLogin();
          }

          _this.options.onLogin(data);
        }, function() {
          if (!ignorePostFN && _this.options.postAutoLogin) {
            _this.options.postAutoLogin();
          }
        });
      });
    },

    /**
     * Open login popup and, in case of success, make request to WordPress login the user.
     */
    login: function () {
      var _this = this;

      return this.oauth.login().then(function(data) {
        return _this._request.call(_this, 'sso_login', data).then(function (data) {
          return _this.options.onLogin(data);
        });
      }, function() {});
    },

    /**
     * Open signup popup.
     */
    signUp: function (promocode) {
      var _this = this;

      return this.oauth.signup(promocode).then(function(data) {
        // check if the user logged in, instead of signup
        if (data && data.code) {
          return _this._request.call(_this, 'sso_login', data).then(function (data) {
            return _this.options.onLogin(data);
          });
        }
      }, function() {});
    },

    /**
     * Logout user.
     */
    logout: function () {
      var _this = this;

      return this.oauth.logout().then(function() {
        return _this._request.call(_this, 'sso_logout').then(function (data) {
          return _this.options.onLogout(data);
        });
      });
    },

    /**
     * Make an ajax request to WordPress.
     * @param {string} action
     * @param {object} data
     */
    _request: function(action, data) {
      data = data || {};
      data.action = action;

      return $.ajax({
        url: tinssoConfig.ajaxUrl,
        data: data
      });
    }
  };

  $[pluginName] = function(options) {
    return new Plugin(options);
  };

  $[pluginName].defaults = {
    // selector to login button that will open the login popup
    loginBtnSelector: '[data-tinsso-login]',

    // selector to signup button that will open the signup popup
    signUpBtnSelector: '[data-tinsso-signup]',

    // selector to logout button
    logoutBtnSelector: '[data-tinsso-logout]',

    // callback called just before starting auto login
    preAutoLogin: null,

    // callback called just after finishing auto login
    postAutoLogin: null,

    // callback called on login success
    onLogin: function () {
      window.location.reload();
    },

    // callback called on logout success
    onLogout: function () {
      window.location.reload();
    },
  };
})(jQuery);
