import { NextAuthOptions } from "next-auth";
import  CredentialsProvider from "next-auth/providers/credentials"
import NextAuth from "next-auth/next";

const authOptions : NextAuthOptions ={ 
    session:{
        strategy: "jwt",
    },
    secret : process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
           type: "credentials",
            name : "credentials",
            credentials : {
                username :{label : "Username", type: "text"},
                password : {label :"Password", type : "password"}
            },
            async authorize(credentials){
                const {username, password} =  credentials as{
                    username: string;
                    password: string;
                };
                const user: any = {id: 1, username:username, password:password};
                if(user){
                    return user;
                }else{
                    return null;
                }

            }
        })
    ],

    callbacks:{
        jwt({token,account,profile,user}){
            if(account?.provider === "credentials"){
                token.name = user.name;
            }
            return token;
        },

        async session ({session,token}: any) {
            if("name" in token){
                session.user.name = token.name;
            }
            return session;
        }
    }
}

export default NextAuth(authOptions);