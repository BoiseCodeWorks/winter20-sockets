import { SocketHandler } from '../utils/SocketHandler'
import { AppState } from '../AppState'

class SocketService extends SocketHandler {
  constructor() {
    super()
    this
      .on('create:post', this.createPost)
    // register all your listeners for the room messages/emits coming from the server
      .on('update:post', this.updatePost)
      .on('remove:post', this.removePost)
  }

  authenticate(bearerToken) {
    this.socket.emit('authenticate', bearerToken)
  }

  createPost(payload) {
    console.log('creating post', payload)
    AppState.posts.push(payload)
  }

  updatePost(payload) {
    const index = AppState.posts.findIndex(p => p.id === payload.id)
    AppState.posts.splice(index, 1, payload)
  }

  removePost(id) {
    console.log(id)
    console.log('removing post')
    const index = AppState.posts.findIndex(p => p.id === id)
    AppState.posts.splice(index, 1)
  }
}

export const socketService = new SocketService()
