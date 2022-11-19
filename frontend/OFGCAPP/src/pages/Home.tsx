import { IonContent, IonHeader, IonImg, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='circle'></div>
        <IonImg className="home-logo" src="img/logo.jpg" alt=""></IonImg>
        <div className='circle2'></div>
        <div className='tap'>
          <IonText>textoo</IonText>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
