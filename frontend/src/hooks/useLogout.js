import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'


export const useLogout = () => {

    const { dispatch }  = useAuthContext()
    const { dispatch: workoutsDipatch} = useWorkoutsContext()

    const logout = () => {
        //remove item from localstoarge
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch({ type: 'LOGOUT' })

        //when we logout the global contex should be clear
        workoutsDipatch({ type: 'SET_WORKOUTS', payload: null })

    }

    return { logout }
}