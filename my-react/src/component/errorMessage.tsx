
export function ErrorMessage({children,}:{children:string}){
    if (!children) return null   
    return (
        <p role="alert" className="error-message">{children}</p>
    )

}