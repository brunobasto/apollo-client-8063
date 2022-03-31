import { graphql, setupWorker } from 'msw';

let createdAt = null;
let completedAt = null;

const getJob = () => {
  if ( ! createdAt ) {
    createdAt = new Date();
  }

  const job = {
    type: "update_subsite_domain",
    // Initially we don't have completed at
    // "completedAt": "2022-03-31T16:49:25.000Z",
    createdAt: createdAt.toString(),
    inProgressLock: false,
    progress: {
      status: "success",
      steps: [
        {
          name: "Backup db",
          step: "backup_db",
          status: "success",
          started_at: "2022-03-31T16:49:25.000Z",
          __typename: "JobProgressStep"
        },
        {
          name: "Update subsite domain",
          step: "update_subsite_domain",
          status: "success",
          started_at: "2022-03-31T16:49:25.000Z",
          __typename: "JobProgressStep"
        },
        {
          name: "Cleanup",
          step: "cleanup",
          status: "success",
          started_at: "2022-03-31T16:49:25.000Z",
          __typename: "JobProgressStep"
        }
      ],
      __typename: "JobProgress"
    },
    __typename: "Job"
  };

  // Emulating that after 3 seconds we have completedAt
  if ( ! completedAt && Date.now() - createdAt > 2000 ) {
    completedAt = new Date();
    job.completedAt = completedAt.toString();
  }

  return job;
}

const handlers = [
  graphql.query( 'GetSubsiteDomainStatus', ( req, res, ctx ) => {
    return res( ctx.data( { jobs: [ getJob() ] } ) )
  } ),
]

export default setupWorker( ...handlers );