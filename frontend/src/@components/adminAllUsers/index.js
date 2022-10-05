import React, { useEffect, useState } from 'react'
import SideBar from '../sideBar'
import { useDispatch, useSelector } from 'react-redux'
import './index.css'
import Loader from '../loader'
import { Link } from 'react-router-dom'
import { Modal, Button, Container, Row } from 'react-bootstrap'
import UserRoleInput from './userRoleInput'
import { adminDeleteUser } from '../../@actions/userActions/adminDeleteUser'

const AdminAllTheUsers = ({allTheUsers, allUsersLoading, allUsersSuccess}) => {
    const dispatch = useDispatch()
    
    const [input, showInput] = useState('')
    const [show, setShow] = useState(false);
    const [deleteUsr, setDeleteUsr] = useState('')
    const clickUserRole = (e, userId) => {
        e.stopPropagation()
        showInput(userId)
    }

    const {deletedUser, deletedUserError, deletedUserSuccess} = useSelector(state => state.deletedUser)
    const deleteTheUser = (id) => {
        dispatch(adminDeleteUser(id))
        setDeleteUsr(id)
    }
    useEffect(() => {
        if(deletedUserSuccess){
        window.location.reload(false).scrollTo(0, 0)
        }
    }, [deletedUserSuccess])

  return (
    <div onClick={() => showInput('')}>
            {allUsersLoading ? <Loader /> : allUsersSuccess &&
         <div>
                    {allTheUsers.length === 0 ? 
                    <Container>
                        <Row className = 'justify-content-center mt-5'>No Orders to Show</Row>
                    </Container> :
                    <div>
                    <table>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Joining Date</th>
                                <th>User Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allTheUsers.map(user => (
                                <tr>
                                    <td data-label = 'First Name'>{user.firstName}</td>
                                    <td data-label = 'Last Name'>{user.lastName}</td>
                                    <td data-label = 'Email'>{user.email}</td>
                                    <td data-label = 'Joining Date'>{user.createdAt}</td>
                                    <td data-label = 'User Role' onClick={(e) => clickUserRole(e, user._id)} style={{ color: 'blue', cursor: 'default' }}>{input === user._id ? <UserRoleInput id={user._id} /> : <span>{user.role}</span>}</td>
                                    <td data-label = 'Actions' style = {{color : 'red', cursor : 'default'}}>{deletedUserError && deleteUsr === user._id ? <div className = 'text-danger'>{deletedUserError}</div> : <div><div onClick = {() => setShow(true)}>Delete </div>
                                    <Modal show={show} onHide={() => setShow(false)}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Delele User</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>Are you sure that you want to delete this user, Remember that it cannot be undone!</Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={() => setShow(false)}>
                                                    Cancel
                                                </Button>
                                                <Button variant="danger" onClick={() => deleteTheUser(user._id)}>
                                                    Delete
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                        </div>
                                    }</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>}
                </div>}
        </div>
  )
}

export default AdminAllTheUsers