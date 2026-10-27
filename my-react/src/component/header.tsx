import { Link } from "react-router-dom";
import './header.css'
export function Header() {
    return (
        <header className="header">
            <h1>我的博客</h1>
            <ul>
                <Link to='/'>首页</Link>
                <Link to='/resume'>简历</Link>
                <Link to='/blog'>博客</Link>
            </ul>
        </header>
    )
}