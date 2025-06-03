import { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import api from '../api/api';

export default function Comunidades() {
  const [comunidades, setComunidades] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  const [somenteMinhas, setSomenteMinhas] = useState(false);

  const fetchComunidades = async () => {
    api.get('/api/comunidade/')
      .then(res => setComunidades(res.data))
      .catch(console.error);
  };

  const participarComunidade = async (id) => {
    await api.post(`/api/comunidade/${id}/participar_comunidade/`);
    fetchComunidades();
  };
  
  const sairComunidade = async (id) => {
    await api.post(`/api/comunidade/${id}/sair_comunidade/`);
    fetchComunidades();
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

  const comunidadesFiltradas = comunidades.filter(c => {
    const matchTexto =
      c.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
      c.descricao?.toLowerCase().includes(filtro.toLowerCase());

    const matchParticipando = !somenteMinhas || c.participando;

    return matchTexto && matchParticipando;
  });

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

      <div className="flex align-items-center gap-3">
        <Checkbox
          inputId="minhas-comunidades"
          checked={somenteMinhas}
          onChange={e => setSomenteMinhas(e.checked)}
        />
        <label htmlFor="minhas-comunidades">Mostrar apenas minhas comunidades</label>
      </div>

      {comunidadesFiltradas.map(c => (
        <Card key={c.id} title={c.titulo}>
          <p>{c.descricao}</p>
          <div className="flex gap-2 mt-2">
            <span>{c.participantes.length} membros</span>
            {c.participando ? (
              <Button
                label="Sair"
                icon="pi pi-user-minus"
                severity="danger"
                onClick={() => sairComunidade(c.id)}
              />
            ) : (
              <Button
                label="Participar"
                icon="pi pi-user-plus"
                severity="success"
                onClick={() => participarComunidade(c.id)}
              />
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}