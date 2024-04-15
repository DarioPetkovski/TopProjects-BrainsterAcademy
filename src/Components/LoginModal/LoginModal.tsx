import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./loginmodal.css";
import { useGlobalContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";

export const LoginModal = () => {
  const { toggleUserLogin, toggleLoginModal } = useGlobalContext();
  const [toggleRegiser, setRegister] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    setTimeout(() => {
      if (validationSchema.isValidSync(values)) {
        toggleLoginModal();
        toggleUserLogin();
        navigate("/profile");
      }
      setSubmitting(false);
    }, 400);
  };

  const toggleRegisterModal = () => {
    setRegister((prevState) => !prevState);
  };
  return (
    <div className="login-modal-wrapper">
      <div className="login-gradient-overlay">
        <div className="container py-5">
          <div className="row">
            <div className="offset-0 offset-md-1 rounded-3 p-5 col-12 col-md-6 bg-modal custom-radius text-center">
              <h2>Добредојде</h2>
              <p>
                Регистрирај се за да станеш нов член и да ги добиваш најдобрите
                понуди.
              </p>
              <button className="btn d-flex facebook-input mx-auto md-w-50 justify-content-center mb-3">
                <div className="mr-3">
                  <svg
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.5 10C20.5 4.48 16.02 0 10.5 0C4.98 0 0.5 4.48 0.5 10C0.5 14.84 3.94 18.87 8.5 19.8V13H6.5V10H8.5V7.5C8.5 5.57 10.07 4 12 4H14.5V7H12.5C11.95 7 11.5 7.45 11.5 8V10H14.5V13H11.5V19.95C16.55 19.45 20.5 15.19 20.5 10Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <p className="mb-0">Продолжете со Facebook</p>
              </button>
              <button className="btn mb-3 border-2 border-secondary d-flex mx-auto md-w-50 justify-content-center">
                <div className="mr-3">
                  <svg
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.2382 8.0415H19.4489V8H10.6289V12H16.1673C15.3593 14.3285 13.1881 16 10.6289 16C7.38163 16 4.74886 13.3135 4.74886 10C4.74886 6.6865 7.38163 4 10.6289 4C12.1278 4 13.4914 4.577 14.5297 5.5195L17.3017 2.691C15.5514 1.0265 13.2102 0 10.6289 0C5.21681 0 0.828857 4.4775 0.828857 10C0.828857 15.5225 5.21681 20 10.6289 20C16.0409 20 20.4289 15.5225 20.4289 10C20.4289 9.3295 20.3612 8.675 20.2382 8.0415Z"
                      fill="#FFC107"
                    />
                    <path
                      d="M1.9588 5.3455L5.17859 7.755C6.04981 5.554 8.15975 4 10.6289 4C12.1278 4 13.4914 4.577 14.5297 5.5195L17.3017 2.691C15.5514 1.0265 13.2102 0 10.6289 0C6.86468 0 3.6003 2.1685 1.9588 5.3455Z"
                      fill="#FF3D00"
                    />
                    <path
                      d="M10.6289 20C13.1602 20 15.4603 19.0115 17.1993 17.404L14.1662 14.785C13.1492 15.5742 11.9065 16.001 10.6289 16C8.07988 16 5.91555 14.3415 5.10019 12.027L1.90441 14.5395C3.52631 17.778 6.82009 20 10.6289 20Z"
                      fill="#4CAF50"
                    />
                    <path
                      d="M20.2382 8.0415H19.4489V8H10.6289V12H16.1673C15.7808 13.1082 15.0846 14.0766 14.1647 14.7855L14.1662 14.785L17.1993 17.404C16.9846 17.603 20.4289 15 20.4289 10C20.4289 9.3295 20.3612 8.675 20.2382 8.0415Z"
                      fill="#1976D2"
                    />
                  </svg>
                </div>
                <p className="mb-0">Продолжете со Google</p>
              </button>
              <p>или</p>

              {!toggleRegiser ? (
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, errors, isValid, touched }) => (
                    <Form>
                      <div className="mb-3 md-w-50 mx-auto">
                        <Field
                          type="email"
                          name="email"
                          className={`form-control ${
                            touched.email && errors.email ? "is-invalid" : ""
                          }`}
                          placeholder="Е-маил"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="mb-3 md-w-50 mx-auto">
                        <Field
                          type="password"
                          name="password"
                          className={`form-control ${
                            touched.password && errors.password
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Лозинка"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn login-btn text-white md-w-50 mb-3"
                        disabled={isSubmitting || !isValid}
                      >
                        {isSubmitting
                          ? "Logging in..."
                          : "Продолжете со Е-маил"}
                      </button>
                    </Form>
                  )}
                </Formik>
              ) : (
                <form>
                  <div className="mb-3 md-w-50 mx-auto">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Е-маил"
                    />
                  </div>
                  <div className="mb-3 md-w-50 mx-auto">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Лозинка"
                    />
                  </div>
                  <div className="mb-3 md-w-50 mx-auto">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Повтори лозинка"
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      Се согласувам со условите и правилата за продажба
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="btn login-btn text-white md-w-50 mb-3"
                  >
                    Продолжете со Е-маил
                  </button>
                </form>
              )}

              <p>
                Сеуште немаш профил?
                <button onClick={toggleRegisterModal} className="btn fw-bold">
                  {toggleRegiser ? "Најави се" : "Регистрирај се"}
                </button>
              </p>
            </div>
            <div className="d-none d-md-block col-4 p-0 position-relative">
              <h4
                onClick={toggleLoginModal}
                className="text-right text-white position-absolute cursor end-0 mr-5 mt-3"
              >
                X
              </h4>
              <div className="video-container">
                <video
                  autoPlay
                  muted
                  loop
                  src={require("../../assets/videos/video.webm")}
                ></video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
