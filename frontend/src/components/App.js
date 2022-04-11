import * as React from "react";
import { AppBar, Toolbar, Button, Typography, IconButton } from "@material-ui/core";
import { AccountCircle, CalendarToday, ExitToApp, Chat } from '@material-ui/icons';
import { WelcomePage } from "./WelcomePage";
import { TodoItemsPage } from "./TodoItemsPage";
import { RealmAppProvider, useRealmApp } from "./RealmApp";
import { ThemeProvider } from "./Theme";
import { AppName } from "./AppName";
import { appId } from "../realm.json";
import { Routes, Route, Link } from "react-router-dom";
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
    <div className="App">
      <AppBar position="sticky">
        <Toolbar>
          <AppName />
          {currentUser ? (
            <div>
              <Link to="/chat">
                <IconButton color="secondary" aria-label="delete" size="large">
                  <Chat />
                </IconButton>
              </Link>
              <Link to="/learning-log">
                <IconButton color="secondary" aria-label="delete" size="large">
                  <CalendarToday />
                </IconButton>
              </Link>
              <Link to="/account">
                <IconButton color="secondary" aria-label="delete" size="large">
                  <AccountCircle />
                </IconButton>
              </Link>
              
              <IconButton
                variant="contained"
                color="secondary"
                onClick={async () => {
                  await logOut();
                  window.location.assign("/");
                }}
              >
                <ExitToApp />
              </IconButton>
            </div>
          ) : null}
        </Toolbar>
      </AppBar>
      {currentUser ? (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/course-modules/:id" element={<CourseModulesPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/all-courses" element={<AllCoursesPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/interests" element={<InterestsPage />} />
          <Route path="/learning-log" element={<LearningLogPage />} />
          <Route path="/module/:id" element={<ModulePage />} />
          <Route path="/module-quiz" element={<ModuleQuizPage />} />
        </Routes>
      ) :
        // sign in/register
        <WelcomePage />
      }
    </div>
  );
}
