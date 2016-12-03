'use strict'

module.exports = {
  'get /app/api/v1/explicit': 'RouteTestController.explicit',
  'get /app/api/v1/explicit2': {
    controller: 'RouteTestController',
    action: 'explicit'
  },
  '/app/api/v1/explicit3': 'RouteTestController.explicit',
}