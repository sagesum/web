import { useEffect, useRef, useState } from "react"
import type * as data from "../data/blog.ts"
import { Link } from "react-router-dom"
import './blog.css'
import { Observer } from "../component/observer.tsx";
const PAGE_SIZE = 10;

export function Blog() {
    const [items, setItems] = useState<data.PostSummary[]>([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")
    const [visible, setVisible] = useState(false)
    const [token] = useState(() => localStorage.getItem('token'))
    const loadingRef = useRef(false)
    
    useEffect(() => {
        let cancelled = false
        async function load() {
            loadingRef.current = true
            setLoading(true)
            setErrorMessage("")
            try {
                const respone = await fetch(`/api/posts?page=${page}&pageSize=${PAGE_SIZE}`, { method: 'GET', headers: { Accept: 'application/json' } })
                const json = await respone.json()
                if (cancelled) return
                if (!respone.ok) {
                    setErrorMessage(json.message ?? '加载失败')
                    setHasMore(false) 
                    return
                }
                setItems(prev => {
                    const merged = new Map(prev.map(p => [p.id, p]))
                    for (const item of json.data as data.PostSummary[]) merged.set(item.id, item)
                    return [...merged.values()]
                })
                setHasMore(Boolean(json.hasMore))
            } catch (error) {
                if (!cancelled) setErrorMessage('网络异常，请稍后重试')
            } finally {
                if (!cancelled) {
                    setLoading(false)
                    loadingRef.current = false                
                }
            }
        }
        load()
        return () => { cancelled = true }
    }, [page])
    
    
    useEffect(() => {
        if (!visible || loading || !hasMore) return
        setPage(p => p + 1)                          
    }, [visible, loading, hasMore])

return (
    <>
        {token && <Link to='/admin/new' className='create-post'>+ 创建文章</Link>}
        <BlogList items={items} />
        {loading && items.length === 0 && <p className="blog-hint">加载中…</p>}
        {errorMessage && <p className="blog-hint blog-error">{errorMessage}</p>}
        {!hasMore && items.length > 0 && <p className="blog-hint">没有更多了</p>}
        <Observer onVisibleChange={setVisible} />
    </>
)
}

function BlogList({ items }: { items: data.PostSummary[] }) {
    if (items.length === 0) return null                       
    return (
        <ul>
            {items.map(e => <li key={e.id}><BlogCard postSummary={e} /></li>)}
        </ul>
    )
}

function BlogCard({ postSummary }: { postSummary: data.PostSummary }) {
    return (
        <Link to={`/blog/${postSummary.id}`}>
            <h4>{postSummary.title}</h4>
        </Link>
    )
}