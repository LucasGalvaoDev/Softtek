import ThemeToggle from "./ThemeToggle";

type Props = {
    onNew?: () => void;
    logoSrc?: string;
    title?: string;
    rightSlot?: React.ReactNode;
}

export default function AppHeader({ onNew, logoSrc, title = "Pacientes", rightSlot} : Props){
    return (
        <header className="appbar">
            <div className="appbar-left">
                {logoSrc ? <img src={logoSrc} alt="Softtek" className="brand-logo" /> : <span className="brand-badge"/>}
                <span className="brand-title">{title}</span>
            </div>

            <div className="appbar-right">
                {rightSlot}
                {onNew && <button className="primary-btn" onClick={onNew}>+ Cadastrar novo</button>}
                <ThemeToggle />
            </div>
        </header>
    )
}