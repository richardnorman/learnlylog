import { AppBar, Toolbar, Button, Typography } from "@material-ui/core";
import { WelcomePage } from "./WelcomePage";
import { TodoItemsPage } from "./TodoItemsPage";
import { RealmAppProvider, useRealmApp } from "./RealmApp";
import { ThemeProvider } from "./Theme";
import { AppName } from "./AppName";
import { appId } from "../realm.json";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import AccountPage from '../pages/Account/AccountPage';
import AllCoursesPage from '../pages/AllCourses/AllCoursesPage';
import ChatPage from '../pages/Chat/ChatPage';
import CourseModulesPage from '../pages/CourseModules/CourseModulesPage';
import HomePage from '../pages/Home/HomePage';
import InterestsPage from '../pages/Interests/InterestsPage';
import LearningLogPage from '../pages/LearningLog/LearningLogPage';
import ModulePage from '../pages/Module/ModulePage';
import ModuleQuizPage from '../pages/ModuleQuiz/ModuleQuizPage';
import "./App.css";

export default function AppWithRealm() {
  return (
    <ThemeProvider>
      <RealmAppProvider appId={appId}>
        <App />
      </RealmAppProvider>
    </ThemeProvider>
  );
}

function App() {
  const { currentUser, logOut } = useRealmApp();
  return (
    <Router>
      <Switch>
        <Route exact path='/learnlylog'>
          <HomePage />
        </Route>
        <Route path='/learnlylog/chat'>
          <ChatPage />
        </Route>
        <Route path='/learnlylog/course-modules'>
          <CourseModulesPage />
        </Route>
        <Route path='/learnlylog/module-quiz'>
          <ModuleQuizPage />
        </Route>
        <Route path='/learnlylog/account'>
          <AccountPage />
        </Route>
        <Route exact path='/learnlylog/all-courses'>
          <AllCoursesPage />
        </Route>
        <Route path='/learnlylog/interests'>
          <InterestsPage />
        </Route>
        <Route path='/learnlylog/module'>
          <ModulePage />
        </Route>
        <Route path='/learnlylog/sign-in'>
          <TodoItemsPage />
        </Route>
        <Route path='/learnlylog/register'>
          <WelcomePage />
        </Route>
        <Route path='/learnlylog/log'>
          <LearningLogPage />
        </Route>
      </Switch>
    </Router>
    //<div className="App">
    //  <AppBar position="sticky">
    //    <Toolbar>
    //      <AppName />
    //      {currentUser ? (
    //        <Button
    //          variant="contained"
    //          color="secondary"
    //          onClick={async () => {
    //            await logOut();
    //          }}
    //        >
    //          <Typography variant="button">Log Out</Typography>
    //        </Button>
    //      ) : null}
    //    </Toolbar>
    //  </AppBar>
    //  {currentUser ? <TodoItemsPage /> : 
    //    <Link to="/home">Home</Link>
    //  }
//
   // </div>
  );
}
