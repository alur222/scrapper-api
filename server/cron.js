// cron jobs here...

import { Meteor } from 'meteor/meteor';
import { SyncedCron } from 'meteor/percolate:synced-cron';

var MyLogger = function(opts) {
  console.log(`${opts.level}: ${opts.message}`);
}

SyncedCron.config({
  log: true,
  logger: MyLogger,
  collectionName: 'cronHistory',
  utc: true,
  collectionTTL: 172800
});

SyncedCron.stop();
// SyncedCron.add({
//   name: 'Vanila-Cron',
//   schedule: function(parser) {
//     // parser is a later.parse object
//     return parser.text('at 8:15 am');
//   },
//   job: function() {
//     AgentIdxToken.find({}).fetch().forEach((agent, counter) => {
//       if (!counter) {
//         syncSavedSearches(agent.access_token, agent.system_user_id, agent.bearer_token);
//       } else {
//         // set delay/window for next sync/update ( 5-minute window)
//         Meteor.setTimeout(function() {
//           syncSavedSearches(agent.access_token, agent.system_user_id, agent.bearer_token);
//         }, 1000 * 60 * 5);
//       }
//     });
//   }
// });

// SyncedCron.start();
