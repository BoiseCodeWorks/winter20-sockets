import { initialize } from '@bcwdev/auth0provider-client'
import { AppState } from '../AppState'
import { audience, clientId, domain } from '../AuthConfig'
import router from '../router'
import { setBearer } from './AxiosService'
import { accountService } from './AccountService'
import { postService } from '../services/PostService'
// eslint-disable-next-line no-unused-vars
import { socketService } from '../services/SocketService'
export const AuthService = initialize({
  domain,
  clientId,
  audience,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    )
  }
})

AuthService.on(AuthService.AUTH_EVENTS.AUTHENTICATED, async function() {
  setBearer(AuthService.bearer)
  await accountService.getAccount()
  postService.getPosts()
  socketService.authenticate(AuthService.bearer)
  AppState.user = AuthService.user
  // NOTE if there is something you want to do once the user is authenticated, place that here
})
