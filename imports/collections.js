import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Sites = new Mongo.Collection('sites');
export const Migrations = new Mongo.Collection('migrations');
