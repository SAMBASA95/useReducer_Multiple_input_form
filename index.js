import React, { useState, useReducer, useEffect, useRef } from 'react';
import Modal from './model';
import { reducer } from './reducer';

const defaultState = {
    people: [],
    isModelOpen: false,
    modalContent: ''
}

const Index = () => {

    const refContainer = useRef(null)
    const [person, setPerson] = useState({ firstName: '', email: '', age: '' })
    const [state, dispatch] = useReducer(reducer, defaultState)

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        console.log(name, " ", value);
        setPerson({ ...person, [name]: value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (person.firstName && person.email && person.age) {
            const newPerson = {
                id: new Date().getTime().toString(),
                ...person
            }
            dispatch({ type: 'ADD_ITEM', payload: newPerson });
            setPerson({ firstName: '', email: '', age: '' })
        }
        else {
            dispatch({ type: 'NO_VALUE' });
        }
    }
    const closeModal = () => {
        dispatch({ type: 'CLOSE_MODAL' });
    };

    useEffect(() => {
        refContainer.current.focus()
    }, [])

    return (
        <>
            {/*  state.isModalOpen  is false  */}
            {state.isModalOpen && (
                <Modal closeModal={closeModal}
                    modalContent={state.modalContent} />
            )}
            <form onSubmit={handleSubmit} className='form'>
                <div className="form-control">
                    <label htmlFor="firstName">Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        ref={refContainer}
                        value={person.firstName}
                        onChange={handleChange} />
                </div>
                <div className="form-control">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={person.email}
                        onChange={handleChange} />
                </div>
                <div className="form-control">
                    <label htmlFor="age">Age:</label>
                    <input
                        type="text"
                        id="age"
                        name="age"
                        value={person.age}
                        onChange={handleChange} />
                </div>
                <button type='submit'>Add </button>
            </form>
            <div className='item_row '>
                <h4>firstName</h4>
                <h4>age</h4>
                <h4>email</h4>
                <h4>remove</h4>
            </div>
            {state.people.map((person) => {
                return (
                    <div key={person.id} className='item'>
                        <h4>{person.firstName}</h4>
                        <h4>{person.age}</h4>
                        <h4>{person.email}</h4>
                        <button
                            onClick={() =>
                                dispatch({
                                    type: 'REMOVE_ITEM',
                                    payload: person.id
                                })
                            }
                        >
                            remove
                        </button>
                    </div>
                );
            })}

        </>
    );
};

export default Index;
