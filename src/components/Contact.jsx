import { on } from "nodemailer/lib/xoauth2";
import { useState } from "react";
import { Container , Row , Col} from "react-bootstrap";
import contactImg from '../assets/img/contact-img.svg';

export const Contact = () => {
    const fromInitialDetails = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message:"",
    }
    const [fromDetails , setFromDetails] = useState(fromInitialDetails);
    const [buttonText , setButtonText] = useState('Send');
    const [status , setStatus] = useState({});

    const onFromUpdate = (category , value) =>{
        setFromDetails({
            ...formDetails,
            [category]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonText('Sending...');
        let response = await fetch("https://localhost:500/contact" , {
            method: 'POST',
            headers: {
                'Contant-Type': "Aplication/json;charst=utf-8"
            },
            body: JSON.stringify(formDetails) , 
        })
        setButtonText('Send');
        let result = response.json();
        setFromDetails(fromInitialDetails);
        if(result.code === 200) {
            setStatus({success : true , message : 'Message send successfully'})
        } else {
            setStatus({success: false ,message : "Somrthing when wrong , please try again later."})
        }
    }

    return(
        <section className="contact" id="connect">
            <Container>
                <Row className="align-items-center">
                    <Col md={6}>
                        <img src={contactImg} alt="contactImg" />
                    </Col>
                     <Col md={6}>
                        <h2>Get In Touch</h2>
                        <form onSubmit={handleSubmit}>
                            <Row>
                                <Col sm={6} className="1-px">
                                    <input type="text" vlaue={fromDetails.firstName} placeholder="First Name" onChange={(e) => onFromUpdate('firstName' , e.target.value) } />
                                </Col>
                                <Col sm={6} className="1-px">
                                     <input type="text" vlaue={fromDetails.lastName} placeholder="Last Name" onChange={(e) => onFromUpdate('lastName' , e.target.value) } />
                                </Col>
                                 <Col sm={6} className="1-px">
                                     <input type="email" vlaue={fromDetails.email} placeholder="Email Address" onChange={(e) => onFromUpdate('email' , e.target.value) } />
                                </Col>
                                 <Col sm={6} className="1-px">
                                     <input type="tel" vlaue={fromDetails.phone} placeholder="Phone No." onChange={(e) => onFromUpdate('phone' , e.target.value) } />
                                </Col>
                                <Col>
                                    <textarea row={6} placeholder="Message" value={fromDetails.message} onChange={(e) => onFromUpdate('message' , e.target.vlaue) }></textarea>
                                    <button type="submit"><span>{buttonText}</span></button>
                                </Col>
                                <Col>
                                   {
                                     status.message &&  
                                     <Col>
                                        <p className={status.success == false ? 'danger': 'success'}>{status.message}</p>
                                     </Col>
                                   }
                                </Col>
                            </Row>
                        </form>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}