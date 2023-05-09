import React,{ useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Input } from 'reactstrap';

function AddPost(args) {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [data, setData] = useState({}) ;
    const addNewData =(value,dataName)=>
    {   
        const newState= {...data ,[dataName]: value }
        setData(newState)
         
    }
    
  return (
    <>
        <Button onClick={toggle} style={{background:'teal'}}>Create</Button>

        <Modal isOpen={modal} toggle={toggle} {...args}>
          <ModalHeader toggle={toggle}>Create New Post</ModalHeader>
          <ModalBody>
            
          <Input type="text" placeholder="post title" style={{marginBottom:20}} onChange={(e)=>addNewData(e.target.value,'title')}/>
          <Input type="text" placeholder="post body" onChange={(e)=>addNewData(e.target.value,'body')}/>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={()=>{args.propAddFunction(data);setModal(!modal)}}>
              Add
            </Button>{' '}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
  )
}

export default AddPost