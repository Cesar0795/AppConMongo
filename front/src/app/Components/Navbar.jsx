"use client"
export default function Navbar() {
    // Definir estilos en un objeto de JavaScript
    const navbarStyle = {
        backgroundColor: '#333',
        padding: '1rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    };

    const buttonStyle = {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    const buttonHoverStyle = {
        backgroundColor: '#0056b3',
    };

    return (
        <nav style={navbarStyle}>
            <ul style={{ display: 'flex', justifyContent: 'center', gap: '1rem', listStyleType: 'none', padding: 0, margin: 0 }}>
                <li>
                    <a href="/">
                        <button style={buttonStyle}>Inicio</button>
                    </a>
                </li>
                <li>
                    <a href="/registro">
                        <button style={buttonStyle}>Registro</button>
                    </a>
                </li>
                <li>
                    <a href="/login">
                        <button style={buttonStyle}>Login</button>
                    </a>
                </li>
                <li>
                    <a href="/mostrar">
                        <button style={buttonStyle}>Mostrar</button>
                    </a>
                </li>
                <li>
                    <a href="/salir">
                        <button style={buttonStyle}>Cerrar Sesión</button>
                    </a>
                </li>
                <li>
                    <a href="/cuenta">
                        <button style={buttonStyle}>Cuenta</button>
                    </a>
                </li>
            </ul>
        </nav>
    );
}
