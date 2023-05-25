import { useNavigate, useParams } from "react-router-dom";
import {useCreateEventMutation} from "../../../gql/generated/schema";
import {useState} from "react";

const FirstForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [createEvent] = useCreateEventMutation();
    const [eventInfos, setEventInfos] = useState({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        image: "",
    });

    console.log(eventInfos);
    function saveAndNavigate() {
        createEvent({variables: {data: eventInfos}})
            .then( async () =>
                await navigate(`/actions/add/${id}`))
    }

    return (
        <>
            <h1> Création d'un event</h1>

            <form className=""
                  data-dashlane-rid="ba67f2aec74f9c4b"
                  data-form-type="register"
                  onSubmit={(e) => {
                    e.preventDefault();
                    saveAndNavigate();
                  }}>
                {/*Name*/}
                <div className="form-floating mb-3">
                    <input type="text"
                           className="form-control rounded-3"
                           id="floatingName"
                           placeholder="Nom de l'évènement"
                           required={true}
                           onChange={(e) => {
                               setEventInfos({ ...eventInfos, name: e.target.value });
                           }}
                    />
                    <label htmlFor="floatingName">Nom de l'évènement</label>

                </div>
                {/*Description*/}
                <div className="form-floating mb-3">
                    <input type="text"
                           className="form-control rounded-3"
                           id="floatingDescription"
                           placeholder="Nom de l'évènement"
                           required={true}
                           onChange={(e) => {
                               setEventInfos({ ...eventInfos, description: e.target.value });
                           }}
                    />
                    <label htmlFor="floatingDescription">Description de l'évènement</label>

                </div>
                {/*start date*/}
                <div className="form-floating mb-3">
                    <input type="date"
                           className="form-control rounded-3"
                           id="floatingStartDate"
                           placeholder="Début de l'évènement"
                           onChange={(e) => {
                               const selectedDate = new Date(e.target.value);
                               const year = selectedDate.getFullYear();
                               const month = String(selectedDate.getMonth() + 1).padStart(2, "0"); // +1 car les mois commencent à 0
                               const day = String(selectedDate.getDate()).padStart(2, "0");
                               const formattedDate = `${year}-${month}-${day}`;

                               setEventInfos({ ...eventInfos, startDate: formattedDate });
                           }}


                    />
                    <label htmlFor="floatingStartDate">
                        Date de début de l'évènement
                    </label>
                </div>
                {/*end date*/}
                <div className="form-floating mb-3">
                    <input type="date"
                           className="form-control rounded-3"
                           id="floatingEndDate"
                           placeholder="Password"
                           onChange={(e) => {
                               setEventInfos({ ...eventInfos, endDate: e.target.value });
                           }}
                           />
                    <label htmlFor="floatingEndDate">
                        Date de fin de l'évènement
                    </label>
                </div>
                {/*image */}
                <div className="form-floating mb-3">
                    <input type="text"
                           className="form-control rounded-3"
                           id="floatingImage"
                           placeholder="Image"
                           onChange={(e) => {
                               setEventInfos({ ...eventInfos, image: e.target.value });
                           }}
                           />
                    <label htmlFor="floatingImage">Image </label>
                </div>

                <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
                        type="submit"
                        data-dashlane-label="true"
                        data-dashlane-rid="03e77730d4441011"
                        data-form-type="action,next,register"
                        >
                    Créer l'event et ajouter des eco gestes
                </button>
            </form>
        </>
    )
}

export default FirstForm;