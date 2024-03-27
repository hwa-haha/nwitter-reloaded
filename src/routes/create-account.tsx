
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Error, Form, Input, Switcher, Title, Wrapper } from "../component/auth-components";
import GithubButton from "../component/github-btn";

const errors ={
    "auth/email-already-in-use": "That email already exists."
}

export default function CreateAccount() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: {name, value}} = e;
        if(name === "name"){
            setName(value)
        }else if(name === "email"){
            setEmail(value)
        }
        else if (name === "password"){
            setPassword(value)
        };
    }
    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(name === "" || email === "" || password === "" ) return;
        try{
            const credentials = await createUserWithEmailAndPassword(auth, email, password);
            console.log(credentials.user);
            await updateProfile(credentials.user, {
                displayName:name,
            });
            navigate("/");
        }catch(e){
            if(e instanceof FirebaseError){
                console.log(e.code, e.message);
                setError(e.message);
            }
            
        }finally{
            setLoading(false);
            console.log(name, email, password);
    }
    };


    return (
    <Wrapper>
        <Title>JOIN X</Title>
        <Form onSubmit={onSubmit}>
            <Input onChange={onChange} value={name} name="name" placeholder="Name" type="text" required/>
            <Input onChange={onChange} value={email} name="email" placeholder="Email" type="email" required/>
            <Input onChange={onChange} value={password} name="password" placeholder="Password" type="password" required/>
            <Input type="submit" value={isLoading ? "Loading...":"CreateAccount"}/>
        </Form>
        {error !== "" ? <Error>{error}</Error>: null}
        <Switcher>
            Already have an account? <Link to= "/login"> Log in &rarr;</Link>
        </Switcher>
        <GithubButton></GithubButton>
    </Wrapper>
    )
}
