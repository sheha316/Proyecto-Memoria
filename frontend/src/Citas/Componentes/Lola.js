import React, { useState } from 'react';
import {
  ToggleButton, Container, Form, Row,
} from 'react-bootstrap';

function Horario_Semanal() {

  const [Schedule,setSchedule]=useState([
    [false,false, false, false,false, false, false],
    [false,false, false, false,false, false, false],
    [false,false, false, false,false, false, false],
    [false,false, false, false,false, false, false],
    [false,false, false, false,false, false, false],
    [false,false, false, false,false, false, false],
    [false,false, false, false,false, false, false],
    [false,false, false, false,false, false, false],
    [false,false, false, false,false, false, false],
  ]);
  const traducir_a_blooque=(a)=>{
    return (2*a-1)+"-"+(2*a)
  }
  const onMatrixChange=(i,j)=>{
    const aux=[...Schedule]
    aux[i][j]= !aux[i][j]
    setSchedule(aux)
  }

  const days = ['','Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  return (
    <Container style={{ marginTop: 10 }}>
      <Form>
        <>
          <Row>
            <Form.Label>Días en que se harán evaluaciones:</Form.Label>
          </Row>
          {Schedule.map((i, indexi) => (

            i.map((j, indexj) => (
              <>
                <ToggleButton
                  key={indexi*7+indexj}
                  id={indexi*7+indexj}
                  value={indexi*7+indexj}
                  checked={Schedule[indexi,indexj]}
                  onChange={() => {onMatrixChange(indexi,indexj)}}
                  type="checkbox"
                  style={{height:40, width:100, borderWidth: 2,borderColor:"Black",
                  backgroundColor:indexi==0||indexj==0?'blue':Schedule[indexi][indexj]?'red' : 'grey'}}
                >
                {indexi==0 && days[indexj]}
                {indexj==0 && indexi>0 &&traducir_a_blooque(indexi)}
              </ToggleButton>
              {indexj==6 && <Row/>}
              </>
            ))
          ))
        }
        </>
      </Form>

    </Container>
  );
}
export default Horario_Semanal;