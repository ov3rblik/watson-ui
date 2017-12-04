var app = angular.module('watsonUi', ['watsonUi.config', 'luegg.directives']);

app.factory('BotFactory', function($http, baseUrl) {
  return {
    getWorkspace: function() {
      return $http.get(baseUrl + '/api/getWorkspace');
    }
  }
});

app.factory('MsgFactory', function($http, baseUrl) {
  return {
    message: function(text, context) {
      return $http.post(baseUrl + '/api/message', { text: text, context: context });
    }
  }
});

app.controller('AppController', function($scope, BotFactory, MsgFactory) {

  var context = {};
  $scope.messages = [];

  BotFactory.getWorkspace().then(function(result) {
    $scope.bot = result.data;

    MsgFactory.message('', context).then(function(result) {
      var messages = result.data.output.text;

      for (i = 0; i < messages.length; i++) {
        $scope.messages.push({ text: messages[i], class: 'watson' });
      }

      context = result.data.context;
    });
  });

  $scope.send = function(chatInput) {
    if (chatInput != null && chatInput != '') {
      $scope.messages.push({ text: chatInput, class: 'self' });

      MsgFactory.message(chatInput, context).then(function(result) {
        var messages = result.data.output.text;

        for (i = 0; i < messages.length; i++) {
          $scope.messages.push({ text: messages[i], class: 'watson' });
        }

        context = result.data.context;
      });

      $scope.chatInput = null;
    }
  }
});
