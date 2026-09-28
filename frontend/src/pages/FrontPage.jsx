import Navbar from "../components/Navbar.jsx"
import logo from "../assets/yNotStudy logo 1.png"
import Carousel from "../components/Carousel.jsx"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

function FrontPage() {
  const loggedIn = false; /*add auth state here*/
  const navigate = useNavigate()
  const cards = [
    <>
      <h2>class context</h2>
      <div className="horzdiv"></div>
      <p>uses advanced compressive storage of study materials(tests, quizzes, homework, etc. provided by teacher) to learn to reproduce the teacher’s question-making style and make sure questions match what was learned in class</p>
    </>,
    <>
      <h2>student memory</h2>
      <div className="horzdiv"></div>
      <p>remembers student’s learning styles(e.g. visual learner, prefers diagrams) over time, allowing it to get more accurate as time goes on and help student learn the way optimal for them, instead of how a generic person learns</p>
    </>,
    <>
      <h2>work analysis</h2>
      <div className="horzdiv"></div>
      <p>views not only the answer but the student’s approach to the problem, allowing for a deeper understanding of the student’s comprehension of the topic and provides guidance that works for them with what they are doing</p>
    </>,
    <>
      <h2>test-aware planning</h2>
      <div className="horzdiv"></div>
      <p>when informed of assessment, uses all knowledge to prepare student for the assessment to maximize their score, focusing not only on weaknesses but on general assessment content aptitude, allowing for the student to have an idea of what the test will be like</p>
    </>,
    <>
      <h2>understanding prioritization</h2>
      <div className="horzdiv"></div>
      <p>when applicable(e.g. NOT right before an assessment or when it requires knowledge not possessed by student), focuses on understanding rather than rote memorization, helping students understand why something is the way it is </p>
    </>,
    <>
      <h2>accuTest</h2>
      <div className="horzdiv"></div>
      <p>before assessments, uses prior knowledge of the teacher’s assessment style, as well as the contents of the materials and other information gathered over time to construct a test designed to be as close as possible to the test the student will take</p>
    </>,
  ]
  const [active, setActive] = useState(0);
  function goRight() {
        setActive((active + 1) % cards.length)
  }
  function goLeft() {
        setActive((active - 1 + cards.length) % cards.length)
  }

  return (
      <>
        <img src={logo} className="logo" alt="ynotstudy logo" />
        <Navbar>
          {loggedIn ? (
            <>
              <button onClick={() => navigate("/about")}>about</button>
              <button onClick={() => navigate("/chat")}>chat</button>
              <button onClick={() => navigate("/home")}>home</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/about")}>about</button>
              <button onClick={() => navigate("/login")}>login</button>
            </>
          )}
        </Navbar>

          <h1 className = "makeBigger">y r u not studying?</h1>
          <h1>is it cuz you dont know how to study?</h1>
          <h2 className="left">or what the teacher wants...</h2>
          <h2 className="right">or you dont understand the concepts taught...</h2>
          <h2 className="left">or maybe you dont understand <i>yourself</i></h2>
          <button id="enlightenment">click to reach enlightenment</button>
          <h1></h1>
          <h1>a teacher has to understand dozens of students...</h1>
          <h2>we only need to understand <u>you</u> and <u>your</u> teacher...</h2>
          <div className="compare">
            <div className="compareCard">
              <h2>you</h2>
              <ul>
                <li>learns your learning style over time</li>
                <li>figures out what types of problems you struggle with</li>
                <li>learns what type of teaching you like</li>
                <li>hones itself to <b>you</b></li>
              </ul>
            </div>

            <div className="divider"></div>

            <div className="compareCard">
              <h2>your teacher</h2>
              <ul>
                <li>absorbs their teaching style over time</li>
                <li>figures out what types of problems they give</li>
                <li>creates tests and questions similar to theirs</li>
                <li>hones itself to <b>you</b></li>
              </ul>
            </div>
          </div>
          <h1></h1>
          <h1>not just another ai study app...</h1>
          <div className="carouselLR">
            <button id="carouselL" onClick={goLeft}>{"<"}</button>
            <button id="carouselR" onClick={goRight}>{">"}</button>
          </div>
          <Carousel cards={cards} active={active} />
          <h1></h1>
          <h1>ready to get started on <b>your</b> studying?</h1>
          <button id="enlightenment">click to reach enlightenment</button>
      </>
  );
}

export default FrontPage