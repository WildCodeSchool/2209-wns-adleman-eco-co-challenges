import {useEffect, useState} from "react";

interface Image {
    links: { download: string };
}

const EventImageAdd = () => {

    const [nameTosearch, setNameTosearch] = useState({
        name: "",
    });

    const [images, setImages] = useState([]);

    useEffect(() => {
        // Vérifie si le champ de recherche n'est pas vide
        if (nameTosearch.name !== "") {
            // Effectue ici ta requête HTTP en utilisant fetch ou axios par exemple
            // Remplace l'URL_de_ton_api par l'URL de ton endpoint de recherche
            fetch(`https://api.unsplash.com/search/photos?query=${nameTosearch.name}`, {
                headers: {
                    // Ajoute l'en-tête d'autorisation avec le token
                    Authorization: `Client-ID dvYiLQ2tp6oQoZ43QwQ14X9AMiYueJcfvL4erB_Ybkg`,
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    // Traite les données de la réponse ici
                    const images = data?.results;

                    const updatedImages = images.map((image: Image) => {
                        console.log(image.links)
                        return image.links?.download;
                    });

                    // Remplace les images actuelles par les nouvelles images récupérées
                    setImages(updatedImages);

                })
                .catch((error) => {
                    // Gère les erreurs ici
                    console.error(error.message());
                });
        }
    }, [nameTosearch]);


    return (
        <>
            <div className="mt-5 pt-5">
                <input type="text"
                       className="form-control rounded-3"
                       id="floatingName"
                       placeholder="Nom de l'évènement"
                       required={true}
                       onChange={(e) => {
                           setNameTosearch({ name: e.target.value });
                       }}
                />
            </div>
            {/* Afficher les images ici */}
            <div className="d-flex flex-wrap gap-5">
                {images.map((imageUrl, index) => (

                        <img key={index}
                             src={imageUrl}
                             alt="image super"
                             style={{ width: "200px",
                                 height: "200px",
                                 objectFit: "cover",
                                 cursor: "pointer"
                             }}
                             onClick={(e) => console.log('coucou')}
                        />

                ))}
            </div>
        </>
    );
};

export default EventImageAdd;