import { useEffect , useState } from "react"
import { Container , Row , Col} from "react-bootstrap"
import {ArrowRightCircle} from "react-bootstrap-icons"
import headerImg from "../assets/img/header-img.svg"
 
export const Banner = () =>{

    const [loopNum , setLoopNum] = useState(0);
    const [isDelating,setIsDelating] = useState(false)
    const toRotate = ["Web Dvevoloper" , "Web Designer" , "UX/UI designer"];
    const [text, setText] = useState('')
    const [delta, setDelta] = useState(300 - Math.random()*100)
    const period = 2000;

    useEffect(() =>{
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => {clearInterval(ticker)}
    },[text])

    const tick = () => {
        let i = loopNum %   toRotate.length
        let fullText = toRotate[i];
        let updateText = isDelating ? fullText.substring(0 , text.length - 1): fullText.substring(0 , text.length + 1);

        setText(updateText);

        if(isDelating){
            setDelta(prevDelta => prevDelta / 2)
        }
        if(!isDelating && updateText === fullText){
            setIsDelating(true);
            setDelta(period);
        } else if(isDelating && updateText === ""){
            setIsDelating(false);
            setLoopNum(loopNum + 1);
            setDelta(500)
        }
    }

    return (
        <section className="banner" id="home">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6}>
                        <span className="tagline">Welcome to my portfolio</span>
                        <h1>{`Hi I'm Jasurbek `} <span className="wrap">{text}</span></h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi impedit sit rerum vero at dolor, quaerat omnis necessitatibus culpa suscipit neque? Dolorum laudantium iure animi cupiditate odio possimus suscipit blanditiis?
                        </p>
                        <button onClick={() => console.log('connect')}>Let's Connect <ArrowRightCircle size = {25}/></button>
                    </Col>
                    <Col xs={12} md={6}>
                        <img src={headerImg} alt="Header" />
                    </Col>
                </Row>
            </Container>
        </section>
    )
}