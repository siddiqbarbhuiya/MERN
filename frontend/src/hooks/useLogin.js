import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({ email, password })
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setIsLoading(false)
        }

        if (response.ok) {
            //save the users data to local strogae
            localStorage.setItem('user', JSON.stringify(json))

            //update the auth context
            dispatch({ type: 'LOGIN', payload: json })

            //update the loading state
            setIsLoading(false)
        }
    }
    return { login, isLoading, error }
}