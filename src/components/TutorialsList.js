import React, { useState, useEffect }from "react";
import TutorialDataService from "../services/TutorialService";
import { Button, Table, InputGroup, FormControl, Form } from 'react-bootstrap';
import axios from "axios"
import Tutorial from "./Tutorial";
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'


const TutorialsList = () => {
  const [tutorials, setTutorials] = useState({data :[{id:0,title:"a",description:"a",published:false},{id:1,title:"b",description:"b",published:false}]})
  const [searchTitle, setSearchTitle] = useState();

  const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
  const { t } = useTranslation()

  useEffect(() => {
    retrieveTutorials();
  }, []);

  const retrieveTutorials = async() => {
    // await  axios.get("http://c91fdf3cf3c6.ngrok.io/api/sortedtutorials")
    TutorialDataService.getAll()
        .then(response => {
            console.log(response)
            // const data = response.data.tutorials
            // console.log(data)
            setTutorials({ data : response.data.tutorials})
        })
        .catch(err => {
          console.log(err)
        })
    
  }

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const deleteTutorial =  async(id) => {
    // await axios.delete(`http://c91fdf3cf3c6.ngrok.io/api/tutorials/${id}`)
    TutorialDataService.remove(id)
        .then(res => {
        var newTutorial = tutorials.data.filter((item) =>{
          console.log(item.id)
          return item.id !== id
        });
       
        console.log(newTutorial);
        setTutorials({data : newTutorial})
        })
    } 
  
  const addTutorial = async () => {
    // TutorialDataService.create(data_post)
    axios.post('http://1b773dbba9e1.ngrok.io/api/tutorials', {title: title,description : description,published : false })
      .then(res => {
        console.log(res);
        // console.log(res.data.tutorials);
        const data_res = [...Tutorial.data,res.data]
        setTutorials({data : data_res})
      })    
  }

  const findByTitle = async() => {
    TutorialDataService.findByTitle(searchTitle)
      .then(response => {
        var new_data = response.data.tutorials
        setTutorials({data : new_data});
        console.log(tutorials);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const printpdf = () => {
    const doc = new jsPDF()
    const arr_pdf = []
    tutorials.data.map((e)=> arr_pdf.push(Object.values(e)))
    console.log(arr_pdf)
    doc.autoTable({
      // styles: { fillColor: [255, 0, 0] },
      // columnStyles: { 0: { halign: 'center', fillColor: [0, 255, 0] } }, // Cells in first column centered and green
      // margin: { top: 10 },
      head: [['Id', 'Title', 'Description','Published']],
      body: arr_pdf,
    })
    
    doc.save('table.pdf')

  }
  return (
    <>
      <div className="list row" style={{"padding":"5% 2%"}}>
        <div className="col-md-8">
          {/* search */}
          <InputGroup className="mb-3">
            <FormControl
              placeholder={t('enter_a_title')}
              aria-describedby="basic-addon2"
              onChange={onChangeSearchTitle}
            />
            <Button variant="outline-secondary" id="button-addon2" onClick={findByTitle}>
            {t('Search')}
            </Button>
          </InputGroup>

          {/* list items */}
          <h4 style={{marginTop:"50px"}}>{t('Tutorials_List')}</h4>
          <Table striped bordered hover style={{fontSize:"18px",}}>
            <thead>
              <tr>
              <th>{t('Title(job_title)')}</th>
              <th>{t('Description')}</th>
              <th>{t('Status')}</th>
              <th>{t('Action')}</th>
              </tr>
            </thead>
            <tbody>
            {tutorials ?(
          tutorials.data.map((tutorial, index) => 
              <tr>
              <td>{tutorial.title} {tutorial.id}</td>
              <td>{tutorial.description}</td>
              <td>{tutorial.published === true ? 'Published' : "Pending" }</td>
              <td><Link to={`tutorials/${tutorial.id}`}><Button variant="outline-primary" >{t('Detail')}</Button></Link> <Button variant="outline-success" onClick={ ()=>{deleteTutorial(tutorial.id)}}>{t('Delete')}</Button> </td>
              </tr>
            )) : (
              <p>Xin cho mot chut, Data dang load</p>
            ) }
            </tbody>
          </Table>
          <Button variant="dark" onClick={printpdf}>{t('Print_pdf')}</Button>
        </div>
        
        <div className="col-md-4" style={{marginTop:"80px"}} >
          { /* add items */ }
          <h4>{t('Add_Tutorial')}</h4>
          <Form>
            <Form.Group className="mb-3" >
              <Form.Label>{t('Title')}</Form.Label>
              <Form.Control type="text" onChange={(e) => setTitle(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>{t('Description')}</Form.Label>
              <Form.Control type="text" onChange={(e) => setDescription(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">
            {t('Submit')}
            </Button>
          </Form>
        </div>
      </div> 
    </> );
};

export default TutorialsList;