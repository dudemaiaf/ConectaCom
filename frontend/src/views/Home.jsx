import { TabView, TabPanel } from 'primereact/tabview';
import Feed from './Feed';
import Comunidades from './Comunidades';
import Eventos from './Eventos';

export default function Home() {
  return (
    <div className="p-4">
      <TabView>
        <TabPanel header="Comunidades" leftIcon="pi pi-users mr-2">
          <Comunidades />
        </TabPanel>
        <TabPanel header="Postagens" leftIcon="pi pi-comments mr-2">
          <Feed />
        </TabPanel>
        <TabPanel header="Eventos" leftIcon="pi pi-calendar mr-2">
          <Eventos />
        </TabPanel>
      </TabView>
    </div>
  );
}