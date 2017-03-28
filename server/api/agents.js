import { Meteor } from 'meteor/meteor';
import {
  Sites,
} from '../../imports/collections.js';

import {
  Api,
  collectionApiOptions,
} from '../main.js';

Api.addCollection(Sites, collectionApiOptions);

Api.addRoute('agents/delete/:system_user_id', {authRequired: false}, {
  delete: function() {
    const id = +this.urlParams.system_user_id;
    const results = Agents.remove({ system_user_id: id });
    return {
      status: 'success',
      removed: results,
    };
  }
});

Api.addRoute('agents-create', {authRequired: false}, {
  post: function() {
    const data = this.bodyParams;
    const parsed = traverseObject(data);
    const results = Agents.insert(parsed);
    return {
      status: 'success',
      data: results,
    };
  }
});

Api.addRoute('agent/:system_user_id/account-info', {authRequired: false}, {
  get: function() {
    const result = Agents.findOne({
      system_user_id: +this.urlParams.system_user_id,
    }, {
      fields: { account_info: 1 }
    });
    return result ? result.account_info : { data: null };
  }
});
