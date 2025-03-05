var mydata = JSON.parse(data);
console.log(mydata);

const heading = document.createElement("h3");
heading.textContent = "Heading";
heading.classList.add('heading');
document.body.appendChild(heading);
// hello hello hello hello
const situation = document.createElement("div");
situation.textContent = "Situation";
situation.classList.add('situation');
situation.classList.add('situation');
document.body.appendChild(situation);

const action = document.createElement("div");
action.textContent = "Action";
action.classList.add('action');
action.classList.add('action');
document.body.appendChild(action);

const results = document.createElement("div");
results.textContent ="Results";
results.classList.add('results');
results.classList.add('results');
document.body.appendChild(results);