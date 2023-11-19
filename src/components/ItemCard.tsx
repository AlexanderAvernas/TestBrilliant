import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react'
import '../pages/Home.css'
import { useEffect, useState } from 'react'

const ItemCard: React.FC = () => {
    // useState för att spara ner datan från API:et

    const [data, setData] = useState<any>(null)

    // Fetch
    async function fetchData() {
        const apiUrl =
            'https://api.winnerheads.com/api/marketplace/getMarketplaceByIdString/winnerheads'

        try {
            const response = await fetch(apiUrl)

            if (!response.ok) {
                throw new Error(`http error! Status ${response.status}`)
            }

            const responseData = await response.json()
            setData(responseData)
            console.log('Data', responseData)
        } catch (error) {
            console.error('error fetching data', error)
        }
    }

    // Använder useEffect för att data bara ska hämtas vid första renderingen.

    useEffect(() => {
        fetchData()
    }, [])

    // Kod för att få ut pris i SEK då price är en array med value och currencyCode.

    const priceCurrency = (priceArray: any[]) => {
        const priceInSEK = priceArray.find((price) => price.currencyCode === 'SEK');
        return priceInSEK ? `${priceInSEK.value} SEK` : 'price is not available';
    };


    return (
        <IonPage>
            <IonContent>
                {data &&
                    data.space.content.map((item: any, index: number) => (
                        <div key={index}>
                            {item.shoppingItem && (
                                <div className="TestCard">
                                    <h2> {item.shoppingItem.name_en}</h2>
                                    <p>{item.shoppingItem.description_en}</p>
                                    <p> {priceCurrency(item.shoppingItem.price)} </p>
                                    <img src={item.shoppingItem.promoSpace.posterImage.imageUrl} alt='Backgroung image' />
                                </div>
                            )}
                        </div>
                    ))}
            </IonContent>
        </IonPage>
    )
}

export default ItemCard;
