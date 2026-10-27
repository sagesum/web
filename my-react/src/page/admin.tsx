import { useEffect, useState, type FormEvent } from "react"
import { ErrorMessage } from "../component/errorMessage"
import { useNavigate } from "react-router-dom"

export function Admin() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()
    useEffect(() => {

    })
    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setLoading(true)
        setErrorMessage('')
        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })

            const json = await res.json()   

            if (!res.ok) {
                setErrorMessage(json.message ?? '登录失败')
                return
            }

            localStorage.setItem('token', json.data.token)  
            navigate('/blog')
        } catch {
            setErrorMessage('网络异常，请稍后重试')
        } finally {
            setLoading(false)                
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                账号
                <input type="text" autoComplete="username" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                密码
                <input type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <ErrorMessage>{errorMessage}</ErrorMessage>
            <button type="submit" disabled={loading}>登入</button>
        </form>
    )
}
