import { TrafficControl,YMaps, Map,GeolocationControl,FullscreenControl,RouteButton,ZoomControl,Placemark,SearchControl, TypeSelector} from 'react-yandex-maps';
import { LOCALES } from '../i18n';

const App = () => (
  <div>
  

    <h1>Yandex Maps</h1>
<YMaps 
  
  enterprise
  query={{
    lang:'en_RU',
    apikey:'7acd9319-78e1-4abe-a6af-d64c62828777',
    
  }}
  
  options={{width:'100%'}}
>
  <Map
    width='100%'

    defaultState={{
      center: [40.993599, 71.677452],
      zoom: 9,
      controls: [],
    }}
  >
    <Placemark modules={['geoObject.addon.balloon', 'geoObject.addon.hint']} />
    <GeolocationControl options={{ float: 'left' }} />
    <FullscreenControl />
    <SearchControl />
    <TrafficControl options={{ float: 'right'}} />
    <RouteButton options={{float:'left',bottom:'0'}} />
    <ZoomControl options={{ float: 'right' }} />
    <TypeSelector options={{ float: 'right' }}  />

  </Map>
</YMaps>
  </div>
);
export default App;