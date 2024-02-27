import {gql} from "@apollo/client";
import {runQuery} from "@/utils/graphql-utils";
import {forceGetPersonId, getAccessibleEntities, isAiEbMember} from "@/utils/person-utils";

async function getApplicationOwnerId(applicationId: number): Promise<number> {
    const query = gql`
        {
            getApplication(id: "${applicationId}") {
                person {
                    id
                }
            }
        }
    `

    const queryResponse = await runQuery(query);
    return queryResponse.getApplication.person.id;
}

async function getApplicationOffice(applicationId: number): Promise<number> {
    const query = gql`
        {
            getApplication(id: "${applicationId}") {
                host_lc {
                    id
                }
            }
        }
    `

    const queryResponse = await runQuery(query);
    return queryResponse.getApplication.host_lc.id;
}


export async function getApplicationOwner(applicationId: number): Promise<{
    id: number,
    name: string,
    photo: string,
}> {
    const query = gql`
        {
            getApplication(id: "${applicationId}") {
                person {
                    id
                    first_name
                    last_name
                    profile_photo
                }
            }
        }
    `

    const queryResponse = await runQuery(query);
    return {
        id: queryResponse.getApplication.person.id,
        name: queryResponse.getApplication.person.first_name + " " + queryResponse.getApplication.person.last_name,
        photo: queryResponse.getApplication.person.profile_photo
    };
}

export async function verifyCanSubmitQuestionnaire(applicationId: number) {
    const personId = await forceGetPersonId();
    const applicationOwner = await getApplicationOwnerId(applicationId);
    if (personId === applicationOwner) return;

    if (await isAiEbMember()) return;

    throw new Error("Not authorized");
}

export async function verifyCanViewQuestionnaire(applicationId: number) {
    const accessibleEntities = await getAccessibleEntities();
    const applicationOffice = await getApplicationOffice(applicationId);

    if (accessibleEntities.includes(applicationOffice)) return;
    else throw new Error("Not authorized");
}