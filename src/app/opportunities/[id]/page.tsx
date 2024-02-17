import React from "react";
import OpportunityContent from "@/app/opportunities/[id]/content";
import OpportunityBox from "@/components/OpportunityBox";
import {cookies} from "next/headers";
import OpportunityAnalysisTable from "@/components/tables/OpportunityAnalysisTable";
import SurveyResponsesTable from "@/components/tables/SurveyResponsesTable";

type Props = {
    params: {
        id: string
    }
}

export default function Opportunity(prop: Props) {
    const accessToken = cookies().get("access_token")!.value;
    const opportunityId = parseInt(prop.params.id);
    const opportunityBox = <OpportunityBox opportunityId={opportunityId}/>
    const surveyResponsesTable = <SurveyResponsesTable opportunityId={opportunityId}/>
    const opportunityAnalysisTable = <OpportunityAnalysisTable opportunityId={opportunityId}/>

    return (
        <OpportunityContent opportunityId={opportunityId}
                            opportunityBox={opportunityBox}
                            surveyResponsesTable={surveyResponsesTable}
                            opportunityAnalysisTable={opportunityAnalysisTable}
                            accessToken={accessToken}
        />
    );

}

