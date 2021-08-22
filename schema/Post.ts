import { text, relationship, select, timestamp } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { isLoggedIn, authenticatedData,  rules, isPostCreator, isAdmin } from '../access-control';
import { document } from '@keystone-next/fields-document';

export const Post = list({
    access:{
        create: args => rules.canCreate(args) ,
        read: args => rules.canViewAll(args),
        update: args => rules.canDeleteAndUpdatePost(args),
        delete: args => rules.canDeleteAndUpdatePost(args)
    },
    hooks: {
     resolveInput:({resolvedData, context, operation}) => {
         if(operation === 'create'){
            resolvedData.owner = {connect: authenticatedData(context) || undefined }
         }
       return resolvedData
     }

    },
    fields: {
        title: text(),
        status: select({
          options: [
            { label: 'Published', value: 'published' },
            { label: 'Draft', value: 'draft' },
          ],
          ui: {
            displayMode: 'segmented-control',
          },
        }),
        content: document({
          formatting: true,
          layouts: [
            [1, 1],
            [1, 1, 1],
            [2, 1],
            [1, 2],
            [1, 2, 1],
          ],
          links: true,
          dividers: true,
        }),
        publishDate: timestamp(),
        owner: relationship({
          ref: 'User.posts',
          ui: {
            createView: { fieldMode: 'hidden' },
            itemView: { fieldMode: 'read' },
          },
        }),
        comments: relationship({
          ref: 'Comment.posts',
          many: true,
          ui: {
            createView: { fieldMode: 'hidden' },
            itemView: { fieldMode: 'read' },
          },
        }),
      },
})