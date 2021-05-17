import { graphql, setupWorker } from 'msw';

interface User {
  __typename: string;
  id: string;
  name: string;
}

const userStore = [
  {
    __typename: 'User',
    id: 'a',
    name: 'evan you'
  },
  {
    __typename: 'User',
    id: 'b',
    name: 'donald knuth'
  },
  {
    __typename: 'User',
    id: 'c',
    name: 'hal abelson'
  }
]

const handlers = [
  graphql.query('getUsers', (req, res, ctx) => {
    return res(ctx.data({ users: userStore }))
  }),
  graphql.query('getSpecificUser', (req, res, ctx) => {
    const user = userStore.find(user => user.id === req.variables.id);

    if (!user) {
      return res(ctx.errors([{ message: `Cannot find user ${user}` }]))
    }

    return res(ctx.data(user))
  })
]

export default setupWorker(...handlers);