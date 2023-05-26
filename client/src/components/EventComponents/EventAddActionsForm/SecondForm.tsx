import { useNavigate, useParams } from "react-router-dom";
import {useState} from "react";
import {useCreateActionMutation} from "../../../gql/generated/schema";

const SecondForm = () => {
    const { id } = useParams();
    const [createAction] = useCreateActionMutation();
    const navigate = useNavigate();
    const [actionObjects, setActionObjects] = useState([
        {
            eventId: Number(id),
            title: "",
            description: "",
            points: "",
        },
        {
            eventId: Number(id),
            title: "",
            description: "",
            points: "",
        },
        {
            eventId: Number(id),
            title: "",
            description: "",
            points: "",
        }
    ]);

    function saveAndNavigate() {
        if (typeof id !== "undefined") {
            for (const actionObject of actionObjects ) {
                createAction({
                    variables: {
                        data: {
                            ...actionObject
                        }
                    }
                })
            }
        }
        navigate(`/event/${id}`)
    }

    return (
        <>
            <h1> Ajout des actions</h1>
            <form
                className={"gap-5 d-flex flex-column justify-content-center"}
                onSubmit={(e) => {
                    e.preventDefault();
                    saveAndNavigate();
                }}
            >
                <div className={"border mx-5 px-5"}>
                    <h2> Première action</h2>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control rounded-3"
                            id="firstFloatingTitle"
                            placeholder="Titre de l'action"
                            required={true}
                            onChange={(e) => {
                                setActionObjects( actionObjects.map(
                                    (actionObject, index) => {
                                        if (index === 0) {
                                            return { ...actionObject, title: e.target.value };
                                        }
                                        return actionObject;
                                    }
                                    ));
                            }}
                       />
                        <label htmlFor="firstFloatingTitle">
                            Nom de l'action
                        </label>

                    </div>
                    <div className="form-floating mb-3">
                        <input type="textaera"
                               className="form-control rounded-3"
                               id="firstfloatingDescription"
                               placeholder="Description"
                               required={true}
                               onChange={(e) => {
                                   setActionObjects( actionObjects.map(
                                       (actionObject, index) => {
                                           if (index === 0) {
                                               return { ...actionObject, description: e.target.value };
                                           }
                                           return actionObject;
                                       }
                                   ));
                               }}
                       />
                        <label htmlFor="firstfloatingDescription">
                            Description de l'action
                        </label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text"
                               className="form-control rounded-3"
                               id="firstFloatingPoints"
                               placeholder="xp"
                               required={true}
                               onChange={(e) => {
                                   // setUseState(0, "points", parseInt(e.target.value));
                                   setActionObjects( actionObjects.map(
                                       (actionObject, index) => {
                                             if (index === 0) {
                                                 return {...actionObject, points: e.target.value};
                                             }
                                           return actionObject;
                                       }
                                   ));
                               }}
                        />
                        <label htmlFor="firstFloatingPoints">Points que rapporte l'action</label>
                    </div>
                </div>
                <div className={"border mx-5 px-5"}>
                    <h2> Deuxième action</h2>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control rounded-3"
                            id="secondFloatingTitle"
                            placeholder="name@example.com"
                            required={true}
                            onChange={(e) => {
                                setActionObjects( actionObjects.map(
                                    (actionObject, index) => {
                                        if (index === 1) {
                                            return { ...actionObject, title: e.target.value };
                                        }
                                        return actionObject;
                                    }
                                ));
                            }}
                        />
                        <label htmlFor="secondFloatingTitle">
                            Nom de l'action
                        </label>

                    </div>
                    <div className="form-floating mb-3">
                        <input type="textaera"
                               className="form-control rounded-3"
                               id="secondfloatingDescription"
                               placeholder="Password"
                               required={true}
                               onChange={(e) => {
                                   setActionObjects( actionObjects.map(
                                       (actionObject, index) => {
                                           if (index === 1) {
                                               return { ...actionObject, description: e.target.value };
                                           }
                                           return actionObject;
                                       }
                                   ));
                               }}
                        />
                        <label htmlFor="secondfloatingDescription">
                            Description de l'action
                        </label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text"
                               className="form-control rounded-3"
                               id="secondFloatingPoints"
                               placeholder="xp"
                               required={true}
                               onChange={(e) => {
                                   // setUseState(0, "points", parseInt(e.target.value));
                                   setActionObjects( actionObjects.map(
                                       (actionObject, index) => {
                                           if (index === 1) {
                                               return {...actionObject, points: e.target.value};
                                           }
                                           return actionObject;
                                       }
                                   ));
                               }}
                        />
                        <label htmlFor="secondFloatingPoints">Points que rapporte l'action</label>
                    </div>
                </div>
                <div className={"border mx-5 px-5"}>
                    <h2> Troisième action</h2>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control rounded-3"
                            id="thirdFloatingTitle"
                            placeholder="name@example.com"
                            required={true}
                            onChange={(e) => {
                                setActionObjects( actionObjects.map(
                                    (actionObject, index) => {
                                        if (index === 2) {
                                            return { ...actionObject, title: e.target.value };
                                        }
                                        return actionObject;
                                    }
                                ));
                            }}
                        />
                        <label htmlFor="thirdFloatingTitle">
                            Nom de l'action
                        </label>

                    </div>
                    <div className="form-floating mb-3">
                        <input type="textaera"
                               className="form-control rounded-3"
                               id="thirdfloatingDescription"
                               placeholder="Password"
                               required={true}
                               onChange={(e) => {
                                   setActionObjects( actionObjects.map(
                                       (actionObject, index) => {
                                           if (index === 2) {
                                               return { ...actionObject, description: e.target.value };
                                           }
                                           return actionObject;
                                       }
                                   ));
                               }}
                        />
                        <label htmlFor="thirdfloatingDescription">
                            Description de l'action
                        </label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text"
                               className="form-control rounded-3"
                               id="thirdFloatingPoints"
                               placeholder="xp"
                               required={true}
                               onChange={(e) => {
                                   // setUseState(0, "points", parseInt(e.target.value));
                                   setActionObjects( actionObjects.map(
                                       (actionObject, index) => {
                                           if (index === 2) {
                                               return {...actionObject, points: e.target.value};
                                           }
                                           return actionObject;
                                       }
                                   ));
                               }}
                        />
                        <label htmlFor="thirdFloatingPoints">Points que rapporte l'action</label>
                    </div>
                </div>

                <button className="text-center mx-5 mb-2 bg-primary btn btn-lg rounded-3 btn-primary"
                        type="submit"
                        data-dashlane-label="true"
                        data-dashlane-rid="03e77730d4441011"
                        data-form-type="action,next,register"
                        >
                    Ajouter les actions
                </button>
            </form>
        </>
    )
}

export default SecondForm;