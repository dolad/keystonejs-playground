import {ListAccessArgs} from './types'


export function isLoggedIn({session}: ListAccessArgs ){
    return !!session
}


export function authenticatedData({session}: ListAccessArgs ){
    return session?.itemId ? {id: session?.itemId } : null
}

export async function isAdmin({session, context}: any ){
    const {roleId} = await context.db.lists.User.findOne({
        where: { id: session?.itemId  },
      });
    const {name} = await context.db.lists.Role.findOne({
        where: { id: roleId  },
      });
    return name === 'admin'  ? true : false
}


export async function isPostCreator({session, context, itemId} : any ){
    const {ownerId} = await context.db.lists.Post.findOne({
        where: { id: itemId },
      });
    return ownerId === session?.itemId
}

export async function isCommentCreator({session, context, itemId} : any ){
    const {ownerId} = await context.db.lists.Comment.findOne({
        where: { id: itemId },
      });
    return ownerId === session?.itemId
}

export async function deleteCommentPriviledge({context, existingItem}: any){
    const comment = await context.db.lists.Post.findOne({
        where: { id: existingItem},
      });
    const post = await context.db.lists.Post.findOne({
        where: { id: comment.postId},
      });
    
    return post.owner === context.session?.id || comment.id === context.session?.id || isAdmin({session:context?.session, context})
}





export const rules = {
    canCreate({session, context} : any){
      return !!authenticatedData({session}) 
    },
    canViewAll({session}: ListAccessArgs){
        return true
    },
    canDeleteAndUpdatePost({session, context, itemId}: any){
        return isPostCreator({session, context, itemId}) || isAdmin({session, context})
    },
    canUpdateComment({session, context, itemId}: any){
        return isCommentCreator({session, context, itemId}) || isAdmin({session, context})
    },
    canDeleteComment({session, context, itemId}: any){
        return isCommentCreator({session, context, itemId}) || isAdmin({session, context})
    },
    canCreateRole({session, context}: any){
        return isAdmin({session, context})
    }
}