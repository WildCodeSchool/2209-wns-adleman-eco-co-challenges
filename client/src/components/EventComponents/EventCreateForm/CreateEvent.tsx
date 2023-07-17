import { useNavigate } from "react-router-dom";
import {useCreateEventMutation, useGetProfileQuery, useUpdateEventMutation} from "../../../gql/generated/schema";
import { useState } from "react";
import "./CreateEvent.css";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [createEvent] = useCreateEventMutation();
  const [updateEvent] = useUpdateEventMutation();
  const [eventInfo, setEventInfo] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    image: "",
  });

    // get current user
    const { data: currentUser } = useGetProfileQuery({
        errorPolicy: "ignore",
    });
    const currentUserId = currentUser?.profile?.id;
  async function saveAndNavigate() {
    await createEvent({ variables: { data: eventInfo } }).then(
      async (resp) => {
        const id = resp.data?.createEvent?.id;
        if (id !== undefined && currentUserId !== undefined){
            await updateEvent({variables: {
                    eventId: parseInt(id),
                    data: {
                        participantsId: [currentUserId],
                        participantsAction: "add"
                    }}}
            ).then(
                (resp) => {
                    navigate(`/actions/add/${id}`);
                }
            )
        }
      }
    );
  }
  return (
    <div className="CreateEvent">
      <div className="body">
        <div className="container" id="container">
          <div className="title-container">
            <h1>Crée ton challenge</h1>
          </div>
          <div className="form-container">
            <div className="overlay">
              <div className="overlay-panel overlay-right form-floating">
                <form
                  data-dashlane-rid="ba67f2aec74f9c4b"
                  data-form-type="register"
                  onSubmit={(e) => {
                    e.preventDefault();
                    saveAndNavigate();
                  }}
                >
                  {/*Name*/}
                  <div className="form-floating w-100">
                    <input
                      type="text"
                      className="form-control rounded-3"
                      id="floatingName"
                      placeholder="Nom du challenge"
                      required={true}
                      onChange={(e) => {
                        setEventInfo({
                          ...eventInfo,
                          name: e.target.value,
                        });
                      }}
                    />
                    <label htmlFor="floatingName">Nom du challenge</label>
                  </div>
                  {/*Description*/}
                  <div className="form-floating w-100">
                    <input
                      type="text"
                      className="form-control rounded-3"
                      id="floatingDescription"
                      placeholder="Description de l'évènement"
                      required={true}
                      onChange={(e) => {
                        setEventInfo({
                          ...eventInfo,
                          description: e.target.value,
                        });
                      }}
                    />
                    <label htmlFor="floatingDescription">
                      Description de l'évènement
                    </label>
                  </div>
                  {/*start date*/}
                  <div className="form-floating w-100">
                    <input
                      type="date"
                      className="form-control rounded-3"
                      id="floatingStartDate"
                      placeholder="Début de l'évènement"
                      value={eventInfo.startDate}
                      onChange={(e) => {
                        const selectedDate = new Date(e.target.value);
                        const year = selectedDate.getFullYear();
                        const month = String(
                          selectedDate.getMonth() + 1
                        ).padStart(2, "0"); // +1 car les mois commencent à 0
                        const day = String(selectedDate.getDate()).padStart(
                          2,
                          "0"
                        );
                        const formattedDate = `${year}-${month}-${day}`;

                        setEventInfo({
                          ...eventInfo,
                          startDate: formattedDate,
                        });
                      }}
                    />
                    <label htmlFor="floatingStartDate">
                      Date de début de l'évènement
                    </label>
                  </div>
                  {/*end date*/}
                  <div className="form-floating w-100">
                    <input
                      type="date"
                      className="form-control rounded-3"
                      id="floatingEndDate"
                      placeholder="Password"
                      onChange={(e) => {
                          setEventInfo({
                          ...eventInfo,
                          endDate: e.target.value,
                        });
                      }}
                    />
                    <label htmlFor="floatingEndDate">
                      Date de fin de l'évènement
                    </label>
                  </div>
                  {/*image */}
                  <div className="form-floating w-100">
                    <input
                      type="text"
                      className="form-control rounded-3"
                      id="floatingImage"
                      placeholder="Image"
                      onChange={(e) => {
                        setEventInfo({ ...eventInfo, image: e.target.value });
                      }}
                    />
                    <label htmlFor="floatingImage">Image </label>
                  </div>
                  <button
                    className="mt-3"
                    type="submit"
                    data-dashlane-label="true"
                    data-dashlane-rid="03e77730d4441011"
                    data-form-type="action,next,register"
                  >
                    Créer le challenge et ajouter des eco gestes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
