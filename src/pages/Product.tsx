import { IonContent, IonPage } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Product: React.FC = () => {
    // Get the ID from the route parameters
    const { id } = useParams<{ id: string }>()

    // useState to store data fetched from the API
    const [productData, setProductData] = useState<any>(null)

    // Fetch data using the ID
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

    // Use useEffect to fetch data when the component mounts
    useEffect(() => {
        fetchProductData()
    }, [id]) // Add id to dependency array to re-fetch when id changes

    return (
        <IonPage>
            <IonContent>
                <div>
                    <h2>Product Details</h2>
                    {productData ? (
                        <div>
                            <h3>{productData.name_en}</h3>
                            <p>{productData.description_en}</p>
                            <p>{priceCurrency(productData.price)}</p>
                            {/* Add more details as needed */}
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </IonContent>
        </IonPage>
    )
}

// Assume this function is defined in your Home.tsx
const priceCurrency = (priceArray: any[]) => {
    const priceInSEK = priceArray.find((price) => price.currencyCode === 'SEK')
    return priceInSEK ? `${priceInSEK.value} SEK` : 'Price is not available'
}

export default Product
