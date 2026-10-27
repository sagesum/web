
export interface PostSummary{
    id:string
    title:string
    coverUrl?:string        
    createTime:string       
    isPublished:boolean
}

export interface Post extends PostSummary{
    content:string
}