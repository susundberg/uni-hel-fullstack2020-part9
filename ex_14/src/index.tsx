import React from "react";
import ReactDOM from "react-dom";

const courseName = "Half Stack application development";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseWD extends CoursePartBase { // Ya, its not good name but its bit artificial anyway, eh?
  description: string;
}

interface CoursePartOne extends CoursePartBaseWD {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBaseWD {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}


interface CoursePartFour extends CoursePartBaseWD {
  name: "Really deep end";
  secretLink: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

const courseList: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
  },
  {
    name: "Really deep end",
    exerciseCount: 7,
    secretLink: "http://www.dontell.me",
    description: "You really dont know"
  }
];


const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};



const Header: React.FC<{ name: string }> = ({ name }) => (<h1> {name} </h1>)
const Content: React.FC<{ courses: Array<CoursePart> }> = ({ courses }) => (
  <div>
    {courses.map(x => {
      switch (x.name) {
        case "Fundamentals":
          return (<p> F: {x.name} - {x.exerciseCount} - Desc: {x.description} </p>)
        case "Using props to pass data":
          return (<p> U: {x.name} - {x.exerciseCount} - Group: {x.groupProjectCount} </p>)
        case "Deeper type usage":
          return (<p> D: {x.name} - {x.exerciseCount} - Desc: {x.description} - Link: {x.exerciseSubmissionLink} </p>)
          case "Really deep end":
            return (<p> D: {x.name} - {x.exerciseCount} - Desc: {x.description}  - SECRET Link: {x.secretLink} </p>)
          default:
          assertNever(x);
          return <p></p>
      }

    })}
  </div>
)

const Total: React.FC<{ courses: Array<CoursePart> }> = ({ courses }) => (
  <p>
    Number of exercises{" "}
    {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
)

const App: React.FC = () => {


  return (
    <div>
      <Header name={courseName} />
      <Content courses={courseList} />
      <Total courses={courseList} />
    </div>
  )

  /*
  return (
    <div>
      <h1>{courseName}</h1>
      <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
      </p>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );*/
};

ReactDOM.render(<App />, document.getElementById("root"));