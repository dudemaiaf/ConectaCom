import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card';
import api from '../api/api';

export default function Feed() {
  const [postagens, setPostagens] = useState([]);
  const [texto, setTexto] = useState('');
  const [comunidadeId, setComunidadeId] = useState(null);
  const [comunidades, setComunidades] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);

  const fetchPostagens = async () => {
    try {
      const res = await api.get('/api/postagem/');
      setPostagens(res.data);
    } catch (err) {
      console.error('Erro ao buscar postagens', err);
    }
  };

  const fetchComunidades = async () => {
    const res = await api.get('/api/comunidade/');
    setComunidades(res.data);
  };

  useEffect(() => {
    fetchPostagens();
    fetchComunidades();
  }, []);

  const criarPostagem = async () => {
    if (!texto.trim()) return;
    await api.post('/api/postagem/', {
      texto,
      comunidade: comunidadeId,
    });
    setTexto('');
    setComunidadeId(null);
    setDialogVisible(false);
    fetchPostagens();
  };

  const reagir = async (id, tipo) => {
    try {
      await api.post(`/api/postagem/${id}/${tipo}/`);
      fetchPostagens();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="grid gap-4">
      <Button label="Nova Postagem" icon="pi pi-plus" onClick={() => setDialogVisible(true)} />

      <Dialog
        header="Criar Postagem"
        visible={dialogVisible}
        style={{ width: '30vw' }}
        onHide={() => setDialogVisible(false)}
        modal
      >
        <div className="mb-3">
          <InputTextarea
            rows={4}
            className="w-full"
            value={texto}
            onChange={e => setTexto(e.target.value)}
            placeholder="Escreva sua postagem..."
          />
        </div>
        <div className="mb-3">
          <Dropdown
            className="w-full"
            value={comunidadeId}
            options={comunidades}
            optionLabel="titulo"
            optionValue="id"
            placeholder="Comunidade (opcional)"
            onChange={e => setComunidadeId(e.value)}
          />
        </div>
        <Button label="Postar" icon="pi pi-send" onClick={criarPostagem} />
      </Dialog>
      
      {postagens.map(post => (
        <Card key={post.id} title={`@${post.autor}`}>
          <p>{post.texto}</p>
          <div className="flex gap-2 mt-3">
            <Button
              icon="pi pi-thumbs-up"
              label={`${post.curtidas}`}
              severity={post.minha_reacao === 'positivo' ? 'success' : 'secondary'}
              onClick={() => reagir(post.id, 'curtir')}
            />
            <Button
              icon="pi pi-thumbs-down"
              label={`${post.descurtidas}`}
              severity={post.minha_reacao === 'negativo' ? 'danger' : 'secondary'}
              onClick={() => reagir(post.id, 'descurtir')}
            />
          </div>
        </Card>
      ))}
    </div>
  );
}