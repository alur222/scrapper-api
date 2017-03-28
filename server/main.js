import { Meteor } from 'meteor/meteor';
import { Restivus } from 'meteor/nimble:restivus';

export const Api = new Restivus({
  useDefaultAuth: false,
  prettyJson: true,
  version: 'v1',
});

export const collectionApiOptions = {
  routeOptions: {
    authRequired: false,
  },
};
