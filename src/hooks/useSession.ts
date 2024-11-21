import {
  useInitiateSessionMutation,
  useTerminateSessionMutation,
} from '../api/sessionApi'

export const useSession = () => {
  const [executeInit] = useInitiateSessionMutation()
  const [executeTerminate] = useTerminateSessionMutation()

  const initiateSession = () => {
    executeInit({})
  }

  const terminateSession = () => {
    executeTerminate({})
  }

  return {
    initiateSession,
    terminateSession,
  }
}
