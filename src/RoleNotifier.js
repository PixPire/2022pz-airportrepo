export default class RoleNotifier{
    static ObserverList = new Array;

    static register(roleObserver){
        this.ObserverList.push(roleObserver);
    }

    static notify(){
        this.ObserverList.forEach(element => {
            element.notifyRoleChanged();
        })
    }
}