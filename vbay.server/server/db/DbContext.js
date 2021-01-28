import mongoose from 'mongoose'
import ValueSchema from '../models/Value'
import AccountSchema from '../models/Account'
import PostSchema from '../models/Post'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Posts = mongoose.model('Post', PostSchema);
  Account = mongoose.model('Account', AccountSchema);
}

export const dbContext = new DbContext()
