export interface RegisterRequest{
    username:string,
    password:string
}
export interface LoginRequest{
    username:string,
    password:string
}
export interface UserRequest{
    id:string,
    username:string,
    password:string
}
export interface UserResponse{
    id:string,
    username:string,
    password:string
}
export interface LoginResponse{
    token: string
    user:UserResponse
}