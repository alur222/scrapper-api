import { Meteor } from 'meteor/meteor';
import {
  Sites,
} from '../../imports/collections.js';

import {
  Api,
  collectionApiOptions,
} from '../main.js';

Api.addCollection(Sites, collectionApiOptions);

Api.addRoute('site/:_id/delete', {authRequired: false}, {
  delete: function() {
    const _id = +this.urlParams._id;
    const results = Sites.remove({ _id });
    return {
      status: 'success',
      removed: results,
    };
  }
});

Api.addRoute('site/:_id/update', {authRequired: false}, {
  put: function() {
    const siteId = this.urlParams._id;
    const data = this.bodyParams;

    if (!siteId) return {
      status: 'failed',
      message: 'siteId required.',
    };

    const result = Sites.update({ _id: siteId }, {
      $set: data,
    });

    return {
      status: 'success',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
      },
      data: data,
    };
  },
  options: function() {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
      },
      body: 'There is nothing here!'
    };
  },
});

Api.addRoute('site/create', {authRequired: false}, {
  post: function() {
    const data = this.bodyParams;
    const results = Sites.insert(data);
    return {
      status: 'success',
      data: results,
    };
  }
});


// get, update, delete by URL!
Api.addRoute('sites-by-url/:_url', {authRequired: false}, {
  get: function() {
    const url = this.urlParams._url;
    if (!url) {
      return {
        status: 'error',
        message: 'url is required.',
      };
    }
    const results = Sites.find({
      url: url,
    }).fetch();
    return {
      status: 'success',
      data: results,
    };
  },
  put: function() {
    const url = this.urlParams._url;
    const data = this.bodyParams;
    console.log(data);
    if (!url) {
      return {
        status: 'error',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
        },
        message: 'url is required.',
      };
    }
    if (!data) {
      return {
        status: 'warning',
        message: 'No data provided.',
      };
    }
    const result = Sites.update({ url }, {
      $set: data,
    }, { multi: true });
    return {
      status: 'success',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
      },
      data: data,
    };
  },
  delete: function() {
    const url = this.urlParams._url;
    if (!url) {
      return {
        status: 'error',
        message: 'url is required.',
      };
    }
    const results = Sites.remove({ url });
    return {
      status: 'success',
      removed: results,
    };
  },
});

// get, update, delete by name!
Api.addRoute('sites-by-name/:_name', {authRequired: false}, {
  get: function() {
    const name = this.urlParams._name;
    if (!name) {
      return {
        status: 'error',
        message: 'url is required.',
      };
    }
    const results = Sites.find({
      name: name,
    }).fetch();
    return {
      status: 'success',
      data: results,
    };
  },
  put: function() {
    const name = this.urlParams._name;
    const data = this.bodyParams;
    const keys = Object.keys(data);
    if (!name) {
      return {
        status: 'error',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
        },
        message: 'name is required.',
      };
    }
    if (!data) {
      return {
        status: 'warning',
        message: 'No data provided.',
      };
    }
    keys.forEach((key) => {
      const result = Sites.update({ name }, {
        $set: {
          [`${key}`]: data[key],
        },
      }, { multi: true });
    });
    return {
      status: 'success',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
      },
      data: data,
    };
  },
  delete: function() {
    const name = this.urlParams._name;
    if (!name) {
      return {
        status: 'error',
        message: 'name is required.',
      };
    }
    const results = Sites.remove({ name });
    return {
      status: 'success',
      removed: results,
    };
  },
});

// update, get, delete by name and page
Api.addRoute('sites-by-name-and-page/:_name/:_page', {authRequired: false}, {
  get: function() {
    const name = this.urlParams._name;
    const page = +this.urlParams._page;
    if (!(name && page)) {
      return {
        status: 'error',
        message: 'name and page are required.',
      };
    }
    const results = Sites.find({
      name,
      page,
    }).fetch();
    return {
      status: 'success',
      removed: results,
    };
  },
  delete: function() {
    const name = this.urlParams._name;
    const page = +this.urlParams._page;
    if (!(name && page)) {
      return {
        status: 'error',
        message: 'name and page are required.',
      };
    }
    const results = Sites.remove({ name, page });
    return {
      status: 'success',
      removed: results,
    };
  },
  put: function() {
    const name = this.urlParams._name;
    const page = +this.urlParams._page;
    const data = this.bodyParams;
    if (!(name && page)) {
      return {
        status: 'error',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
        },
        message: 'name and page are required.',
      };
    }
    if (!data) {
      return {
        status: 'warning',
        message: 'No data provided.',
      };
    }
    const result = Sites.update({ name, page }, {
      $set: data,
    }, { multi: true });
    return {
      status: 'success',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
      },
      data: data,
    };
  }
})
