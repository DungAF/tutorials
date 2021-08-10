import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/TutorialService";
import {Form, Button} from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const Tutorial = props => {
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const { t } = useTranslation()

  const getTutorial = id => {
    TutorialDataService.get(id)
      .then(response => {
        setCurrentTutorial(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTutorial(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentTutorial.id,
      title: currentTutorial.title,
      description: currentTutorial.description,
      published: status
    };

    TutorialDataService.update(currentTutorial.id, data)
      .then(response => {
        setCurrentTutorial({ ...currentTutorial, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateTutorial = () => {
    TutorialDataService.update(currentTutorial.id, currentTutorial)
      .then(response => {
        console.log(response)
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteTutorial = () => {
    TutorialDataService.remove(currentTutorial.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/tutorials");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTutorial ? (
        <div className="col-md-6" style={{"margin":"10% auto", "alignItems":"center"}}>
        <div className="edit-form">
          <h1 style={{"textAlign":"center", "margin-bottom": "5%"}}>{t("Add_Tutorial")}</h1>
          <Form >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>{t('Title')}</Form.Label>
              <Form.Control type="text"  value={currentTutorial.title} name="title"  onChange={handleInputChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>{t('Description')}</Form.Label>
              <Form.Control type="text"  value={currentTutorial.description} name="description" onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Label>{t("Status")} : {currentTutorial.published === true ? "published" : "pending"}</Form.Label>
            </Form.Group>
            <div style={{"textAlign":"center","marginTop":"5%"}}>
              {currentTutorial.published ? (
                <Button variant="primary" style={{"margin":"0% 2%"}} onClick={() => updatePublished(false)}>
                {t("UnPublish")}
                </Button>
              ) : (
                <Button variant="primary" style={{"margin":"0% 2%"}} onClick={() => updatePublished(true)}>
                {t("Publish")}
                </Button>
              )}
              
              <a href="/list"><Button variant="danger" style={{"margin":"0% 2%"}} onClick={deleteTutorial}>{t("Delete")}</Button></a>
              <Button variant="success" style={{"margin":"0% 2%"}} onClick={updateTutorial} >{t("Update")}</Button>
            </div>
          </Form>
        </div>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
          
        </div>
      )}
    </div>  );
};

export default Tutorial;