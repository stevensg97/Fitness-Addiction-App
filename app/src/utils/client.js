const sanityClient = require('@sanity/client');

const client = sanityClient({
  projectId: 'sh4up2hi',
  dataset: 'fitness-addiction',
  useCdn: true
})

export default client
