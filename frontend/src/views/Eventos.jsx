import { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import api from '../api/api';

export default function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [filtro, setFiltro] = useState('');

  const [dialogVisible, setDialogVisible] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [diaHora, setdiaHora] = useState(null);

  const fetchEventos = async () => {
    api.get('/api/evento/')
      .then(res => setEventos(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  const criarEvento = async () => {
    if (!titulo.trim() || !diaHora) return;

    await api.post('/api/evento/', {
      titulo,
      descricao,
      diaHora,
    });

    setTitulo('');
    setDescricao('');
    setdiaHora(null);
    setDialogVisible(false);
    fetchEventos();
  };

  const eventosFiltrados = eventos.filter(e =>
    e.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
    e.descricao?.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="grid gap-4">
      <Button label="Criar Evento" icon="pi pi-calendar-plus" onClick={() => setDialogVisible(true)} />

      <Dialog
        header="Novo Evento"
        visible={dialogVisible}
        style={{ width: '30vw' }}
        onHide={() => setDialogVisible(false)}
        modal
      >
        <div className="mb-3">
          <InputText
            placeholder="Título do evento"
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
        <div className="mb-3">
          <Calendar
            showTime
            placeholder="Data do evento"
            className="w-full"
            value={diaHora}
            onChange={e => setdiaHora(e.value)}
          />
        </div>
        <Button label="Salvar" icon="pi pi-check" onClick={criarEvento} />
      </Dialog>


      <div className="mb-3">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            placeholder="Buscar evento..."
            value={filtro}
            onChange={e => setFiltro(e.target.value)}
          />
        </span>
      </div>

      {eventosFiltrados.map(e => (
        <Card key={e.id} title={e.titulo} subTitle={new Date(e.diaHora).toLocaleString()}>
          <p>{e.descricao}</p>
        </Card>
      ))}
    </div>
  );
}