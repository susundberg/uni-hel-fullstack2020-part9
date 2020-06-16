import React from "react";
import ReactDOM from "react-dom";

const courseName = "Half Stack application development";

type CourseBase = {
  name: string;
  exerciseCount: number;
}

const courseList: Array<CourseBase> = [
  {
    name: "Fundamentals",
    exerciseCount: 10
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14
  }
];

const Header: React.FC<{ name: string }> = ({ name }) => (<h1> {name} </h1>)
const Content: React.FC<{ courses: Array<CourseBase> }> = ({ courses }) => (
  <div>
    {courses.map(x => (<p key={x.name}> {x.name} - {x.exerciseCount} </p>))}
  </div>
)

const Total: React.FC<{ courses: Array<CourseBase> }> = ({ courses }) => (
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