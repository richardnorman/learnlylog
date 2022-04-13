# learnlylog
A simple learning management system that allows users to track their progress and share their learning progress with their friends. Also contains extra features like a live chat, badges after completing each course and progress bars for the current completion percentage of each course. Courses can teach the user about a variety of topics, like cooking, electronics, and like we learned in this class, programming languages. Courses will consist of modules, users can either view modules or complete modules to actually earn the course badge by taking a formulation of some skill/learning assessment at the end of each module. These skill/learning assessments will consist of either a multiple choice, true or false, or written/short answer questions that they would need to get right before stamping them as completing the module of the course. In the nav bar of the page there will be a learning log icon, when clicked on, the user can view their progress on all modules and courses in different time intervals, such as their progress in one month, one week and one day. They can share this information and the badges they earn through a link they send to their friends. The idea is a social learning log.

[Try out LearnlyLog here!](https://learnly-log.herokuapp.com/)

[Demo Video](https://drive.google.com/file/d/11I_NzCipyWJUYmjHKbndcA_JEBhnmjIo/view?usp=sharing)

## Development
```
cd frontend
npm install
npm run start
```
See README in `frontend/` for more information.

## Staging
To run the app locally you need to do the following:
```
# First build the client
cd frontend
npm install
npm run build
cd ..

# Run the server locally
npm run start
```
This enables the chat feature.


## Sources
LearnlyLog modules are seeded with data from the following sources:
- [javascript.info](https://javascript.info)
- [w3schools](https://w3schools.com)
- [freeCodeCamp](https://freecodecamp.org)
