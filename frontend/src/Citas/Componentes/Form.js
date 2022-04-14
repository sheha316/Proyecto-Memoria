import React, {useState,useRef} from 'react'
import {Form,Button} from 'react-bulma-components'

const {Field, Control, Label, Input} = Form
export const Formulario =({handlesubmit})=>{
	const [formValues,setformValues]=useState({
		nombre:'',
		apellido:'',
		rut:'',
	})

	const inputFileRef=useRef()

	const handleChange=(event)=>{
		const{name,value}=event.target
		setformValues({...formValues,[name]:value})
	}
	const _handlesubmit =(e)=>{
		e.preventDefault()
		handlesubmit({...formValues,image:inputFileRef.current.files[0]})
	}
	return (
		<form onSubmit = {_handlesubmit}>
			<Field>
				<Label>Nombre</Label>
				<Control>
					<Input
					 placeholder="Juan"
					 name={"nombre"}
					 value={formValues.nombre}
					 onChange={handleChange}/>
				</Control>
			</Field>
			<Field>
				<Label>Aapellido</Label>
				<Control>
					<Input
					 placeholder="Alvarez"
					 name={"apellido"}
					 type={"string"}
					 value={formValues.apellido}
					 onChange={handleChange}/>
				</Control>
			</Field>
			<Field>
				<Label>RUT</Label>
				<Control>
					<Input
					 placeholder="12.345.678-k"
					 type={"number"}
					 name={"rut"}
					 value={formValues.rut}
					 onChange={handleChange}/>
				</Control>
			</Field>
			<Field>
				<Label>Archivo</Label>
				<Control>
					<input
					 type="file" ref={inputFileRef}/>
				</Control>
			</Field>
			<Button
			 type="submit"
			 color="primary">
			 Save
			 </Button>
		</form>
	)
}

export default Formulario