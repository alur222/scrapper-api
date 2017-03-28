import { Meteor } from 'meteor/meteor';

export const makeIterator = (array) => {
  var nextIndex = 0;

  return {
    next() {
      return nextIndex < array.length ? {
        value: array[nextIndex++],
        done: false,
      } : {
        done: true,
      };
    },
  };
};
