import React,{useState, useEffect} from 'react'
import Header from './Header'
import {Modal,Container} from 'react-bulma-components'
import AddButton from './AddButton'
import ListaCitas from './Lista_citas'
import Form from './Form'
import Loading from './Loading'

import {saveCita,getCitas} from '../Servicios'
const ProductLayout= ()=>{
	const [ismodal,setismodal]=useState(false)
	const [isloading,setisloading]	= useState(true)
	const [citas,setcitas]			= useState([])
	async function loadcitas(){
		const response= await getCitas()
		console.log(response.data.cita)
		if(response.status===200){
			setcitas(response.data.cita)
		}
		setisloading(false)
	}
	useEffect(()=>{
		loadcitas()
	},[])

	const handlesubmit=async(data)=>{
		await saveCita(data)
		loadcitas()
		setismodal(false)
	}
	return(
		<Container>
			<Header title={"La wea :D"}/>
			<AddButton onClick={()=>setismodal(true)}/>
			{isloading && <Loading/>}
			{!isloading && !citas.length && <h2 className="title has-text-centered">{"no hay cosas uwu"}</h2>}
			{!isloading &&  citas.length && <ListaCitas citas={citas}/>}
			<Modal show={ismodal} onClose={()=>setismodal(false)}>
				<Modal.Card>
					<Modal.Card.Header showClose={false}>
						<Modal.Card.Title>
							Citas... con la lola 1313
						</Modal.Card.Title>
					</Modal.Card.Header>
					<Modal.Card.Body>
						<Form handlesubmit={handlesubmit}/>
					</Modal.Card.Body>
				</Modal.Card>
			</Modal>
		</Container>
	)
}

export default ProductLayout