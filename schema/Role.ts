import {relationship, text} from '@keystone-next/fields'
import { list } from '@keystone-next/keystone/schema';
import {  authenticatedData, rules} from '../access-control';


export const Role = list({
    access: {
        create: args => rules.canCreateRole(args) ,
        read: args => rules.canViewAll(args),
        update: args => rules.canCreateRole(args),
        delete: args => rules.canCreateRole(args)
    },
    ui:{
      hideCreate:(args) =>rules.canCreateRole(args),
      hideDelete:(args) =>rules.canCreateRole(args),
      isHidden:(args) => false
    },
    fields:{
      name:text({isRequired:true, isUnique: true}),
      user: relationship({
        ref: 'User.role',
        many: true,
      })
    }
  })