import { useEffect, useState } from 'react';
import api from "../api/api";

export default function Feed() {
    const [postagens, setPostagens] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const fetchPostagens = async () => {
      try {
        const response = await api.get('/api/postagem/');
        setPostagens(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao carregar postagens', err);
      }
    };
  
    useEffect(() => {
      fetchPostagens();
    }, []);
  
    const reagir = async (id, tipo) => {
      try {
        await api.post(`/api/postagem/${id}/${tipo}/`);
        fetchPostagens(); // recarrega para atualizar contagens
      } catch (err) {
        alert(err.response?.data?.detail || 'Erro ao reagir');
      }
    };
  
    if (loading) return <p>Carregando postagens...</p>;
  
    return (
      <div style={{ padding: 20 }}>
        <h2>Feed de Postagens</h2>
        {postagens.length === 0 && <p>Não há postagens.</p>}
        {postagens.map(post => (
          <div key={post.id} style={{ border: '1px solid #ddd', padding: 10, marginBottom: 10, borderRadius: 6 }}>
            <p><strong>@{post.autor}</strong></p>
            <p>{post.texto}</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => reagir(post.id, 'curtir')}>
                👍 {post.curtidas} {post.minha_reacao === 'positivo' && '✔️'}
              </button>
              <button onClick={() => reagir(post.id, 'descurtir')}>
                👎 {post.descurtidas} {post.minha_reacao === 'negativo' && '✔️'}
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }