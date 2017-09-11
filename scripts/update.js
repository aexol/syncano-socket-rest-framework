import { data, users, socket, response, event, logger } from 'syncano-server'
const {
    model,
    id,
    token
} = ARGS
const modelData = JSON.parse(ARGS.data);
import { getPermissions } from './helpers/permissions.js';

update();

function updateUserModel({ user, owner }){
    data[model]
    .where(owner, user)
    .where('id',id)
    .firstOrFail()
    .then(model => {
        updateModel();
    })
    .catch(({data}) => {
        response.json(data)
    })
}
function updateModel(){
    data[model]
    .update(id,{
        ...modelData
    })
    .then(model => {
        response.json(model)
    })
    .catch(({data}) => {
        response.json(data)
    })
}
async function update(){
    const canUpdate = await getPermissions(model,'c',token)
    if(canUpdate.user){
        updateUserModel();
    }
    if(canUpdate){
        updateModel()
    }else{
        response.json("Insufficent privileges")
    }
}