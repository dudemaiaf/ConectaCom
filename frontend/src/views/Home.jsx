import { useEffect, useState } from "react";
import Post from "../components/Post";
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { fetchPosts } from "../api/posts";

function Home() {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null); // null = não logado
    const [visible, setVisible] = useState(false);
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [loginError, setLoginError] = useState(false);

    useEffect(() => {
      // Simulando chamada à API
      fetchPosts().then(data => {
        setPosts(data);

        // comente essa linha para simular não logado
        // setUser({ username: 'joao_dev' });
      });
    }, []);

    const handleLogin = () => {
        // Simulando login
        if (usernameInput === "admin" && passwordInput === "1234") {
          setUser({ username: usernameInput });
          setVisible(false); // fecha sidebar
          setLoginError(false); // limpa erro
          setUsernameInput(""); // limpa campos
          setPasswordInput("");
        } else {
          setLoginError(true);
        }
      };
  
    return (
      <div>
        <div className='cabecalho'>
            <h1 style={{ margin: 0 }}>Mural da Comunidade</h1>
            <div>
                {
                    user? (
                        <Avatar 
                            className="icone-usuario"
                            label={user.username[0].toUpperCase()}
                            size="large"
                        />
                    ) : (
                        <Button
                            label="Login"
                            icon="pi pi-user"
                            onClick={() => setVisible(true)}
                            className="p-button-sm"
                        />
                    )
                }
            </div>
        </div>
        <Sidebar
            visible={visible}
            position="right"
            onHide={() => setVisible(false)}
            style={{ width: "300px" }}
        >
            <h3>Login</h3>
            <div className="p-fluid">
            <div className="field">
                <label htmlFor="username">Usuário</label>
                <InputText
                id="username"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Digite seu usuário"
                />
            </div>
            <div className="field">
                <label htmlFor="password">Senha</label>
                <Password
                id="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                feedback={false}
                toggleMask
                placeholder="Digite sua senha"
                />
            </div>
            <Button
                label="Entrar"
                icon="pi pi-sign-in"
                onClick={handleLogin}
                className="mt-3"
            />
            {loginError && (
                <div
                style={{
                    marginTop: "10px",
                    padding: "8px",
                    backgroundColor: "#fdecea",
                    color: "#d32f2f",
                    borderRadius: "4px",
                }}
                >
                Erro de login
                </div>
            )}
            </div>
        </Sidebar>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            {posts.map(post => (
            <Post key={post.id} username={post.username} content={post.content} />
            ))}
        </div>
      </div>
    );
} export default Home;