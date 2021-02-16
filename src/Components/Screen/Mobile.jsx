import React , {useState} from 'react'
import {useMutation} from '@apollo/client'
import {LOGIN_MOBILE}from '../../Graphql/Mutation'
const Mobile = () => {
    const [phone, setPhone] = useState('')
    const [loginMobile , {data , loading , error}] = useMutation(LOGIN_MOBILE);
    const submit = () => {
        loginMobile({variables:phone})
    }
    return (
        <div>
           <form>
           <input name="phone" type="phone" onChange={(e) => setPhone(e.target.value)} />
            <button onClick={submit}>submit</button>
           </form>
        </div>
    )
}

export default Mobile
