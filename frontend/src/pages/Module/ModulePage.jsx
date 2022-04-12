import * as React from "react";
import { Fab, Container } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import "./ModulePage.css";
import { useModules } from "../../hooks/useModules";



const takeQuizButtonStyle = {
    borderRadius: 50,
    padding: 25,
    margin: 30,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
};


function TakeQuizButton(props) {

    return (
        <Link to={`/module-quiz/${props.mId}`}>
            <Fab className="takeQuizButton"
                size="large"
                color="primary"
                variant="contained"
                style={takeQuizButtonStyle}
            >
                Take Quiz
            </Fab>
        </Link>
    );
};


export default function ModulePage() {
    const { id } = useParams();
    const { modules } = useModules();
    const [module, setModule] = React.useState();

    React.useEffect(() => {
        let thisModule = modules.find(m => String(m._id) === id);
        setModule(thisModule);
    }, [modules]);

    return (
        <Container>
            <div className="modulePageHeadStyle">
                <h1>{module?.name}</h1>
            </div>
            <h3>{module?.description}</h3>
            <p>{module?.content}</p>
            <TakeQuizButton mId={module?._id} />
        </Container>
    );
}

