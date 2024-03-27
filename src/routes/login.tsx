import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Error, Form, Input, Switcher, Title,  Wrapper } from "../component/auth-components";
import GithubButton from "../component/github-btn";

export default function CreateAccount() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: {name, value}} = e;
        if(name === "email"){
            setEmail(value)
        }
        else if (name === "password"){
            setPassword(value)
        };
    }
    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(isLoading || email === "" || password === "" ) return;
        try{
           setLoading(true);
           await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        }catch(e){
            if(e instanceof FirebaseError){
                console.log(e.code, e.message);
                setError(e.message);
            }
            
        }finally{
            setLoading(false);
            console.log(email, password);
    }
    };


    return (
    <Wrapper>
        <Title>JOIN X</Title>
        <Form onSubmit={onSubmit}>
            <Input onChange={onChange} value={email} name="email" placeholder="Email" type="email" required/>
            <Input onChange={onChange} value={password} name="password" placeholder="Password" type="password" required/>
            <Input type="submit" value={isLoading ? "Loading...":"Log in"}/>
        </Form>
        {error !== "" ? <Error>{error}</Error>: null}
        <Switcher>
            Don't have an account? <Link to= "/create-account"> Create one &rarr;</Link>
        </Switcher>
        <GithubButton></GithubButton>
    </Wrapper>
    )
}
