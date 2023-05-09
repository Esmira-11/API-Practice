import React,{ useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Input } from 'reactstrap';
import {FaEdit} from 'react-icons/fa';

function EditModalBox(args) {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const editableContent = [];

    const contentEdit =(a)=>{
      editableContent.push(a)
    }
    
    return (

        <>
        <FaEdit style={{fontSize:30, color:'teal',cursor:'pointer'}} onClick={toggle} />

        <Modal isOpen={modal} toggle={toggle} {...args}>
          <ModalHeader toggle={toggle}>Edit Post</ModalHeader>
          <ModalBody>
          <Input type="text" defaultValue={args.currentDataTitle} style={{marginBottom:20}} onChange={(e)=> contentEdit(e.target.value) }/>
          <Input type="text" defaultValue={args.currentDataBody} onChange={(e)=> contentEdit(e.target.value)} />

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={()=>{args.propEditFunction(editableContent[0],editableContent[1]);setModal(!modal)}}>
              Save
            </Button>{' '}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
}

export default EditModalBox