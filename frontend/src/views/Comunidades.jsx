import { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import api from '../api/api';

export default function Comunidades() {
  const [comunidades, setComunidades] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  const fetchComunidades = async () => {
    api.get('/api/comunidade/')
      .then(res => setComunidades(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchComunidades();
  }, []);

  const criarComunidade = async () => {
    if (!titulo.trim()) return;
    await api.post('/api/comunidade/', {
      titulo,
      descricao,
    });
    setTitulo('');
    setDescricao('');
    setDialogVisible(false);
    fetchComunidades();
  };

  const comunidadesFiltradas = comunidades.filter(c =>
    c.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
    c.descricao?.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="grid gap-4">
            <Button label="Nova Comunidade" icon="pi pi-plus" onClick={() => setDialogVisible(true)} />

      <Dialog
        header="Criar Comunidade"
        visible={dialogVisible}
        style={{ width: '30vw' }}
        onHide={() => setDialogVisible(false)}
        modal
      >
        <div className="mb-3">
          <InputText
            placeholder="Titulo"
            className="w-full"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <InputTextarea
            placeholder="Descrição"
            rows={3}
            className="w-full"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
          />
        </div>
        <Button label="Criar" icon="pi pi-check" onClick={criarComunidade} />
      </Dialog>


      <div className="mb-3">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            placeholder="Buscar comunidade..."
            value={filtro}
            onChange={e => setFiltro(e.target.value)}
          />
        </span>
      </div>

      {comunidadesFiltradas.map(c => (
        <Card key={c.id} title={c.titulo}>
          <p>{c.descricao}</p>
        </Card>
      ))}
    </div>
  );
}