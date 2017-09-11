import { data, users, socket, response, event, logger } from 'syncano-server'
const {
    model,
    token
} = ARGS
import { getPermissions } from './helpers/permissions.js';
function listUserModel({ user, owner }){
    data[model]
    .where(owner, user)
    .then(models => {
        response.json(models)
    })
    .catch(({data}) => {
        console.log(data)
    })
}
function listModel(){
    data[model]
    .list()
    .then(models => {
        response.json(models)
    })
    .catch(({data}) => {
        console.log(data)
    })
}
async function show(){
    const canSee = await getPermissions(model,'r',token);
    if(canSee.user){
        listUserModel(canSee);
    }
    if(canSee){
        listModel();
    }else{
        response.json(403,"Insufficent privileges")
    }
}
show();