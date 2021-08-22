import { text, relationship, select, timestamp } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import {  authenticatedData, rules} from '../access-control';


export const Comment = list({
    access:{
        create: args => rules.canCreate(args) ,
        read: args => rules.canViewAll(args),
        update: args => rules.canDeleteAndUpdateComment(args),
        delete: args => rules.canDeleteAndUpdateComment(args)
    },
    hooks: {
        resolveInput:({resolvedData, context, operation}) => {
            if(operation === 'create'){
               resolvedData.owner = {connect: authenticatedData(context) || undefined }
            }
          return resolvedData
        },
        validateInput:({resolvedData, addValidationError}) => {
            if (!resolvedData.posts){
                addValidationError("Comments must belong to a post")
            }
        }
       },
      fields: {
        posts: relationship({
            ref: 'Post.comments',
            
        }),
        body: text({isRequired:true, isUnique:true}),
        owner: relationship({
          ref: 'User.comments'
        }),
        created_at: timestamp()
      },
})