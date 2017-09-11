import { data, users, socket, response, event, logger } from 'syncano-server'
const {
    model,
    id,
    token
} = ARGS
import { getPermissions } from './helpers/permissions.js';

del();

function deleteUserModel({ user, owner }){
    data[model]
    .where(owner, user)
    .where('id',id)
    .firstOrFail()
    .then(model => {
        deleteModel();
    })
    .catch(({data}) => {
        response.json(data)
    })
}
function deleteModel(){
    data[model]
    .delete(id)
    .then(model => {
        response.json(model)
    })
    .catch(({data}) => {
        response.json(data)
    })
}
async function del(){
    const canDelete = await getPermissions(model,'c',token)
    if(canDelete.user){
        deleteUserModel();
    }
    if(canDelete){
        deleteModel()
    }else{
        response.json("Insufficent privileges")
    }
}