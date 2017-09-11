import { data, users, socket, response, event, logger } from 'syncano-server';
const {
    PERMISSIONS = [],
    OBJECT_PERMISSIONS = []
} = CONFIG;
function hasPermission(o,p){
    return o.permission_type.indexOf(p) !== -1;
}
export async function getPermissions(model, permission_type, token){
    try{
        const definedGlobalPermissions = PERMISSIONS.filter(p => hasPermission(p,permission_type) && p.class_name === model);
        let user;
        if(definedGlobalPermissions.length){
            const permission = definedGlobalPermissions[0];
            if( !token ){
                return false
            } 
            try {
                user = await data.users.where('token',token).firstOrFail();
                if( permission.users ){
                    return permissions.users.indexOf(user.id) !== -1
                }
                return true
            } catch ({data}) {
                return false
            }
        }
        if(definedObjectPermissions.length){
            const permission = definedObjectPermissions[0];
            if( !token ){
                return false
            } 
            try {
                user = user?user:await data.users.where('token',token).firstOrFail();
                if( permission.owner_field ){
                   return {
                       user,
                       owner: permission.owner_field
                   }
                }
                return true
            } catch ({data}) {
                return false
            }
        }
        const definedObjectPermissions = OBJECT_PERMISSIONS.filter(p => hasPermission(p,permission_type) && p.class_name === model);
        
    }catch({data}){
        return true;
    }
}