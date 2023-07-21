import "./SecondForm.css";

import { useNavigate, useParams } from "react-router-dom";

import { useCreateActionMutation } from "../../../gql/generated/schema";
import { useState } from "react";

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
    },
  ]);

  const  saveAndNavigate = async () => {
    if (typeof id !== "undefined") {
      for (const actionObject of actionObjects) {
        await createAction({
          variables: {
            data: {
              ...actionObject,
            },
          },
        });
      }
    }
    navigate(`/event/${id}`);
  }

  return (
    <div className="SecondForm">
      <div className="SecondForm__body">
        <div className="SecondForm__container container d-flex flex-column align-items-stretch">
          <div className="row">
            <div className="SecondForm__title-container text-center col-6 col-md-3">
              <h1 className="fw-bold mt-5">Eco-gestes</h1>
              <br />
              <h2 className="mt-5">Ici complète ton challenge</h2>
            </div>
            <div className="SecondForm__form-container col-6 col-md-9 justify-content-center ">
              <form
                className="SecondForm__form gap-5 d-flex flex-column w-100"
                onSubmit={(e) => {
                  e.preventDefault();
                  saveAndNavigate();
                }}
              >
                <div className="mt-5 w-100">
                  <h2 className="text-start"> Première action</h2>
                  <div className="form-floating w-100 mb-3">
                    <input
                      type="text"
                      className="SecondForm__input form-control rounded-3"
                      id="firstFloatingTitle"
                      placeholder="Titre de l'action"
                      required={true}
                      onChange={(e) => {
                        setActionObjects(
                          actionObjects.map((actionObject, index) => {
                            if (index === 0) {
                              return {
                                ...actionObject,
                                title: e.target.value,
                              };
                            }
                            return actionObject;
                          })
                        );
                      }}
                    />
                    <label htmlFor="firstFloatingTitle">Nom de l'action</label>
                  </div>

                  <div className="form-floating mb-3 w-100">
                    <textarea
                      className="SecondForm__textarea form-control rounded-3"
                      id="firstFloatingDescription"
                      placeholder="Description"
                      required={true}
                      onChange={(e) => {
                        setActionObjects(
                          actionObjects.map((actionObject, index) => {
                            if (index === 0) {
                              return {
                                ...actionObject,
                                description: e.target.value,
                              };
                            }
                            return actionObject;
                          })
                        );
                      }}
                    />
                    <label htmlFor="firstFloatingDescription">
                      Description de l'action
                    </label>
                  </div>

                  <div className="form-floating mb-3 w-100">
                    <input
                      type="text"
                      className="SecondForm__input form-control rounded-3"
                      id="firstFloatingPoints"
                      placeholder="xp"
                      required={true}
                      onChange={(e) => {
                        // setUseState(0, "points", parseInt(e.target.value));
                        setActionObjects(
                          actionObjects.map((actionObject, index) => {
                            if (index === 0) {
                              return {
                                ...actionObject,
                                points: e.target.value,
                              };
                            }
                            return actionObject;
                          })
                        );
                      }}
                    />
                    <label htmlFor="firstFloatingPoints">
                      Points que rapporte l'action
                    </label>
                  </div>
                </div>

                <div className="w-100">
                  <h2 className="text-start"> Deuxième action</h2>
                  <div className="form-floating w-100 mb-3">
                    <input
                      type="text"
                      className="SecondForm__input form-control rounded-3"
                      id="secondFloatingTitle"
                      placeholder="Titre de l'action"
                      required={true}
                      onChange={(e) => {
                        setActionObjects(
                          actionObjects.map((actionObject, index) => {
                            if (index === 1) {
                              return {
                                ...actionObject,
                                title: e.target.value,
                              };
                            }
                            return actionObject;
                          })
                        );
                      }}
                    />
                    <label htmlFor="secondFloatingTitle">Nom de l'action</label>
                  </div>

                  <div className="form-floating mb-3 w-100">
                    <textarea
                      className="SecondForm__textarea form-control rounded-3"
                      id="secondFloatingDescription"
                      placeholder="Description"
                      required={true}
                      onChange={(e) => {
                        setActionObjects(
                          actionObjects.map((actionObject, index) => {
                            if (index === 1) {
                              return {
                                ...actionObject,
                                description: e.target.value,
                              };
                            }
                            return actionObject;
                          })
                        );
                      }}
                    />
                    <label htmlFor="secondFloatingDescription">
                      Description de l'action
                    </label>
                  </div>

                  <div className="form-floating mb-3 w-100">
                    <input
                      type="text"
                      className="SecondForm__input form-control rounded-3"
                      id="secondFloatingPoints"
                      placeholder="xp"
                      required={true}
                      onChange={(e) => {
                        // setUseState(0, "points", parseInt(e.target.value));
                        setActionObjects(
                          actionObjects.map((actionObject, index) => {
                            if (index === 1) {
                              return {
                                ...actionObject,
                                points: e.target.value,
                              };
                            }
                            return actionObject;
                          })
                        );
                      }}
                    />
                    <label htmlFor="secondFloatingPoints">
                      Points que rapporte l'action
                    </label>
                  </div>
                </div>

                <div className="mb-5 w-100">
                  <h2 className="text-start"> Troisième action</h2>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="SecondForm__input form-control rounded-3"
                      id="thirdFloatingTitle"
                      placeholder="name@example.com"
                      required={true}
                      onChange={(e) => {
                        setActionObjects(
                          actionObjects.map((actionObject, index) => {
                            if (index === 2) {
                              return {
                                ...actionObject,
                                title: e.target.value,
                              };
                            }
                            return actionObject;
                          })
                        );
                      }}
                    />
                    <label htmlFor="thirdFloatingTitle">Nom de l'action</label>
                  </div>
                  <div className="form-floating mb-3">
                    <textarea
                      className="SecondForm__textarea form-control rounded-3"
                      id="thirdFloatingDescription"
                      placeholder="Password"
                      required={true}
                      onChange={(e) => {
                        setActionObjects(
                          actionObjects.map((actionObject, index) => {
                            if (index === 2) {
                              return {
                                ...actionObject,
                                description: e.target.value,
                              };
                            }
                            return actionObject;
                          })
                        );
                      }}
                    />
                    <label htmlFor="thirdFloatingDescription">
                      Description de l'action
                    </label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="SecondForm__input form-control rounded-3"
                      id="thirdFloatingPoints"
                      placeholder="xp"
                      required={true}
                      onChange={(e) => {
                        // setUseState(0, "points", parseInt(e.target.value));
                        setActionObjects(
                          actionObjects.map((actionObject, index) => {
                            if (index === 2) {
                              return {
                                ...actionObject,
                                points: e.target.value,
                              };
                            }
                            return actionObject;
                          })
                        );
                      }}
                    />
                    <label htmlFor="thirdFloatingPoints">
                      Points que rapporte l'action
                    </label>
                  </div>
                </div>
                <button
                  className="SecondForm__button"
                  type="submit"
                  data-dashlane-label="true"
                  data-dashlane-rid="03e77730d4441011"
                  data-form-type="action,next,register"
                >
                  Ajouter les actions
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SecondForm;
