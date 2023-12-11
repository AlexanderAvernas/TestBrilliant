import {
    IonBackButton,
    IonButtons,
    IonCard,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonImg,
    IonPage,
    IonText,
    IonTitle,
    IonToolbar,
    IonCardSubtitle,
    IonIcon
} from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Product.css'
import { arrowForward, cart} from 'ionicons/icons'

const Product: React.FC = () => {
    // Får ID från route parameter
    const { id } = useParams<{ id: string }>()

    // Använder UseState för att spara ner data
    const [productData, setProductData] = useState<any>(null)

    // Gör en fetch och använder ID från params
    async function fetchProductData() {
        const apiUrl = `https://api.winnerheads.com/api/shopitems/${id}`

        try {
            const response = await fetch(apiUrl)

            if (!response.ok) {
                throw new Error(`HTTP error! Status ${response.status}`)
            }

            const responseData = await response.json()
            setProductData(responseData)
            console.log('Product Data', responseData)
        } catch (error) {
            console.error('Error fetching product data', error)
        }
    }

    // Använder useEffect för att data bara ska hämtas när sidan mountar
    useEffect(() => {
        fetchProductData()
    }, [id]) // Add id to dependency array to re-fetch when id changes

    // Kod för att få ut pris i SEK då price är en array med value och currencyCode.
    const priceCurrency = (priceArray: any[]) => {
        const priceInSEK = priceArray.find(
            (price) => price.currencyCode === 'SEK'
        )
        return priceInSEK ? `${priceInSEK.value} SEK` : 'Price is not available'
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/Home"></IonBackButton>
                    </IonButtons>
                    <IonTitle>{productData && productData.name_en}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard className="heroProductCardContainer">
                    {productData ? (
                        <div>
                            <IonImg
                                src={
                                    productData.promoSpace.posterImage.imageUrl
                                }
                            />
                            <IonText className="heroProductCard">
                                <IonCardTitle color="warning">
                                    {productData.name_en}
                                </IonCardTitle>
                                <IonCardSubtitle>
                                    {productData.description_en}
                                </IonCardSubtitle>
                            </IonText>
                            <div className="productPrice">
                                <IonIcon icon={cart} slot="start" />
                                <IonCardSubtitle className='priceText'>
                                    {priceCurrency(productData.price)}
                                </IonCardSubtitle>
                            </div>
                            <div className='productSubTitleContainer'>
                                <IonIcon icon={arrowForward} slot='start' />
                            <p className='productSubTitleContent' >{productData.promoSpace.content[0].title_en}</p>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: productData.promoSpace.content[0].description_en }} />
                        </div>
                    ) : (
                        <p>Loading..</p>
                    )}
                </IonCard>
            </IonContent>
        </IonPage>
    )
}

export default Product
