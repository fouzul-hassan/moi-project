import QuestionnaireInner from "@/components/questions/QuestionnaireInner";
import {getQuestions, getSurveyResponse} from "@/utils/questionnaire-utils";
import {waitRandomTime} from "@/utils/test-utils";

type Props = {
    projectName: string;
    projectId: string;
    finalSectionEnabled: boolean;
}

export default async function Questionnaire(props: Props) {
    await waitRandomTime();
    const questions = await getQuestions(props.projectName);
    const surveyResponse = await getSurveyResponse(parseInt(props.projectId));

    return (
        <QuestionnaireInner projectName={props.projectName} projectId={props.projectId} questions={questions} response={surveyResponse} finalSectionEnabled={props.finalSectionEnabled}/>
    );
}