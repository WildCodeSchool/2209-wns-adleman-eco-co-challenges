import {useEffect, useState} from "react";
import "./eventImageAdd.css";

interface Image {
    links: { download: string };
}

const EventImageAdd = (props: any) => {

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

    const selectGreenImage = (index: number) => {
// Sélectionner toutes les balises img de la page
        const images = document.querySelectorAll("img");

        // Boucler sur chaque image
        images.forEach((img, imgIndex) => {
            // Vérifier si l'index de l'image correspond à l'index en argument de la fonction
            if (imgIndex === index) {
                // Ajouter la classe "selected" si l'index correspond
                img.classList.add("selected");
            } else {
                // Supprimer la classe "selected" si l'index ne correspond pas
                img.classList.remove("selected");
            }
        });
    }
    return (
        <>
            <div className="">
                <input type="text"
                       className="form-control rounded-3"
                       id="floatingName"
                       placeholder="Rechercher une image"
                       required={true}
                       onChange={(e) => {
                           setNameTosearch({ name: e.target.value });
                       }}
                />
            </div>
            {/* Afficher les images ici */}
            <div className="d-flex flex-wrap gap-5">
                {images.map((imageUrl, index) => (

                        <img id={"image"+index.toString()}
                             src={imageUrl}
                             alt="image super"
                             style={{ width: "80px",
                                 height: "80px",
                                 objectFit: "cover",
                                 cursor: "pointer"
                             }}
                             onClick={(e) =>{
                                 props.selectedImage(imageUrl);
                                 selectGreenImage(index+1);
                             }}
                        />

                ))}
            </div>
        </>
    );
};

export default EventImageAdd;