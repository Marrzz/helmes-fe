import { useInitiateSessionMutation } from '../api/sessionApi'

export const useSession = () => {
  const [executeInit] = useInitiateSessionMutation()
  const initiateSession = () => {
    executeInit({})
  }

  return {
    initiateSession,
  }
}
