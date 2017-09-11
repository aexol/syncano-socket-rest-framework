import { data, users, socket, response, event, logger } from 'syncano-server'
const {
    model,
    token,
} = ARGS;
const modelData = JSON.parse(ARGS.data);
import { getPermissions } from './helpers/permissions.js'
function addModel(){
    data[model]
    .create({
        ...modelData
    })
    .then(model => {
        response.json(model)
    })
    .catch(({data}) => {
        response.json(data)
    })
}
async function create(){
    const canCreate = await getPermissions(model,'c',token);
    if(canCreate){
        addModel()
    }else{
        response.json("Insufficent privileges")
    }
}
create();