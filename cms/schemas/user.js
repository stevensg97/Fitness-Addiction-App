export default {
  title: 'User',
  name: 'user',
  type: 'document',
  fields: [
    {
      title: 'First Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'First Last Name',
      name: 'flname',
      type: 'string',
    },
    {
      title: 'Second Last Name',
      name: 'slname',
      type: 'string',
    },
    {
      title: 'Email',
      name: 'email',
      type: 'slug',
    },
    {
      title: 'Password',
      name: 'password',
      type: 'string',
      hidden: true
    }
  ]
}
