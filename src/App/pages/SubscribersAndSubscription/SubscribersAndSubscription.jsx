import React from 'react'
import './subscribersandsubscription.css'
import { Link } from 'react-router-dom'

function SubscribersAndSubscription({ title }) {

    const data = [{
        id: 0,
        title: 'Very very very very very very long title',
        author: 'Very very very very very very long author name',
        length: 1,
    }, {
        id: 1,
        title: 'long title',
        author: 'some author',
        length: 1
    }, {
        id: 2,
        title: 'title',
        author: 'some author',
        length: 1
    }, {
        id: 3,
        title: 'Very long title',
        author: 'some author',
        length: 1
    }, {
        id: 4,
        title: 'Very very very very long title',
        author: 'some author',
        length: 1
    }, {
        id: 5,
        title: 'Very very very very long title',
        author: 'some author',
        length: 1
    }, {
        id: 6,
        title: 'Very very very very long title',
        author: 'some author',
        length: 1
    }, {
        id: 7,
        title: 'Very very very very long title',
        author: 'some author',
        length: 1
    }, {
        id: 8,
        title: 'Very very very very long title',
        author: 'some author',
        length: 1
    }, {
        id: 9,
        title: 'Very very very very long title',
        author: 'some author',
        length: 1
    }, {
        id: 10,
        title: 'Very very very very long title',
        author: 'some author',
        length: 1
    }, {
        id: 11,
        title: 'Very very very very long title',
        author: 'some author',
        length: 1
    }, {
        id: 12,
        title: 'Very very very very long title',
        author: 'some author',
        length: 1
    }, {
        id: 13,
        title: 'Very very very very long title',
        author: 'some author',
        length: 1
    }, {
        id: 14,
        title: 'Very very very very long title',
        author: 'some author',
        length: 1
    }, {
        id: 15,
        title: 'Very very very very long title',
        author: 'some author',
        length: 1
    }, {
        id: 16,
        title: 'Very very very very long title',
        author: 'some author',
        length: 1
    }, {
        id: 17,
        title: 'Very very very very long title',
        author: 'some author',
        length: 1
    }, {
        id: 18,
        title: 'Very very very very long title',
        author: 'some author',
        length: 1
    }, {
        id: 19,
        title: 'Very very very very long title',
        author: 'some author',
        length: 1
    }, {
        id: 20,
        title: 'Very very very very long title',
        author: 'some author',
        length: 1
    }, {
        id: 21,
        title: 'Very very very very long title',
        author: 'some author',
        length: 1
    }]

    return (
        <section className='subandsub'>
            <h2>{title}</h2>
            <ul>
                {
                    data.map(item => (
                        <li key={item.id}>
                            <Link to='/'>
                                <div>
                                    <img src="/" />
                                </div>
                                <p>{item.author.slice(0, 11)}{item.author.length > 11 ? <p>...</p> : null}</p>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </section>
    )
}

export default SubscribersAndSubscription
