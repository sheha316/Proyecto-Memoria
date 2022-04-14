import React,{useState, useEffect} from 'react'
import {Card,Columns,Content, Heading} from 'react-bulma-components'
const Lista_citas=({citas})=>{
	return(
		<Columns>
			{
				citas.map(({nombre_p,apellido_p,rut,imgUrl,_id})=>(
					<Columns.Column size={4} key={_id}>
						<Card>
							<Card.Image size="16by9" src={imgUrl}/>
							<Card.Content>
								<Content>
									<Heading>{nombre_p} {apellido_p}</Heading>
									<Heading subtitle size={6}>{rut}</Heading>
								</Content>
							</Card.Content>
						</Card>
					</Columns.Column>
					))
			}
		</Columns>
	)
}
export default Lista_citas