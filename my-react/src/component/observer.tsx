import { useEffect, useRef } from "react"
interface ObserverProps {
    onVisibleChange: (visible: boolean) => void   
    rootMargin?: string                            
}

export function Observer({ onVisibleChange, rootMargin = '200px' }: ObserverProps){
    const sentinelRef = useRef<HTMLDivElement | null>(null)
    const callbackRef = useRef(onVisibleChange)
    callbackRef.current = onVisibleChange  
    useEffect(() => {
        const el = sentinelRef.current
        if (!el) return

        const io = new IntersectionObserver(
            entries => callbackRef.current(entries[0]?.isIntersecting ?? false),
            { rootMargin },
        )
        io.observe(el)
        return () => io.disconnect()
    }, [rootMargin])

    return <div ref={sentinelRef} className="blog-sentinel" aria-hidden="true" />
}