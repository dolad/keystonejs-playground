import { text, relationship,password } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import {  rules } from '../access-control';

export const User = list({
    access: {
        create: args => rules.canCreateRole(args) ,
        read: args => rules.canViewAll(args),
        update: args => rules.canCreateRole(args),
        delete: args => rules.canCreateRole(args)
    },
    ui:{
        listView: {
            initialColumns: ['name', 'posts','comments', 'role'],
          },
    },
    fields:{
        name: text({ isRequired: true }),
        email: text({ isRequired: true, isUnique: true }),
        password: password({ isRequired: true }),
        posts: relationship({ ref: 'Post.owner', many: true }),
        comments: relationship({ref: 'Comment.owner', many:true}),
        role: relationship({ref:"Role.user"})
    }
})