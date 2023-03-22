
declare namespace CustomType {
    interface Context {
        auth: Authorization;
    }

    interface Authorization {
        isAuthenticated: boolean;
        hasToken: boolean;
        permissions: string[];
        _id: string;
    }
}


export default CustomType;