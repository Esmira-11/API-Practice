import { useParams } from "react-router-dom";
import  Layout  from "../components/Layout";
import { Row, Col, Spinner, Card, CardHeader, CardBody,CardFooter,Button } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter, InputGroup,Input } from 'reactstrap';
import axios from "axios";
import React, { useEffect, useState } from "react";
import {MdDelete} from 'react-icons/md'
import EditModalBox from "../components/EditModalBox";
import AddPost from "../components/AddPost";

function UsersPosts() {
    let initialState = {
        data: undefined,
        error: undefined,
        loading: true,
    };
    
    const [posts, setPosts] = useState(initialState);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
          .then(({ data }) => {
            setPosts((oldData) => ({
              ...oldData,
              data: data,
              loading: false,
              error: undefined,
            }));
          })
          .catch((err) => {
            setPosts({ data: undefined, loading: false, error: err.toString() });
          });
    }, [id]);

    const addPosts = (element)=>
    {
      setPosts({...element})
      axios.get(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
          .then(({ data }) => {
            setPosts((element) => ({
              ...element,
              data: data,
              loading: false,
              error: undefined,
            }));
          })
          .catch((err) => {
            setPosts({ data: undefined, loading: false, error: err.toString() });
          });
    };

    const editPost =(title,body)=>{
      axios.post(`https://jsonplaceholder.typicode.com/users/${id}/posts`, {
          title: title,
          body: body
        })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => console.log(error));

    };

    const removePost = (id) => {
      let filteredPosts = Array.isArray(posts) ? posts.filter((q) => q.id != id): [];
      setPosts(filteredPosts);
      axios
        .delete(`https://jsonplaceholder.typicode.com/posts/${id}/`)
        .then((res) => setPosts(res.data))
        .catch((error) => console.log(error));
    };

    const renderBody=()=>{
        if(posts.loading){
            return <Spinner/>
        }
        else if(posts.error){
            return <h4 className="text-danger">Unexpected error occured :(</h4>
        }
        else{
            return(
                posts.data?.map(({id,title,body})=>(
                    <Card className="mt-3">
                         <CardHeader>{title}</CardHeader>
                         <CardBody>{body}</CardBody>
                         <CardFooter>
                         <EditModalBox currentDataTitle = {title} currentDataBody = {body} propEditFunction = {editPost}/>
                         <MdDelete style={{fontSize:30, color:'red',cursor:'pointer'}} onClick={() => removePost({id})}/>
                         </CardFooter>
                    </Card>
                 ))
            )
        }
    }

  return (
    <>
    <Layout>
      <Row>
        <Col ms={12}>
          <AddPost propAddFunction = {addPosts}/>
          {renderBody()}
        </Col>
      </Row>
    </Layout>
    </>
  )
}

export default UsersPosts