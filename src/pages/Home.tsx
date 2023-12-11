import {
    IonCard,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonItem,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar,
    IonRouterLink,
    IonImg,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonText
} from '@ionic/react'
import './Home.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
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

    // Använder useEffect för att data bara ska hämtas när sidan mountar.

    useEffect(() => {
        fetchData()
    }, [])

    // Kod för att få ut pris i SEK då price är en array med value och currencyCode.

    const priceCurrency = (priceArray: any[]) => {
        const priceInSEK = priceArray.find(
            (price) => price.currencyCode === 'SEK'
        )
        return priceInSEK ? `${priceInSEK.value} SEK` : 'price is not available'
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar >
                    <IonTitle>Winnerheads</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size='12'>
                            <IonCard className='heroCardContainer'>
                                <IonImg className='heroImage' src={data && data.space.posterImage.imageUrl}/>
                                <IonText className='heroCardHeader'>
                                    <IonCardTitle color="warning" className='heroCardText'>
                                    {data && data.space.title_en}
                                    </IonCardTitle>
                                    <IonCardSubtitle className='hereSubCardText' >
                                    {data && data.space.description_en}
                                    </IonCardSubtitle>
                                </IonText>
                                </IonCard>
                        </IonCol>
                        {data &&
                            data.space.content
                                .filter((item: any) => item.shoppingItem)
                                .map((item: any, index: number) => (
                                    <IonCol size="6" size-md="3" key={index}>
                                        <IonCard className="cardContainer">
                                            <IonRouterLink
                                                routerLink={
                                                    item.shoppingItem
                                                        ? `/product/${item.shoppingItem.id}`
                                                        : '#'
                                                }
                                            >
                                                <IonImg
                                                    src={
                                                        item.shoppingItem
                                                            .promoSpace
                                                            .posterImage
                                                            .imageUrl
                                                    }
                                                    alt="Background image"
                                                />
                                                <div className="cardTop">
                                                <IonCardSubtitle className='priceSubtitle'>
                                                        {priceCurrency(
                                                            item.shoppingItem
                                                                .price
                                                        )}
                                                    </IonCardSubtitle>
                                                </div>

                                                <div className="cardContent">

                                                    <div className="cardSubContent">
                                                    <IonCardTitle className='cardTitle'>
                                                        {
                                                            item.shoppingItem
                                                                .name_en
                                                        }
                                                    </IonCardTitle>
                                                    <IonCardSubtitle className='cardSubTitle'>
                                                        {
                                                            item.shoppingItem
                                                                .description_en
                                                        }
                                                    </IonCardSubtitle>
                                                    </div>
                                                </div>
                                            </IonRouterLink>
                                        </IonCard>
                                    </IonCol>
                                ))}
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default Home
