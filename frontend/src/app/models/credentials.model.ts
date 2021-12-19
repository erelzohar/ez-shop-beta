export class CredentialsModel {
    public email: string;
    public password: string;

    public static convertToFormData(credentials:CredentialsModel):FormData{
        const myFormData = new FormData();
        myFormData.append("email",credentials.email);
        myFormData.append("password",credentials.password);
        return myFormData;
    }
}