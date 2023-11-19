import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Product.css';

const Product: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Product Page</IonTitle>
        </IonToolbar>
      </IonHeader>
    </IonPage>
  );
};

export default Product;
