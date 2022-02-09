import React, { useState, useContext } from 'react';

const PersonContext = React.createContext()
// two components - provider & consumer

const ContextAPI = () => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [people, setPeople] = useState([]);

    React.useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPeople(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []) // make notice on number of renders []

    const removePerson = (id) => {
        setPeople((people) => {
            return people.filter((person) => person.id !== id);
        });
    };

    // return (
    //     <>
    //         <PersonContext.Provider value={{ removePerson, people }}>
    //             <h3>prop drilling</h3>
    //             <List />
    //         </PersonContext.Provider>
    //     </>
    // );

    if (error) {
        return <h3>Error: {error.message}</h3>;
    } else if (!isLoaded) {
        return <h3>Loading...</h3>;
    } else {
        return (
            <>
                <PersonContext.Provider value={{ removePerson, people }}>
                    <h3>prop drilling</h3>
                    <List />
                </PersonContext.Provider>
            </>
        );
    }
};

const List = () => {
    const mainData = useContext(PersonContext)
    return (
        <>
            {mainData.people.map((person) => {
                // console.log(person);
                return (
                    <SinglePerson
                        key={person.id}
                        {...person}
                    />
                );
            })}
        </>
    );
};

const SinglePerson = ({ id, title }) => {
    const { removePerson } = useContext(PersonContext)
    return (
        <div className='item'>
            <h4>{id}</h4>
            <h4>{title}</h4>
            <button onClick={() => removePerson(id)}>remove</button>
        </div>
    );
};

export default ContextAPI;
