import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import { connecToDb } from '@utils/database'
import User from '@components/models/user'
import dotenv from 'dotenv';
dotenv.config({ path: './utils/.env' });





   
const handler = NextAuth({

   

    providers : [
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,

        })
    ],
    callbacks:{
        async session({session}){
            const sessionUser = await User.findOne({
                email:session.user.email
            })
    
            session.user.id = sessionUser._id.toString()
            
            return session
    
        },
        async signIn({profile}){
            try{
                await connecToDb()
    
                //check if user exists
                const userExists = await User.findOne({email:profile.email})
    
    
                 //if not create new user
                if(!userExists){
                    await User.create({
                        email:profile.email,
                        username: profile.name.replace(" ","").toLowerCase(),
                        image:profile.picture
    
                    })
                }
    
    
    
               
    
    
                return true
    
            } catch(err){
                console.log(err)
            }
    
    
        }

    }
    
})

export {handler as GET, handler as POST} 