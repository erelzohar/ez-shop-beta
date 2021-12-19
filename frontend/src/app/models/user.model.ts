export class UserModel {
    public _id: string;
    public customerId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public city: string;
    public street: string;
    public token: string;
    public isAdmin: boolean;

    public static convertToFormData(user: UserModel): FormData {
        const myFormData = new FormData();
        myFormData.append("customerId", user.customerId.toString());
        myFormData.append("firstName", user.firstName);
        myFormData.append("lastName",user.lastName);
        myFormData.append("email",user.email);
        myFormData.append("password",user.password);
        myFormData.append("city",user.city);
        myFormData.append("street",user.street);
        return myFormData;
    }
}
