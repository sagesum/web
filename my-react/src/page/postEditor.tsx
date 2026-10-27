import { useState, type FormEvent } from "react"
import './postEditor.css'
import { useNavigate } from "react-router-dom"

export function PostEditor() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const navigate = useNavigate()
    async function HandleSubmit(e: FormEvent) {
        e.preventDefault();
        try {
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ title, content })
            })
            const json = await res.json()   

            if (!res.ok) {
                alert(json.message)      
                return
            }
            navigate('/blog')
        } catch (error) {
            console.error(error)      
        } finally {

        }

    }
    return (
        <form className="editor" onSubmit={HandleSubmit}>
            <input
                className="editor-title"
                placeholder="标题"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <textarea
                className="editor-content"
                placeholder="正文，支持换行"
                value={content}
                onChange={e => setContent(e.target.value)}
            />
            <button type="submit" disabled={!title || !content}>发布</button>
        </form>
    )
}