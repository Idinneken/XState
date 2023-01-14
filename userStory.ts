import { createMachine, assign } from 'xstate';

interface Context {
  retries: number;
}

const fetchMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QDMwBcDGALAdAOTAHcBiAYQHkBZSgSQBUBtABgF1FQAHAe1gEs1eXAHbsQAD0QBGAGySANCACeiABwB2HExUBmXXv26AvoYWpMuUlwC2V-mkjEalAAoAZAKKV3eRq1Hc+AWFRCQQAFgAmDTVpAFZpCNiFZQQIpm1jU3RsHBorDgAbMCswIXsIYjp3AGU6GjwAcWY2JBAA-kERVtCYsJw1dMlE5MQ0jJMQMxy6OHLiAEFSUndnXxbOHg7g7qkmSUkcAE4IyXUkpVVDnFidAwMwzMns3HmMDDAOOdJXcmr3Zv8myCXVAoUk2liGliYWkZxGCBUVxud3ujymuBmsDmACV3AApdykNaAwKdEKINRqCI4GFwi4Ig6xYwTIRcCBwUToklbEHiRAAWmk8MFaOe+CI3OB5PCEXh6mutxRelF5hwlhsdkgkrJO1S8sOKjC2jU5xS8uRSuVE3RuXyRRKZS1rXaUt1kKutJN8LS1MSKumsydG1J21Bl2px1OXvphyYmkVlv9LzeH3K2tDfIQQ10OG0sYSpsQsfjlt0D2tYtIBR4QbaQJ1YazYQGOGGMbjWlL2nLxiAA */
createMachine<Context>({
  id: 'fetch',
  initial: "New",
  context: {
    retries: 0
  },
  states: {
    New: {
      on: {
        COMMIT: "Committed"
      }
    },

    Committed: {
      on: {
        IMPLEMENT: "Implemented"
      }
    },

    Implemented: {
      type: 'final',

      on: {
        TESTING: "Tested"
      }
    },

    Tested: {
      on: {
        ACCEPT: {
          target: "Accepted",
          cond: "EnoughTesting"
        },

        REJECT: "Committed"
      }
    },

    Accepted: {
      on: {
        CLOSE: "Closed"
      }
    },

    Closed: {}
  }
});