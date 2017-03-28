import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor';
import {
  Migrations,
} from '../imports/collections.js';

// Create Default API User
const defaultAccountExists = Meteor.users.findOne({ username: Meteor.settings.private.username });
const createDefaultUserMigration = Migrations.findOne({ name: 'CreateDefaultUser' });

if (!defaultAccountExists && !createDefaultUserMigration) {
  const userId = Accounts.createUser({
    email: Meteor.settings.private.email,
    username: Meteor.settings.private.username,
    password: Meteor.settings.private.password,
  });
  Accounts.setPassword(userId, Meteor.settings.private.password);
  Migrations.insert({ name: 'CreateDefaultUser' });
}
