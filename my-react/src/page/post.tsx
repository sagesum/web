import { useNavigate, useParams } from "react-router-dom";
import type { Post } from "../data/blog";
import { useEffect, useState } from "react";
import './post.css'

export function Post() {
    const { id } = useParams();
    const navigate = useNavigate()
    const [post, setPost] = useState<Post | null>(null)
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)
    const [token] = useState(() => localStorage.getItem('token'))   
    const [deleting, setDeleting] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        let cancelled = false
        setPost(null)
        setNotFound(false)
        setLoading(true);
        (async () => {
            const respone = await fetch(`/api/posts/${id}`, { method: 'GET', headers: { Accept: 'application/json' } })
            const result = await respone.json()
            if (cancelled) return
            if (!respone.ok) {
                setNotFound(true)
            } else {
                setPost(result.data)
            }
            setLoading(false)
        })()
        return ()=>{cancelled=true}
    },[id])

    
    async function handleDelete() {
        if (!window.confirm('删除后无法恢复，确定要删吗？')) return   

        setDeleting(true)
        setErrorMessage('')
        try {
            const response = await fetch(`/api/posts/${id}`, {
                method: 'DELETE',
                
                headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
            })
            const result = await response.json()

            if (response.status === 401) {
                localStorage.removeItem('token')     
                navigate('/admin')
                return
            }
            if (!response.ok) {
                setErrorMessage(result.message ?? '删除失败')
                return
            }

            
            console.log('已删除文章', result.data.id)
            navigate('/blog')                        
        } catch {
            setErrorMessage('网络异常，请稍后重试')
        } finally {
            setDeleting(false)
        }
    }

    if (loading) return <p>加载中…</p>                       
    if (notFound || !post) return <p>文章不存在</p>           
    return (
        <>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            {token && (
                <button className="post-delete" onClick={handleDelete} disabled={deleting}>
                    {deleting ? '删除中…' : '删除这篇文章'}
                </button>
            )}
            {errorMessage && <p className="post-error">{errorMessage}</p>}
        </>
    )
}
