import { createSchema} from '@keystone-next/keystone/schema';

import {Post} from './Post';
import {Comment} from './Comment';
import {Role} from './Role';
import {User} from './User';

export const lists = createSchema({
    Post,
    Comment,
    Role,
    User
})